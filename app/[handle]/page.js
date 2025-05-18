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
    <div className="main flex min-h-screen justify-center items-center flex-col bg-purple-400">
      <div className="photo flex flex-col gap-5 justify-center items-center my-12">
      
{items.pic && items.pic.startsWith("http") ? (
  <Image
    src={items.pic}
    alt="profile-image"
    className="rounded-full"
    width={200}
    height={200}
    objectFit="cover"
    priority={true}
  />
) : (
  <div className="w-[200px] h-[200px] rounded-full bg-gray-200 flex items-center justify-center">
    <span className="text-sm text-gray-500">No Image</span>
  </div>
)}
        <span className="font-bold text-3xl">{handle}</span>
        <span className="bio w-80 text-center">{items.bio}</span>
        <div className="links flex flex-col gap-3">
          {items.links.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              className="py-4 px-2 bg-purple-200 rounded-md hover:animate-bounce duration-300 transition-all"
            >
              {item.linktext}
            </Link>
          ))}
        </div>
      </div>
      <div className="return mt-5">
        <Link
          className="bg-zinc-200 px-3 py-2 rounded-lg hover:bg-white font-medium drop-shadow-xl hover:translate-x-2 transition-all"
          href="/"
        >
          Create New Handle
        </Link>
      </div>
    </div>
  );
}
