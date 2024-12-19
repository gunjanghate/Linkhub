
import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
      const body = await request.json();
      const client = await clientPromise;
      const db = client.db("linkhub");
      const collection = db.collection("links");
      const doc = await collection.findOne({handle: body.handle})

      if(doc){
        return Response.json({success: false, error: true, Message: "Handle already exists"}) 
      }
      const result = await collection.insertOne(body);
  
      return new Response(JSON.stringify({
        success: true,
        message: "Link added successfully!",
        result: result
      }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({
        success: false,
        message: "Database error",
        error: error.message
      }), { status: 500 });
    }
  }