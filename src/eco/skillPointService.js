
import { SKILL_TAXONOMY } from './skillTaxonomy.js';
import admin from 'firebase-admin';
import { TIER_THRESHOLDS, TIER_NAMES } from './skillTiers.js';

// --- Firebase Admin SDK Configuration ---

// The service account key is loaded from a file you must provide.
import serviceAccount from '../../serviceAccountKey.json' assert { type: 'json' };

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

// --- Data Access Layer (Firestore with Admin SDK) ---

async function getUserSkillsFromDB(userId) {
  console.log(`(Firestore Admin) Fetching skills for user: ${userId}`);
  const docRef = db.collection("userSkills").doc(userId);
  const docSnap = await docRef.get();

  if (docSnap.exists) {
    return docSnap.data();
  } else {
    console.log("(Firestore Admin) No such document! Starting with empty skills.");
    return {};
  }
}

async function saveUserSkillsToDB(userId, skills) {
  console.log(`(Firestore Admin) Saving skills for user: ${userId}`);
  const docRef = db.collection("userSkills").doc(userId);
  await docRef.set(skills, { merge: true });
  return true;
}


// --- Business Logic Layer ---

/**
 * Awards skill points to a user based on an action they take in the application.
 *
 * @param {string} userId - The ID of the user performing the action.
 * @param {string} action - The action the user performed (e.g., 'WATCH_VIDEO', 'UPLOAD_FILE').
 * @param {object} data - The data associated with the action (e.g., video tags, file content).
 * @returns {object} An object representing the skill points awarded in this transaction.
 */
export async function awardSkillPoints(userId, action, data) {
  const userSkills = await getUserSkillsFromDB(userId);
  const skillPointsAwarded = {};

  let reward = 0;
  let textToAnalyze = '';

  switch (action) {
    case 'WATCH_VIDEO':
      reward = 1;
      textToAnalyze = [...(data.tags || []), data.category].join(' ').toLowerCase();
      break;
    case 'UPLOAD_FILE':
      reward = 5;
      textToAnalyze = `${data.title} ${data.content}`.toLowerCase();
      break;
    case 'DISCUSSION_POST':
      reward = 2;
      textToAnalyze = data.text.toLowerCase();
      break;
    case 'LEGAL_CERT':
      if (data.verified) {
        reward = 50;
        textToAnalyze = data.entityType.toLowerCase();
      } else {
        return {};
      }
      break;
    default:
      console.log(`Unknown action: ${action}`);
      return {};
  }

  for (const skill in SKILL_TAXONOMY) {
    const skillKeywords = SKILL_TAXONOMY[skill];
    const skillCapitalized = skill.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    if (skillKeywords.some(keyword => textToAnalyze.includes(keyword))) {
      userSkills[skill] = (userSkills[skill] || 0) + reward;
      skillPointsAwarded[skill] = (skillPointsAwarded[skill] || 0) + reward;
    }
  }

  if (Object.keys(skillPointsAwarded).length > 0) {
    await saveUserSkillsToDB(userId, userSkills);
  }

  console.log(`Current User (${userId}) Skills Profile:`, userSkills);
  return skillPointsAwarded;
}


/**
 * Calculates a user's skill tiers based on their accumulated points.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Array<string>} A list of tier badges earned by the user.
 */
export async function getUserSkillTiers(userId) {
  const userSkills = await getUserSkillsFromDB(userId);
  const badges = [];

  for (const skill in userSkills) {
    const score = userSkills[skill];
    const skillCapitalized = skill.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

    if (score >= TIER_THRESHOLDS.EXPERT) {
      badges.push(`${TIER_NAMES.EXPERT} in ${skillCapitalized}`);
    } else if (score >= TIER_THRESHOLDS.SKILLED) {
      badges.push(`${TIER_NAMES.SKILLED} in ${skillCapitalized}`);
    } else if (score >= TIER_THRESHOLDS.APPRENTICE) {
      badges.push(`${TIER_NAMES.APPRENTICE} in ${skillCapitalized}`);
    }
  }

  return badges;
}
