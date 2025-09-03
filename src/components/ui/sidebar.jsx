"use client";;
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight, User } from "lucide-react";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <motion.div
      className={cn(
        " px-4  py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800  flex-shrink-0",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "60px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}>
      {children}

    </motion.div>
  );
};



export const SidebarSup = ({
  link,
  className,
  ...props
}) => {
  const { open, animate } = useSidebar();
  const [hoverOpen, setHoverOpen] = useState(false)
  const router = useRouter()
  useEffect(()=>{
    if(!open){
      setHoverOpen(false)
    }
  },[open])
  return (
    <div onDoubleClick={()=>router.push(link.href)}>
      <div onClick={() => { setHoverOpen(!hoverOpen) }}
            
       

        className={cn("flex items-center mt-2 justify-start gap-5 group/sidebar py-2", className)}
        {...props}>
        {link.icon}
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className=" font-bold  flex-shrink-0 hover:text-[#111111d1]  text-[#11111198] dark:text-neutral-200 text-lg group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
          {link.label}
        </motion.span>
        {open && (
          <div>
            { !hoverOpen ?
            <ChevronRight
              animate={{
                display: animate ? (open ? "inline-block" : "none") : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className=" font-bold  h-6 w-6 flex-shrink-0 hover:text-[#111111d1]  text-[#11111198] dark:text-neutral-200 text-lg group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
            </ChevronRight>
            :
            <ChevronDown
              animate={{
                display: animate ? (open ? "inline-block" : "none") : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className=" font-bold  h-6 w-6 flex-shrink-0 hover:text-[#111111d1]  text-[#11111198] dark:text-neutral-200 text-lg group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
            </ChevronDown>
            }
          </div>
        )}
      </div>
      {link?.sub?.map((item, index) => (
        <SidebarLink key={index} link={item} hoverOpen={hoverOpen} />
      ))}
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  hoverOpen,
  ...props
}) => {
  const { open, animate } = useSidebar();
  return (
    <div className={hoverOpen ? "flex" : 'hidden'}>
      <Link
        href={link.href}
        className={cn("flex items-center ml-5 border-blue-300 border-b-1 justify-start gap-2 group/sidebar py-2", className)}
        {...props}>
        {!open ? <></> : link.icon}
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className=" font-bold   h-6 w-6 flex-shrink-0 hover:text-[#111111d1]  text-[#11111198] dark:text-neutral-200 text-lg group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
          {link.label}
        </motion.span>
      </Link>
    </div>

  );
};