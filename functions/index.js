
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// --- CONSTANTS ---
const REWARDS = {
  REGISTRATION: 50,
  UPLOAD: 20,
  TUTORIAL_COMPLETE: 100,
};

// ==========================================
// 1. STEP 1: AUTH TRIGGER (On User Signup)
// ==========================================
exports.onUserCreated = functions.auth.user().onCreate(async (user) => {
  const email = user.email || "";
  const isOrganization = email.includes(".org") || email.includes(".co"); // Simple domain check

  // Create the User Profile in Firestore
  const userProfile = {
    uid: user.uid,
    email: email,
    displayName: user.displayName || "New Member",
    photoURL: user.photoURL || null,
    type: isOrganization ? "ORGANIZATION" : "INDIVIDUAL",
    isVerified: false,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    
    // STEP 2: ECONOMY (Wallet)
    wallet: {
      balance: REWARDS.REGISTRATION, // Free 50 EAC
      lifetime_earned: REWARDS.REGISTRATION,
    },

    // STEP 3: WORKER CLOUD (Skills)
    worker_profile: {
      isOpenToWork: true,
      skills: {}, // e.g., {'Hydroponics': 10}
      badges: ["Newcomer"],
    },
  };

  await db.collection("users").doc(user.uid).set(userProfile);
  
  // Log the transaction
  await logTransaction(user.uid, REWARDS.REGISTRATION, "Welcome Bonus");
});

// ==========================================
// 2. STEP 2 & 3: UPLOAD TRIGGER (The Skill Engine)
// ==========================================
exports.onFileUpload = functions.firestore
  .document("uploads/{uploadId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const userId = data.userId;
    const fileType = data.fileType; // e.g., "PDF", "VIDEO"
    const tags = data.tags || [];   // e.g., ["Hydroponics", "Soil"]

    // A. Reward the User (Mining EAC)
    await addCoins(userId, REWARDS.UPLOAD, `Upload: ${data.title}`);

    // B. Analyze Skills (The Logic Matrix)
    // In a real app, you would call Google Cloud Vision/NLP API here.
    // We will simulate the logic:
    await updateWorkerSkills(userId, tags, 5); // +5 points per tag
  });

// ==========================================
// 3. STEP 2 & 3 (Cont.): TUTORIAL TRIGGER
// ==========================================
exports.onTutorialComplete = functions.firestore
  .document("tutorialCompletions/{completionId}")
  .onCreate(async (snap, context) => {
    const data = snap.data();
    const userId = data.userId;
    const tags = data.tags || [];

    // A. Reward the User
    await addCoins(userId, REWARDS.TUTORIAL_COMPLETE, `Tutorial: ${data.title}`);

    // B. Update Skills
    await updateWorkerSkills(userId, tags, 20); // +20 points per tag for a tutorial
  });


// ==========================================
// 4. STEP 4: SUSTAINABILITY ENGINE
// ==========================================

// Digitizing the EnvirosAgro Equations
exports.calculateSustainability = functions.https.onCall(async (data, context) => {
  // 1. Extract Inputs from App (matching Excel Sheet 1)
  const S = parseFloat(data.S);   // Crop Cycle Requirement (days)
  const Dn = parseFloat(data.Dn); // Direct Nature (Rainfall days)
  const In = parseFloat(data.In); // Indirect Nature (Soil moisture days)
  const x = parseFloat(data.x);   // Agricultural Base Factor (1-10)
  const r = parseFloat(data.r || 1.0); // Growth Rate (default 1.0)
  const n = parseFloat(data.n || 1);   // Number of periods (years/seasons)

  // 2. Calculate C(a) - Code of Agriculture
  let Ca = 0;
  if (r === 1) {
      // Formula for r = 1: C(a) = (n * x) + 1
      Ca = (n * x) + 1;
  } else {
      // Formula for r != 1: C(a) = (x * ((r^n) - 1) / (r - 1)) + 1
      Ca = (x * (Math.pow(r, n) - 1) / (r - 1)) + 1;
  }

  // 3. Calculate m - Sustainable Time Constant
  // Formula: m = SQRT((Dn * In * Ca) / S)
  const numerator = Dn * In * Ca;
  const m = Math.sqrt(numerator / S);

  // 4. Update User Profile with new Metrics
  const userId = context.auth.uid;
  await admin.firestore().collection("users").doc(userId).update({
      "sustainability_profile.Ca": Ca,
      "sustainability_profile.m": m,
      "sustainability_profile.last_updated": admin.firestore.FieldValue.serverTimestamp()
  });

  // 5. Gamification: Reward High Sustainability
  // If 'm' is high (e.g., > 10), give bonus coins automatically
  if (m > 10) {
      // Re-use the existing 'addCoins' helper from the previous step
      // This connects the "Science" directly to the "Economy"
      await addCoins(userId, 50, "High Sustainability Bonus (m > 10)"); 
  }

  return { Ca: Ca, m: m };
});

// ==========================================
// HELPER FUNCTIONS (The Economy Logic)
// ==========================================

// Safely add coins using a Transaction (Prevents errors)
async function addCoins(userId, amount, reason) {
  const userRef = db.collection("users").doc(userId);

  await db.runTransaction(async (t) => {
    const doc = await t.get(userRef);
    const newBalance = (doc.data().wallet.balance || 0) + amount;
    const newLifetime = (doc.data().wallet.lifetime_earned || 0) + amount;

    t.update(userRef, {
      "wallet.balance": newBalance,
      "wallet.lifetime_earned": newLifetime,
    });
  });

  await logTransaction(userId, amount, reason);
}

// Log every coin movement for auditing
async function logTransaction(userId, amount, reason) {
  await db.collection("ledger").add({
    userId: userId,
    amount: amount,
    reason: reason,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    type: "CREDIT",
  });
}

// Update the Worker Cloud Skills
async function updateWorkerSkills(userId, tags, points) {
  const userRef = db.collection("users").doc(userId);
  
  // We use "dot notation" to update nested map fields
  let updates = {};
  tags.forEach(tag => {
    // This increments the specific skill score
    updates[`worker_profile.skills.${tag}`] = admin.firestore.FieldValue.increment(points);
  });

  await userRef.update(updates);
}
