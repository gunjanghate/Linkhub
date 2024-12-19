export async function POST(request) {
  try {
      const body = await request.json();
      const client = await clientPromise;
      const db = client.db("linkhub");
      const collection = db.collection("links");
      
      // Check if handle already exists
      const doc = await collection.findOne({ handle: body.handle }, { projection: { _id: 0, handle: 1 } });
      
      if (doc) {
          return new Response(JSON.stringify({ success: false, error: true, message: "Handle already exists" }), { status: 200 });
      }

      // Insert new record
      const result = await collection.insertOne(body);

      // Check the result before returning it
      const response = {
          success: true,
          message: "Link added successfully!",
          result: result
      };
      console.log("Response:", response);

      return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
      console.error('Database error:', error);
      return new Response(JSON.stringify({
          success: false,
          message: "Database error",
          error: error.message
      }), { status: 500 });
  }
}
