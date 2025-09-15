"use client";

import { useState, useEffect } from "react";
// import { Button } from "./button";
// import { Link } from "react-router-dom";
import * as motion from "motion/react-client";
import { AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import FixedReturnButton from "./fixed-return-button";
// import UserBox from "../custom/user-box";
// import api from "@/utils/api";

const Navbar = () => {
  interface Category {
    id: string;
    name: string;
  }
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [initialRender, setInitialRender] = useState(true);
  // const [categories, setCategories] = useState<Category[]>([]);
  const categories: Category[] = [
    { id: "1", name: "Politics" },
    { id: "2", name: "Finance" },
    { id: "3", name: "Technology" },
    { id: "4", name: "Sports" },
  ];

  useEffect(() => {
    setInitialRender(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 250);

      setIsAtTop(currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // useEffect(() => {
  //   const getCategories = async () => {
  //     try {
  //       const response = await api.get("http://localhost:3000/api/categories");
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };

  //   getCategories();
  // }, []);

  return (
    <motion.div
      className={`max-w-[95vw] px-4 sticky top-0 z-10 flex min-h-16 shadow-lg rounded-full items-center border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/65 sm:flex sm:justify-between transition-transform duration-300 ${
        visible
          ? "translate-y-0 scale-100"
          : "-translate-y-[calc(100%+12px)] scale-85"
      }`}
      initial={initialRender ? { width: "1200px" } : {}}
      animate={{
        width: isAtTop ? "1200px" : "800px",
        top: isAtTop ? "0px" : "12px",

        transition: {
          duration: 0.3,
          ease: [0.24, 0.11, 0.26, 1],
        },
      }}
    >
      <div
        className={`relative flex items-center w-full justify-between sm:ml-2.5 `}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="inline md:hidden">
            <FixedReturnButton />
          </div>
        </div>

        {/* <Link to="/" className="flex flex-row gap-2 md:absolute"> */}
        <Link
          href="/"
          className="absolute max-md:left-1/2 max-md:transform max-md:-translate-x-1/2"
        >
          <AnimatePresence mode="wait">
            {isAtTop ? (
              <motion.div
                key="fullName"
                initial={
                  initialRender ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
                }
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-2xl font-serif h-7 "
              >
                Skleran News
              </motion.div>
            ) : (
              <motion.div
                key="initials"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-3xl font-serif h-8.5"
              >
                S.N
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
        <nav className="hidden flex-row gap-6 fixed left-1/2 -translate-x-1/2 md:flex lg:gap-8">
          {categories.length > 0
            ? categories.map((category) => (
                <Button
                  key={category.id}
                  variant={"link"}
                  className="text-sm px-0 mx-4 text-foreground/60 transition-colors hover:text-foreground/100"
                >
                  {/*<Link
                href={`/${category.name.toLowerCase()}`}
                key={category.id}
                className="text-sm text-foreground/60 transition-colors hover:text-foreground/80"
                > */}
                  {category.name}
                  {/* </Link> */}
                </Button>
              ))
            : ""}
        </nav>
        <div className="relative size-9.5">
          <Image
            src={"/images/profile-picture.png"}
            alt="user profile image"
            width={38}
            height={38}
            draggable={false}
            className={`rounded-full absolute inset-0 m-auto size-9.5 transition-opacity duration-400 z-1`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
