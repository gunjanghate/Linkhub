import { NextResponse } from 'next/server';
import clientPromise from "@/lib/mongodb";

export async function GET(request, { params }) {
  const handle = params.handle;
  
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("linkhub");
    const collection = db.collection("links");
    
    // Query for the profile data
    const profileData = await collection.findOne({ handle });

    if (!profileData) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    
    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}