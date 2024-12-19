import Link from "next/link";
import clientPromise from "@/lib/mongodb";
import { notFound } from "next/navigation";
export default async function Page({ params }) {
  const handle = (await params).handle;
  const client = await clientPromise;
  const db = client.db("linkhub");
  const collection = db.collection("links");
  const items = await collection.findOne({ handle: handle });
  if(!items){
        return notFound();
  }
  return (
    <div className="main flex min-h-screen justify-center items-center flex-col bg-purple-400">
      {items && (
        <div className="photo flex flex-col gap-5 justify-center items-center  my-12">
          <img src={items.pic} className="" alt="profile-image" />
          <span className="font-bold text-3xl">{handle}</span>
          <span className="bio w-80 text-center">{items.bio}</span>
          <div className="links">
            {items.links.map((item, i) => {
              return (
                <Link
                  href={item.link}
                  key={i}
                  className="py-4 px-2 bg-purple-200 rounded-md my-3 drop-shadow-xl flex justify-center min-w-96 hover:animate-bounce duration-300 transition-all"
                >
                  {item.linktext}
                </Link>
              );
            })}
          </div>
        </div>
      )}

    <div className="return">
        <Link className="bg-zinc-200 px-3 py-2 rounded-lg hover:bg-white font-medium drop-shadow-xl hover:translate-x-2 transition-all" href={"/"}>Create New Handle</Link>
        </div>  
    </div>
  );
}
