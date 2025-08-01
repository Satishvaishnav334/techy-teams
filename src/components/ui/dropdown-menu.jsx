"use client";;
import { Button } from "./button.jsx";
import { ChevronDown,User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
const DropdownMenu = ({
  options,
  children,
  role
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin,setIsAdmin] = useState()
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

    
  

  return (
    <div className="relative inline-block">
      <Button
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
      
        className="py-6 px-4 bg-[#11111198] hover:bg-[#111111d1] shadow-[0_0_20px_rgba(0,0,0,0.2)] border-none rounded-xl backdrop-blur-sm">
       {children ?? "Menu"}
        <>
          <motion.span
            className="ml-2"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut", type: "spring" }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div   onMouseLeave={() => setIsOpen(false)}
            initial={{ y: -5,x:-80 ,scale: 0.95, filter: "blur(10px)" }}
            animate={{ y: 10,x:-80 ,scale: 1, filter: "blur(0px)" }}
            exit={{ y: -5, scale: 0.95, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: "circInOut", type: "spring" }}
            className="absolute  z-10   py-3 px-5  bg-[#11111198] rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm flex flex-col gap-2">
            {options && options.length > 0 ? (
              options.map((option, index) => (
                <motion.button
                  initial={{
                    opacity: 0,
                    x: 10,
                    scale: 0.95,
                    filter: "blur(10px)",
                  }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    x: 10,
                    scale: 0.95,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    ease: "easeInOut",
                    type: "spring",
                  }}
                  whileHover={{
                    backgroundColor: "#11111140",
                    transition: {
                      duration: 0.4,
                      ease: "easeInOut",
                    },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: {
                      duration: 0.2,
                      ease: "easeInOut",
                    },
                  }}
                  key={option.label}
                  onClick={option.onClick}
                  className="px-2 py-3  cursor-pointer text-white text-md rounded-lg w-full text-left flex items-center gap-x-2">
                  {option.Icon}
                  {option.label}
                </motion.button>
              ))
            ) : (
              <div className="px-4 py-2 text-white text-xs">No options</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { DropdownMenu };