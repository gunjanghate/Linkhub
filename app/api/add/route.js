import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
console.log(uri);

let cachedClient = null;
let cachedClientPromise = null;

// MongoDB connection function
async function connectToDatabase() {
  if (!cachedClientPromise) {
    const client = new MongoClient(uri);
    cachedClientPromise = client.connect();
    cachedClient = client;
  }
  return cachedClientPromise;
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Check if data is valid
    if (!body.handle) {
      return NextResponse.json({
        success: false,
        message: "Handle is required"
      }, { status: 400 });
    }

    await connectToDatabase();
    const database = cachedClient.db('linkhub');
    const collection = database.collection('links');

    // Check if handle already exists
    const doc = await collection.findOne({ handle: body.handle }, { projection: { _id: 0, handle: 1 } });
    if (doc) {
      return NextResponse.json({
        success: false,
        error: true,
        message: "Handle already exists"
      }, { status: 400 });
    }

    // Insert new record
    const result = await collection.insertOne(body);

    // Construct response
    const response = {
      success: true,
      message: "Link added successfully!",
      result: result
    };

    console.log("Response:", response);

    return NextResponse.json(response, { status: 200 });

  } catch (error) {
    console.error('Database error:', error);

    return NextResponse.json({
      success: false,
      message: "Database error",
      error: error.stack || error.message
    }, { status: 500 });
  }
}
