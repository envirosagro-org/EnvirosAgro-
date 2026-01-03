
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import { User } from '../types';

export const registerGroup = async (groupName: string, groupType: string, legalId: string, user: User) => {
  if (!groupName || !groupType || !legalId) {
    throw new Error('All fields are required.');
  }

  try {
    const docRef = await addDoc(collection(db, 'groups'), {
      name: groupName,
      type: groupType,
      legalId: legalId,
      createdBy: user.email,
      createdAt: new Date(),
      members: [user.email],
    });
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};
