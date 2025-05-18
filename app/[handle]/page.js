import Link from "next/link";
import Image from "next/image";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
export default async function Page({ params }) {
  const handle = params.handle;
  const client = await clientPromise;
  const db = client.db("linkhub");
  const collection = db.collection("links");
  const items = await collection.findOne({ handle });

  if (!items) {
    return notFound();
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-400 via-blue-300 to-blue-100 px-4"
    >
      <div
        className="w-full max-w-md bg-white/80 rounded-3xl shadow-2xl flex flex-col items-center gap-6 py-10 px-6 mt-8"
      >
        {items.pic && items.pic.startsWith("http") ? (
          <div
            className="overflow-hidden rounded-full border-4 border-green-300 shadow-lg"
          >
            <Image
              src={items.pic}
              alt="profile-image"
              className="rounded-full object-cover"
              width={120}
              height={120}
              priority={true}
            />
          </div>
        ) : (
          <div className="w-[120px] h-[120px] rounded-full bg-blue-200 flex items-center justify-center border-4 border-green-200 shadow-lg">
            <span className="text-sm text-blue-500">No Image</span>
          </div>
        )}
        <span className="font-bold text-2xl text-green-800 break-all">{handle}</span>
        <span className="bio text-center text-blue-700 text-base px-2">{items.bio}</span>
        <div
          className="links flex flex-col gap-3 w-full"
        >
          {items.links.map((item, index) => (
            <div
              key={index}
            >
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-4 bg-green-200/80 rounded-xl text-center font-semibold text-green-900 shadow-md hover:bg-blue-400 hover:text-white hover:scale-[1.03] transition-all duration-200 active:scale-95"
              >
                {item.linktext}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div
        className="mt-8"
      >
        <Link
          className="bg-white/80 px-4 py-2 rounded-lg font-medium text-blue-700 shadow hover:bg-blue-100 hover:text-green-900 transition-all duration-200"
          href="/"
        >
          Create New Handle
        </Link>
      </div>
    </div>
  );
}
