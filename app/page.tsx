"use client";
import { useState } from "react";
import tree from "@/public/assests/image.png";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  const [text, settext] = useState("");
  const createTree = () => {
    router.push(`/generate?handle=${text}`);
  };

  return (
    <main className="text-white">
      {/* <Navbar/> */}
      <section className="bg-green-800 min-h-[100vh] grid grid-cols-2">
        <div className="col-1 flex flex-col ml-[10vw] justify-center items-center gap-12">
          <div className="texts">
            <p className="text-2xl font-medium">Hello All! Welcome to</p>
            <p className="text-3xl font-extrabold">Linkhub</p>
          </div>
          <div className="buttons flex gap-2">
            <input
              value={text}
              onChange={(e) => settext(e.target.value)}
              className="py-1 px-3 rounded-lg focus:outline-green-800  text-black drop-shadow-xl"
              type="text"
              name=""
              id=""
              placeholder="Enter your handle"
            />
            {/* <button onClick={()=>{router.push("/generate")}} className="claim px-3 py-1 bg-pink-200 align-middle rounded-full text-black">Claim Your Linkhub!</button> */}
            <button
              onClick={() => createTree()}
              className="claim px-3 py-1 bg-pink-200 align-middle rounded-full text-black font-medium hover:animate-bounce transition-all drop-shadow-lg"
            >
              Claim Your Linkhub!
            </button>
          </div>
        </div>

        <div className="col-2 flex flex-col mr-[10vw] justify-center items-center">
          <Image
            src={tree}
            className="hover:translate-x-1 hover:rotate-1 hover:shadow-xl transition-all duration-300 h-fit w-fit object-contain"
            height={400}
            width={400}
            alt="tree image"
          />
        </div>
      </section>
      <section className="bg-red-800 min-h-[100vh]">
        <p className="text-2xl font-bold">Hello All! Welcome to</p>
        <p className="text-3xl font-extrabold">Linkhub</p>
      </section>
    </main>
  );
}
