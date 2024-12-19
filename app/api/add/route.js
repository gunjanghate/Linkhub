import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("linkhub");
    const collection = db.collection("links");

    // Check if handle already exists
    const doc = await collection.findOne({ handle: body.handle }, { projection: { _id: 0, handle: 1 } });
    if (doc) {
      return NextResponse.json({ success: false, error: true, message: "Handle already exists" }, { status: 200 });
    }

    // Insert new record
    const result = await collection.insertOne(body);

    // Construct the response
    const response = {
      success: true,
      message: "Link added successfully!",
      result: result
    };

    console.log("Response:", response);

    // Return the response
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
