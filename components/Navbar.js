"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const showNavbar = ["/", "/generate"].includes(pathname);

  return (
    <>
      {showNavbar && (
        <nav className="z-50 items-center w-[75vw] lg:w-[60vw] mx-auto fixed right-[15vw] gap-12 lg:right-[20vw] rounded-full p-7 top-10 flex lg:justify-between  backdrop-blur-3xl bg-transparent text-white shadow-2xl">
          <div className="logo text-3xl font-bold">Linkhub</div>
          <ul className="flex gap-5 items-center justify-center">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>

          <div className="log-sign flex gap-2">
            <button className="login">Log in</button>
            <button className="sign">Sign up Free</button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
