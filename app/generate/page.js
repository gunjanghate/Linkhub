import React from "react";
import Image from "next/image";
import tree from "@/public/assests/image.png";

const page = () => {
  return (
    <div>
      <section className="bg-blue-600 min-h-[100vh] grid grid-cols-2">
        <div className="col-1 flex flex-col ml-[10vw] justify-center items-center gap-12">
          <div className="form">
            <form className="flex flex-col gap-3">
              <h1 className="text-2xl font-bold align-middle">Create Your Own Linkhub!</h1>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Step-1: Claim Your Handle</h1>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter link text "
                  className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                />
                <h1 className="text-xl font-semibold">Step-2: Add Link</h1>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter link text "
                  className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                />
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter link "
                  className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                />
                <button className="add rounded-3xl px-2 py-1 text-black hover:text-white max-w-[20vw] lg:mr-[80px] ml-[80px]  transition-all hover:bg-blue-400 bg-sky-300">Add</button>
                <h1 className="text-xl font-semibold">Step-3: Add Image and finalize</h1>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Enter image url "
                  className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                />
                <buttom className="done p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-lg">Create your own hub`` </buttom>
              </div>
            </form>
          </div>
        </div>

        <div className="col-2 flex flex-col ml-6 rounded-lg justify-center items-center">
          <Image
            src={tree}
            className="hover:translate-x-1 hover:rotate-1 hover:shadow-xl transition-all duration-300 h-fit w-fit object-contain"
            height={400}
            width={400}
            alt="tree image"
          />
        </div>
      </section>
    </div>
  );
};

export default page;
