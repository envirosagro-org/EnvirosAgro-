import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const customerData = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '555-1234',
    status: 'Active',
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-5678',
    status: 'Active',
  },
  {
    name: 'Peter Jones',
    email: 'peter.jones@example.com',
    phone: '555-9012',
    status: 'Inactive',
  },
];

const seedCustomers = async () => {
  const customersCollection = collection(db, 'customers');
  for (const customer of customerData) {
    await addDoc(customersCollection, customer);
  }
};

seedCustomers();
