// import { MongoClient } from 'mongodb';
// import { NextResponse } from 'next/server';

// const uri = "mongodb+srv://ghategunjan:111005@cluster0.amdi9.mongodb.net/";
// console.log("Mongodb : ",uri);

// // let cachedClient = null;
// // let cachedClientPromise = null;

// // MongoDB connection function
// // async function connectToDatabase() {
// //   if (!cachedClientPromise) {
// //     const client = new MongoClient(uri);
// //     cachedClientPromise = client.connect();
// //     cachedClient = client;
// //   }
// //   return cachedClientPromise;
// // }
// // MongoDB connection function
// async function connectToDatabase() {
//   try {
//     const client = new MongoClient(uri, {
//       // Add these options to handle SSL connection properly
//       ssl: true,
//       tls: true,
//       tlsAllowInvalidCertificates: false,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       retryWrites: true,
//       w: "majority"
//     });
    
//     return await client.connect();
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     throw error;
//   }
// }
// let cachedClient = null;

// export async function POST(request) {
//   try {
//     if (!cachedClient) {
//     cachedClient = await connectToDatabase();
//   }
//     const body = await request.json();

//     // Check if data is valid
//     if (!body.handle) {
//       return NextResponse.json({
//         success: false,
//         message: "Handle is required"
//       }, { status: 400 });
//     }

    
//     const database = cachedClient.db('linkhub');
//     const collection = database.collection('links');

//     // Check if handle already exists
//     const doc = await collection.findOne({ handle: body.handle }, { projection: { _id: 0, handle: 1 } });
//     if (doc) {
//       return NextResponse.json({
//         success: false,
//         error: true,
//         message: "Handle already exists"
//       }, { status: 400 });
//     }

//     // Insert new record
//     const result = await collection.insertOne(body);

//     // Construct response
//     const response = {
//       success: true,
//       message: "Link added successfully!",
//       result: result
//     };

//     console.log("Response:", response);
//      await client.close();
//     return NextResponse.json(response, { status: 200 });

//   } catch (error) {
//     console.error('Database error:', error);

//     return NextResponse.json({
//       success: false,
//       message: "Database error",
//       error: error.stack || error.message
//     }, { status: 500 });
//   }
// }
import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

// Get MongoDB URI from environment variable
const uri = process.env.MONGODB_URI;

// Connection caching
let cachedClient = null;
let cachedDb = null;

// Improved MongoDB connection function with better error handling
async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Validate environment variable
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  // Log a masked version of the connection string for debugging
  console.log('MongoDB URI (masked):', `${uri.substring(0, 20)}...`);

  try {
    // Connect with appropriate options
    const client = new MongoClient(uri, {
      // Modern connection options
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connectedClient = await client.connect();
    const db = connectedClient.db('linkhub'); // Your database name

    // Cache the connection
    cachedClient = connectedClient;
    cachedDb = db;

    console.log('Successfully connected to MongoDB');
    return { client: connectedClient, db };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

export async function POST(request) {
  console.log('Received POST request to /api/add');
  
  try {
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
      console.log('Request body received:', {
        handle: body.handle,
        linkCount: body.links?.length || 0,
        hasPic: !!body.pic,
        hasBio: !!body.bio
      });
    } catch (error) {
      console.error('Failed to parse request body:', error);
      return NextResponse.json({
        success: false,
        message: 'Invalid request body - could not parse JSON'
      }, { status: 400 });
    }

    // Validate required fields
    if (!body.handle || body.handle.trim() === '') {
      return NextResponse.json({
        success: false,
        message: 'Handle is required and cannot be empty'
      }, { status: 400 });
    }

    // Validate links array
    if (!body.links || !Array.isArray(body.links) || body.links.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'At least one link is required'
      }, { status: 400 });
    }

    // Check if any link is invalid
    const hasInvalidLink = body.links.some(link => 
      !link || 
      typeof link !== 'object' || 
      !link.link || 
      !link.linktext
    );

    if (hasInvalidLink) {
      return NextResponse.json({
        success: false,
        message: 'All links must have both link and linktext values'
      }, { status: 400 });
    }

    // Image URL is required
    if (!body.pic || body.pic.trim() === '') {
      return NextResponse.json({
        success: false,
        message: 'Image URL is required'
      }, { status: 400 });
    }

    // Connect to database
    let client, collection;
    try {
      const { db } = await connectToDatabase();
      collection = db.collection('links');
      
      // Check if handle already exists
      const existingDoc = await collection.findOne(
        { handle: body.handle },
        { projection: { _id: 0, handle: 1 } }
      );
      
      if (existingDoc) {
        return NextResponse.json({
          success: false,
          message: 'This handle is already taken. Please choose another one.'
        }, { status: 400 });
      }

      // Prepare document to insert
      const document = {
        handle: body.handle,
        links: body.links,
        pic: body.pic,
        bio: body.bio || '',
        createdAt: new Date()
      };

      // Insert document
      const result = await collection.insertOne(document);
      
      console.log('Document inserted successfully:', result);

      return NextResponse.json({
        success: true,
        message: 'Your Linkhub was created successfully!',
        handle: body.handle
      }, { status: 201 });
      
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Different error messages based on error type
      if (dbError.message.includes('MONGODB_URI is not defined')) {
        return NextResponse.json({
          success: false,
          message: 'Server configuration error'
        }, { status: 500 });
      }
      
      if (dbError.name === 'MongoServerSelectionError') {
        return NextResponse.json({
          success: false,
          message: 'Could not connect to database server'
        }, { status: 500 });
      }
      
      return NextResponse.json({
        success: false,
        message: 'Database error: ' + dbError.message
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('Unhandled API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Server error'
    }, { status: 500 });
  }
}