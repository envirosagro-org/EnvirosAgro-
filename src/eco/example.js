import { awardSkillPoints, getUserSkillTiers } from './skillPointService.js';

async function runExamples() {
  console.log('--- User 1: Alice ---');

  console.log('\n--- Scenario: Alice watches a video about drip irrigation ---');
  const videoData = { tags: ['drip systems', 'water conservation'], category: 'Irrigation Technology' };
  let points = await awardSkillPoints('alice', 'WATCH_VIDEO', videoData);
  console.log('Points Awarded:', points);

  console.log('\n--- Scenario: Alice uploads a report on maize yields ---');
  const fileData = { title: 'Maize Yield Report.pdf', content: 'This report details the findings of our study on maize crop management...' };
  points = await awardSkillPoints('alice', 'UPLOAD_FILE', fileData);
  console.log('Points Awarded:', points);

  console.log('\n\n--- User 2: Bob ---');

  console.log('\n--- Scenario: Bob posts a question about root rot ---');
  const postData = { text: 'Does anyone have advice on treating root rot in tomato plants?' };
  points = await awardSkillPoints('bob', 'DISCUSSION_POST', postData);
  console.log('Points Awarded:', points);

  console.log('\n--- Scenario: Bob, a verified user from a drone company, completes his profile ---');
  const certData = { verified: true, entityType: 'DroneSpray Ltd' };
  points = await awardSkillPoints('bob', 'LEGAL_CERT', certData);
  console.log('Points Awarded:', points);
  
  console.log("\n\n--- Final State of User Skills & Tiers ---");
  const aliceTiers = await getUserSkillTiers('alice');
  console.log("Alice's Badges:", aliceTiers);
  
  const bobTiers = await getUserSkillTiers('bob');
  console.log("Bob's Badges:", bobTiers);

}

runExamples();
