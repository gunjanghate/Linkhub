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
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GeneratePageContent = () => {
  const searchParams = useSearchParams();
  const [handle, setHandle] = useState("");
  const [pic, setPic] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [goHandle, setGoHandle] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formProgress, setFormProgress] = useState(33);

  useEffect(() => {
    setHandle(searchParams.get("handle") || "");
    setGoHandle(searchParams.get("handle"));
    setSuccess(false);
  }, [searchParams]);

  const handleChange = (index, field, value) => {
    setLinks((prevLinks) =>
      prevLinks.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const addLink = (e) => {
    e.preventDefault();
    setLinks([...links, { link: "", linktext: "" }]);
  };

  const removeLink = (index) => {
    if (links.length > 1) {
      setLinks(links.filter((_, i) => i !== index));
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setFormProgress(currentStep === 1 ? 66 : 100);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormProgress(currentStep === 3 ? 66 : 33);
    }
  };

  const validateCurrentStep = () => {
    if (currentStep === 1) {
      if (!handle || handle.trim() === "") {
        toast.error("Please enter a unique handle");
        return false;
      }
    } else if (currentStep === 2) {
      const hasValidLink = links.some(
        (link) => link.link && link.link.trim() !== "" && link.linktext && link.linktext.trim() !== ""
      );
      if (!hasValidLink) {
        toast.error("Please add at least one complete link");
        return false;
      }
    }
    return true;
  };

  const handleStepNavigation = (direction) => {
    if (direction === "next") {
      if (validateCurrentStep()) {
        nextStep();
      }
    } else {
      prevStep();
    }
  };

  const submitLinks = async (e) => {
    e.preventDefault();
    
    // Final validation before submission
    if (!handle || handle.trim() === "") {
      toast.error("Handle is required");
      setCurrentStep(1);
      return;
    }
    
    if (!pic || pic.trim() === "") {
      toast.error("Image URL is required");
      return;
    }
    
    // Filter out any incomplete links
    const validLinks = links.filter(link => link.link && link.linktext);
    
    if (validLinks.length === 0) {
      toast.error("At least one complete link is required");
      setCurrentStep(2);
      return;
    }
    
    const formData = {
      links: validLinks,
      handle: handle,
      pic: pic,
      bio: bio || "", // Ensure bio is at least an empty string
    };
    
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
      
      // Try to parse as JSON if possible
      let result;
      try {
        result = JSON.parse(textResponse);
      } catch (e) {
        toast.error("Server returned invalid response format");
        setIsSubmitting(false);
        return;
      }
      
      if (!response.ok) {
        toast.error(result?.message || `Error: ${response.status}`);
        setIsSubmitting(false);
        return;
      }
  
      if (result.success) {
        toast.success(result.message || "LinkHub created successfully!");
        setSuccess(true);
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const linkItem = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Step indicator UI
  const renderStepIndicator = () => (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-amber-400 text-gray-900' : 'bg-gray-300'}`}>
            1
          </div>
          <span className="ml-2 text-sm font-medium">Profile</span>
        </div>
        <div className="hidden sm:block w-24 h-1 bg-gray-300">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: formProgress >= 66 ? '100%' : '0%' }}
            className="h-full bg-amber-400"
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-amber-400 text-gray-900' : 'bg-gray-300'}`}>
            2
          </div>
          <span className="ml-2 text-sm font-medium">Links</span>
        </div>
        <div className="hidden sm:block w-24 h-1 bg-gray-300">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: formProgress >= 100 ? '100%' : '0%' }}
            className="h-full bg-amber-400"
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex items-center">
          <div className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium ${currentStep === 3 ? 'bg-amber-400 text-gray-900' : 'bg-gray-300'}`}>
            3
          </div>
          <span className="ml-2 text-sm font-medium">Bio</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <motion.div 
          initial={{ width: "33%" }}
          animate={{ width: `${formProgress}%` }}
          className="bg-amber-400 h-2 rounded-full"
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
      </div>
    </motion.div>
  );

  // Conditionally render steps
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            key="step1"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Claim Your Handle</h2>
            <div className="mb-6">
              <label htmlFor="handle" className="block text-white text-sm font-medium mb-2">
                Your unique identifier
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">@</span>
                <input
                  id="handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  type="text"
                  placeholder="username"
                  className="w-full py-3 pl-8 pr-4 rounded-lg bg-white/20 border border-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-blue-100">
                This will be your Linkhub URL: linkhub.com/{handle || "username"}
              </p>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div 
            key="step2"
            variants={stagger}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Add Your Links</h2>
            {links.map((item, index) => (
              <motion.div 
                key={index} 
                className="mb-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
                variants={linkItem}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-white">Link #{index + 1}</h3>
                  {links.length > 1 && (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => removeLink(index)}
                      className="text-red-300 hover:text-red-100 transition-colors"
                      aria-label="Remove link"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  )}
                </div>
                <div className="space-y-3">
                  <div>
                    <label htmlFor={`linktext-${index}`} className="block text-white text-sm font-medium mb-1">
                      Link Text
                    </label>
                    <input
                      id={`linktext-${index}`}
                      value={item.linktext}
                      onChange={(e) => handleChange(index, "linktext", e.target.value)}
                      type="text"
                      placeholder="e.g. My Website"
                      className="w-full py-2 px-3 rounded-md bg-white/20 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      required={index === 0}
                    />
                  </div>
                  <div>
                    <label htmlFor={`link-${index}`} className="block text-white text-sm font-medium mb-1">
                      URL
                    </label>
                    <input
                      id={`link-${index}`}
                      value={item.link}
                      onChange={(e) => handleChange(index, "link", e.target.value)}
                      type="url"
                      placeholder="https://example.com"
                      className="w-full py-2 px-3 rounded-md bg-white/20 border border-white/10 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                      required={index === 0}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addLink}
              type="button"
              className="w-full py-3 px-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Another Link
            </motion.button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div 
            key="step3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-2xl font-bold mb-4 text-white">Complete Your Profile</h2>
            <div className="mb-6">
              <label htmlFor="pic" className="block text-white text-sm font-medium mb-2">
                Profile Image URL
              </label>
              <input
                id="pic"
                value={pic}
                onChange={(e) => setPic(e.target.value)}
                type="url"
                placeholder="https://example.com/image.jpg"
                className="w-full py-3 px-4 rounded-lg bg-white/20 border border-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                required
              />
              <p className="mt-2 text-sm text-blue-100">
                Enter a direct link to your profile image (JPG, PNG or GIF)
              </p>
            </div>
            <div className="mb-6">
              <label htmlFor="bio" className="block text-white text-sm font-medium mb-2">
                Bio
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell people about yourself..."
                className="w-full py-3 px-4 rounded-lg bg-white/20 border border-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent min-h-[120px]"
              />
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800">
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <Link href="/" className="inline-flex items-center text-white hover:text-amber-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold mt-4 text-white">Create Your LinkHub</h1>
          <p className="text-blue-100 mt-2">Share all your important links in one place</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-blue-700/30 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/10"
          >
            {renderStepIndicator()}
            
            <form onSubmit={submitLinks}>
              <AnimatePresence mode="wait">
                {renderStepContent()}
              </AnimatePresence>
              
              <motion.div 
                className="mt-8 flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {currentStep > 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleStepNavigation("prev")}
                    className="px-5 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white border border-white/30 hover:bg-white/20 transition-all"
                  >
                    Back
                  </motion.button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 3 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleStepNavigation("next")}
                    className="px-5 py-2 bg-amber-400 rounded-lg text-gray-900 font-medium hover:bg-amber-300 transition-all"
                  >
                    Continue
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-amber-400 rounded-lg text-gray-900 font-medium hover:bg-amber-300 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating..." : "Create Your LinkHub"}
                  </motion.button>
                )}
              </motion.div>
            </form>

            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 p-6 bg-green-600/20 backdrop-blur-sm border border-green-400/30 rounded-lg"
                >
                  <div className="flex items-center mb-4">
                    <div className="bg-green-500 rounded-full p-1 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white">Success!</h3>
                  </div>
                  <p className="text-blue-100 mb-4">
                    Your LinkHub has been created successfully. You can now share your profile with others.
                  </p>
                  <Link href={`/${goHandle}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full p-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View Your LinkHub</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex flex-col justify-center items-center"
          >
            <div className="relative">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.4
                }}
                className="absolute -top-16 -right-16 w-32 h-32 bg-amber-400 rounded-full opacity-50 blur-2xl"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 100, 
                  delay: 0.6
                }}
                className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-400 rounded-full opacity-50 blur-2xl"
              />
              
              <motion.div
                whileHover={{ 
                  rotate: [0, -1, 1, -1, 0],
                  transition: { duration: 0.5 }
                }}
                className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/10 w-full max-w-md"
              >
                <div className="flex justify-center mb-6">
                  {pic ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/20">
                      <Image
                        src={pic}
                        alt="Preview"
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center border-4 border-white/20">
                      <span className="text-3xl text-gray-400">
                        {handle ? handle.charAt(0).toUpperCase() : "?"}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {handle ? `@${handle}` : "Your Handle"}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {bio || "Your bio will appear here..."}
                  </p>
                </div>
                
                <div className="space-y-3">
                  {links.map((item, index) => (
                    item.linktext && (
                      <div
                        key={index}
                        className="bg-white/10 py-2 px-4 rounded-lg text-center text-white hover:bg-white/20 transition-all cursor-pointer"
                      >
                        {item.linktext || "Link Text"}
                      </div>
                    )
                  ))}
                  
                  {links.every(link => !link.linktext) && (
                    <>
                      <div className="bg-white/10 py-2 px-4 rounded-lg text-center text-white/50">
                        Sample Link 1
                      </div>
                      <div className="bg-white/10 py-2 px-4 rounded-lg text-center text-white/50">
                        Sample Link 2
                      </div>
                    </>
                  )}
                </div>
                
                <div className="mt-6 text-center">
                  <span className="text-sm text-gray-400">
                    Preview of your LinkHub
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// GeneratePage wrapped with Suspense boundary
const Page = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-amber-400 border-r-amber-400 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white font-medium">Loading...</p>
        </div>
      </div>
    }>
      <GeneratePageContent />
    </Suspense>
  );
};

export default Page;