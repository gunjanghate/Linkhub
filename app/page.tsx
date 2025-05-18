"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [isInputEmpty, setIsInputEmpty] = useState(false);

  const createTree = () => {
    if (!handle.trim()) {
      setIsInputEmpty(true);
      setTimeout(() => setIsInputEmpty(false), 2000);
      return;
    }
    router.push(`/generate?handle=${handle}`);
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <main className="text-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="bg-gradient-to-br from-green-800 to-green-900 min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-12"
      >
        <motion.div 
          variants={fadeIn}
          className="flex flex-col justify-center items-center md:items-start gap-8 md:gap-12 w-full md:w-1/2 order-2 md:order-1"
        >
          <div className="text-center md:text-left max-w-md">
            <motion.h1 
              className="text-4xl md:text-5xl text-amber-300 font-extrabold leading-tight mb-6"
              variants={fadeIn}
            >
              Everything you are. In one, simple link in bio.
            </motion.h1>
            <motion.p 
              className="text-lg text-green-100 mb-4"
              variants={fadeIn}
            >
              Create your personal hub for all your important links. Simple, elegant, memorable.
            </motion.p>
          </div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            variants={fadeIn}
          >
            <div className="relative flex-grow">
              <input
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className={`w-full py-3 px-4 rounded-lg focus:outline-none text-gray-800 drop-shadow-xl transition-all ${
                  isInputEmpty ? "animate-shake border-2 border-red-500" : ""
                }`}
                type="text"
                placeholder="Enter your handle"
                aria-label="Handle"
              />
              {isInputEmpty && (
                <p className="absolute text-red-400 text-sm mt-1">Please enter a handle</p>
              )}
            </div>
            <motion.button
              onClick={createTree}
              className="px-6 py-3 bg-amber-400 rounded-lg text-gray-900 font-semibold hover:bg-amber-300 transition-all drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={fadeIn}
          className="w-full md:w-1/2 flex justify-center items-center mb-12 md:mb-0 order-1 md:order-2"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
          >
            <Image
              src="/assests/image.png"
              alt="Linkhub Preview"
              className="drop-shadow-2xl rounded-lg"
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-red-800 to-purple-900 py-20 px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Welcome to <span className="text-amber-300">Linkhub</span></h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">Your all-in-one solution for sharing multiple links with your audience.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Simple to Use",
              description: "Create your LinkHub in seconds with our easy-to-use interface.",
              icon: "🚀"
            },
            {
              title: "Fully Customizable",
              description: "Personalize your profile with custom colors, images and more.",
              icon: "🎨"
            },
            {
              title: "Mobile Friendly",
              description: "Look great on all devices with our responsive design.",
              icon: "📱"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-xl hover:bg-white/20 transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="#top">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-300 transition-all"
            >
              Get Started Now
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 px-6 text-center">
        <p className="text-gray-400">© {new Date().getFullYear()} Linkhub. All rights reserved.</p>
      </footer>
    </main>
  );
}