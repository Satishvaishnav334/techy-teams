"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next/client";
import { UserDataProvider } from "@/components/context/UserContext";
import { LayoutDashboard, Users, ListTodo } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function RootLayout({ children }) {
    const links = [
        {
            label: "Dashboard",
            href: "/dashboard/admin",
            icon: (
                <LayoutDashboard className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
            ),
        },
        {
            label: "Manage Teams",
            href: "/dashboard/admin/manage-teams",
            icon: (
                <Users className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
        },
        {
            label: "Manage Tasks",
            href: "/dashboard/admin/manage-tasks",
            icon: (
                <ListTodo className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
        },

    ];
    const [open, setOpen] = useState(false);
    useEffect(() => {
        const checkSession = () => {
            const token = getCookie('token');
            if (!token) {
                router.push('/login');
            }
        };
        checkSession();

    }, []);
    return (
        <UserDataProvider >
                

            <Navbar />
            {children}
            <Footer />
        </UserDataProvider>

    );
}

export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Admin Dashboard
            </motion.span>
        </Link>
    );
};

export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};

