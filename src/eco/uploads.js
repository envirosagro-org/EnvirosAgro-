import { REWARDS, FREQUENCY_CAPS } from './rewardsConfig.js';

// This is a placeholder for a database or other persistent storage
// In a real application, you would fetch this data from a database
const user = {
  uploads_today: 0,
};

function onUserUpload(fileType) {
  // 1. Check Daily Limit
  if (user.uploads_today >= FREQUENCY_CAPS.CONTRIBUTION.UPLOAD_HIGH_VALUE_FILE) {
    return 'Limit Reached. No Coins awarded.';
  }

  // 2. Assign Value based on Type
  let reward = 0;
  switch (fileType) {
    case 'Meeting_Minutes':
      reward = REWARDS.CONTRIBUTION.UPLOAD_MEETING_MINUTES;
      break;
    case 'Podcast_Audio':
      reward = REWARDS.CONTRIBUTION.UPLOAD_PODCAST_AUDIO;
      break;
    default:
      reward = REWARDS.CONTRIBUTION.UPLOAD_DEFAULT;
      break;
  }

  // 3. Update temporary user data
  user.uploads_today++;

  // 4. Return the reward
  return `You earned ${reward} EAC for your contribution!`;
}
