import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
      const body = await request.json();
      const client = await clientPromise;
      const db = client.db("linkhub");
      const collection = db.collection("links");

      // Ensure 'handle' is indexed for faster querying
      await collection.createIndex({ handle: 1 });

      const doc = await collection.findOne({ handle: body.handle });

      if (doc) {
        return new Response(JSON.stringify({
          success: false,
          error: true,
          message: "Handle already exists"
        }), { status: 400 });
      }

      const result = await collection.insertOne(body);

      return new Response(JSON.stringify({
        success: true,
        message: "Link added successfully!"
      }), { status: 200 });

    } catch (error) {
      console.error("Database error:", error); // Log error for debugging
      return new Response(JSON.stringify({
        success: false,
        message: "Database error",
        error: error.message
      }), { status: 500 });
    }
}
