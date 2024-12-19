
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const clientPromise = client.connect();

export default clientPromise;
