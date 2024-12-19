import clientPromise from '@/lib/mongodb';

export async function POST(request) {
    try {
        const body = await request.json();
        const client = await clientPromise;
        const db = client.db("linkhub");
        const collection = db.collection("links");
        
        // Create an index for `handle` if not already done (run in MongoDB shell)
        // db.links.createIndex({ handle: 1 });

        console.time('findOne-time');
        const doc = await collection.findOne({ handle: body.handle }, { projection: { _id: 0, handle: 1 } });
        console.timeEnd('findOne-time');
        
        if (doc) {
            return Response.json({ success: false, error: true, message: "Handle already exists" });
        }
        
        console.time('insert-time');
        const result = await collection.insertOne(body);
        console.timeEnd('insert-time');
        
        return new Response(JSON.stringify({
            success: true,
            message: "Link added successfully!",
            result: result
        }), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({
            success: false,
            message: "Database error",
            error: error.message
        }), { status: 500 });
    }
}
