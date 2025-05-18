"use client";
// import React, { useState, useEffect, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import Image from "next/image";
// import tree from "@/public/assests/image.png";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const GeneratePageContent = () => {
//   const searchParams = useSearchParams();
//   const [handle, setHandle] = useState("");
//   const [pic, setPic] = useState("");
//   const [bio, setBio] = useState("");
//   const [links, setLinks] = useState([{ link: "", linktext: "" }]);

//   useEffect(() => {
//     const uri = process.env.MONGODB_URI;
// console.log("Mongodb Uri",uri);
//     // Set the initial handle from the search params
//     setHandle(searchParams.get("handle") || "");
//   }, [searchParams]);

//   const handleChange = (index, link, linktext) => {
//     setLinks((prevLinks) =>
//       prevLinks.map((item, i) =>
//         i === index ? { link, linktext } : item
//       )
//     );
//   };

//   const addLink = (e) => { 
//     e.preventDefault();
//     setLinks([...links, { link: "", linktext: "" }]);
//   };

//   const submitLinks = async (e) => {
//     e.preventDefault();
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
  
//     const raw = JSON.stringify({
//       links: links,
//       handle: handle,
//       pic: pic,
//       bio: bio,
//     });
  
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: raw,
//       redirect: "follow",
//     };
  
//     try {
//       console.log("Submitting links with requestOptions:", requestOptions);
//       const response = await fetch("/api/add", requestOptions);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const textResponse = await response.text();
//       if (textResponse) {
//         try {
//           const result = JSON.parse(textResponse);
//           if (result.success) {
//             toast.success(result.message);
//             setLinks([{ link: "", linktext: "" }]);
//             setHandle("");
//             setPic("");
//             setBio("");
//           } else {
//             toast.error(result.message);
//           }
//         } catch (error) {
//           console.error("Invalid JSON response:", textResponse);
//           toast.error("Error: " + textResponse);
//         }
//       } else {
//         toast.error("No response from server");
//       }
//     } catch (error) {
//       console.error("Error submitting links:", error);
//       toast.error("Error submitting links: " + error.message);
//     }
//   };
  
  

//   return (
//     <div>
//       <ToastContainer />
//       <section className="bg-blue-600 min-h-[100vh] grid grid-cols-2">
//         <div className="col-1 flex flex-col ml-[10vw] justify-center items-center gap-12">
//           <div className="form">
//             <form className="flex flex-col gap-3" onSubmit={submitLinks}>
//               <h1 className="text-2xl font-bold align-middle">Create Your Own Linkhub!</h1>
//               <div className="flex flex-col gap-2">
//                 <h1 className="text-xl font-semibold">Step-1: Claim Your Handle</h1>
//                 <input
//                   value={handle || ""}
//                   onChange={(e) => setHandle(e.target.value)}
//                   type="text"
//                   placeholder="Enter link text"
//                   className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
//                 />
//                 <h1 className="text-xl font-semibold">Step-2: Add Link</h1>
//                 {links.map((item, index) => (
//                   <div key={index}>
//                     <input
//                       value={item.linktext || ""}
//                       onChange={(e) => handleChange(index, item.link, e.target.value)}
//                       type="text"
//                       placeholder="Enter link text"
//                       className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
//                     />
//                     <input
//                       value={item.link || ""}
//                       onChange={(e) => handleChange(index, e.target.value, item.linktext)}
//                       type="text"
//                       placeholder="Enter link"
//                       className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
//                     />
//                   </div>
//                 ))}
//                 <button
//                   onClick={addLink}
//                   className="add rounded-3xl px-2 py-1 text-black hover:text-white max-w-[20vw] lg:mr-[80px] ml-[80px] transition-all hover:bg-blue-400 bg-sky-300"
//                 >
//                   + Add
//                 </button>
//                 <h1 className="text-xl font-semibold">Step-3: Add Image and Bio</h1>
//                 <input
//                   value={pic || ""}
//                   onChange={(e) => setPic(e.target.value)}
//                   type="text"
//                   placeholder="Enter image url"
//                   className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
//                 />
//                 <input
//                   value={bio || ""}
//                   onChange={(e) => setBio(e.target.value)}
//                   type="text"
//                   placeholder="Enter Bio"
//                   className="ml-6 p-2 rounded-lg shadow-lg focus:outline-blue-600"
//                 />
//                 <button
//                   disabled={pic === "" || handle === "" || links[0].linktext === ""}
//                   onClick={submitLinks}
//                   type="submit"
//                   className="done disabled:bg-slate-300 disabled:cursor-not-allowed cursor-wait disabled:text-black p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-lg"
//                 >
//                   Create your own hub
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//         <div className="col-2 flex flex-col ml-6 rounded-lg justify-center items-center">
//           <Image
//             src={tree}
//             className="hover:translate-x-1 hover:rotate-1 hover:shadow-xl transition-all duration-300 h-fit w-fit object-contain"
//             height={400}
//             width={400}
//             alt="tree image"
//           />
//         </div>
//       </section>
//     </div>
//   );
// };

// // GeneratePage wrapped with Suspense boundary
// const Page = () => {
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <GeneratePageContent />
//     </Suspense>
//   );
// };

// export default Page;
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import tree from "@/public/assests/image.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GeneratePageContent = () => {
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState("");
  const [pic, setPic] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setsuccess] = useState(false)
  const [goHandle, setgoHandle] = useState("")

  useEffect(() => {
    // Set the initial handle from the search params
    
    setHandle(searchParams.get("handle") || "");
    setgoHandle(searchParams.get("handle"));
    setsuccess(false);
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
    
    // Validate form data before submission
    if (!handle || handle.trim() === '') {
      toast.error("Handle is required");
      return;
    }
    
    if (!pic || pic.trim() === '') {
      toast.error("Image URL is required");
      return;
    }
    
    if (!links[0].link || !links[0].linktext) {
      toast.error("At least one complete link is required");
      return;
    }
    
    // Filter out any incomplete links
    const validLinks = links.filter(link => link.link && link.linktext);
    
    const formData = {
      links: validLinks,
      handle: handle,
      pic: pic,
      bio: bio || '', // Ensure bio is at least an empty string
    };
    
    console.log("Submitting form data:", formData);

    setIsSubmitting(true);
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(formData),
      redirect: "follow",
    };
  
    try {
      const response = await fetch("/api/add", requestOptions);
      
      // Get the response text first for debugging
      const textResponse = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", textResponse);
      
      // Try to parse as JSON if possible
      let result;
      try {
        result = JSON.parse(textResponse);
      } catch (e) {
        console.error("Could not parse response as JSON:", e);
        toast.error("Server returned invalid response format");
        setIsSubmitting(false);
        return;
      }
      
      if (!response.ok) {
        // If we have a result with an error message, show it
        toast.error(result?.message || `Error: ${response.status}`);
        setIsSubmitting(false);
        return;
      }
  
      if (result.success) {
        toast.success(result.message || "Link added successfully!");
        setsuccess(true);
        // Reset form
        setLinks([{ link: "", linktext: "" }]);
        setHandle("");
        setPic("");
        setBio("");
      } else {
        toast.error(result.message || "Unknown error occurred");
      }
    } catch (error) {
      console.error("Error submitting links:", error);
      toast.error("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-blue-600 min-h-[100vh] grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col px-6 md:ml-[10vw] justify-center items-center gap-12 py-8">
          <div className="form w-full max-w-md">
            <form className="flex flex-col gap-3" onSubmit={submitLinks}>
              <h1 className="text-2xl font-bold align-middle">Create Your Own Linkhub!</h1>
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Step 1: Claim Your Handle</h2>
                  <input
                    value={handle || ""}
                    onChange={(e) => setHandle(e.target.value)}
                    type="text"
                    placeholder="Enter your unique handle"
                    className="w-full p-2 rounded-lg shadow-lg focus:outline-blue-600"
                    required
                  />
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Step 2: Add Links</h2>
                  {links.map((item, index) => (
                    <div key={index} className="mb-2 flex flex-col gap-2">
                      <input
                        value={item.linktext || ""}
                        onChange={(e) => handleChange(index, item.link, e.target.value)}
                        type="text"
                        placeholder="Enter link text"
                        className="w-full p-2 rounded-lg shadow-lg focus:outline-blue-600"
                        required={index === 0}
                      />
                      <input
                        value={item.link || ""}
                        onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                        type="text"
                        placeholder="Enter link URL"
                        className="w-full p-2 rounded-lg shadow-lg focus:outline-blue-600"
                        required={index === 0}
                      />
                    </div>
                  ))}
                  <button
                    onClick={addLink}
                    type="button"
                    className="add rounded-full px-4 py-2 text-black hover:text-white transition-all hover:bg-blue-400 bg-sky-300 mt-2"
                  >
                    + Add Another Link
                  </button>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-2">Step 3: Add Image and Bio</h2>
                  <input
                    value={pic || ""}
                    onChange={(e) => setPic(e.target.value)}
                    type="text"
                    placeholder="Enter image URL"
                    className="w-full p-2 rounded-lg shadow-lg focus:outline-blue-600 mb-2"
                    required
                  />
                  <textarea
                    value={bio || ""}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Enter your bio"
                    className="w-full p-2 rounded-lg shadow-lg focus:outline-blue-600 min-h-[100px]"
                  />
                </div>
                
                <button
                  disabled={isSubmitting || !handle || !pic || !links[0].link || !links[0].linktext}
                  type="submit"
                  className="mt-4 p-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Creating..." : "Create Your Linkhub"}
                </button>
                {success && (
                  <a
                    href={`/${goHandle}`}
                    className="mt-4 p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors text-center block"
                  >
                    Go to your Linkhub
                  </a>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center p-6">
          <Image
            src={tree}
            className="hover:translate-x-1 hover:rotate-1 hover:shadow-xl transition-all duration-300 object-contain max-w-full"
            height={400}
            width={400}
            alt="tree image"
            priority
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