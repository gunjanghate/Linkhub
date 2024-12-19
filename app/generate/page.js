"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import tree from "@/public/assests/image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// GeneratePageContent component that handles search params
const GeneratePageContent = () => {
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState("");
  const [pic, setPic] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);

  useEffect(() => {
    // Set the initial handle from the search params
    setHandle(searchParams.get("handle") || "");
  }, [searchParams]);

  const handleChange = (index, link, linktext) => {
    setLinks((prevLinks) =>
      prevLinks.map((item, i) =>
        i === index ? { link, linktext } : item
      )
    );
  };

  const addLink = (e) => {
    e.preventDefault();
    setLinks([...links, { link: "", linktext: "" }]);
  };

  const submitLinks = async (e) => {
    e.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      pic: pic,
      bio: bio,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const r = await fetch("/api/add", requestOptions);
      const result = await r.json();
      if (result.success) {
        toast.success(result.message);
        setLinks([{ link: "", linktext: "" }]);
        setHandle("");
        setPic("");
        setBio("");
      } else {
        toast.error("Handle Already Exists!");
      }
    } catch (error) {
      toast.error("Error submitting links");
      console.error("Error:", error);
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-blue-600 min-h-[100vh] grid grid-cols-2">
        <div className="col-1 flex flex-col ml-[10vw] justify-center items-center gap-12">
          <div className="form">
            <form className="flex flex-col gap-3" onSubmit={submitLinks}>
              <h1 className="text-2xl font-bold align-middle">Create Your Own Linkhub!</h1>
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Step-1: Claim Your Handle</h1>
                <input
                  value={handle || ""}
                  onChange={(e) => setHandle(e.target.value)}
                  type="text"
                  placeholder="Enter link text"
                  className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                />
                <h1 className="text-xl font-semibold">Step-2: Add Link</h1>
                {links.map((item, index) => (
                  <div key={index}>
                    <input
                      value={item.linktext || ""}
                      onChange={(e) => handleChange(index, item.link, e.target.value)}
                      type="text"
                      placeholder="Enter link text"
                      className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                    />
                    <input
                      value={item.link || ""}
                      onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                      type="text"
                      placeholder="Enter link"
                      className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                    />
                  </div>
                ))}
                <button
                  onClick={addLink}
                  className="add rounded-3xl px-2 py-1 text-black hover:text-white max-w-[20vw] lg:mr-[80px] ml-[80px] transition-all hover:bg-blue-400 bg-sky-300"
                >
                  + Add
                </button>
                <h1 className="text-xl font-semibold">Step-3: Add Image and Bio</h1>
                <input
                  value={pic || ""}
                  onChange={(e) => setPic(e.target.value)}
                  type="text"
                  placeholder="Enter image url"
                  className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                />
                <input
                  value={bio || ""}
                  onChange={(e) => setBio(e.target.value)}
                  type="text"
                  placeholder="Enter Bio"
                  className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
                />
                <button
                  disabled={pic === "" || handle === "" || links[0].linktext === ""}
                  onClick={submitLinks}
                  type="submit"
                  className="done disabled:bg-slate-300 disabled:cursor-not-allowed cursor-wait disabled:text-black p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-lg"
                >
                  Create your own hub
                </button>
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

// GeneratePage wrapped with Suspense boundary
const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GeneratePageContent />
    </Suspense>
  );
};

export default Page;
