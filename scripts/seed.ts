import { MongoClient } from 'mongodb';
import { EPISODES } from '../components/podcast/data';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function seedPodcasts() {
  try {
    await client.connect();
    const database = client.db('EnvirosAgroDB');
    const podcasts = database.collection('podcasts');

    // Clear existing data
    await podcasts.deleteMany({});

    // Insert new data
    const result = await podcasts.insertMany(EPISODES);
    console.log(`${result.insertedCount} documents were inserted`);
  } finally {
    await client.close();
  }
}

seedPodcasts().catch(console.dir);
