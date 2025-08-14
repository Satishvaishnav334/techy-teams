"use client";
import React, { useState, useEffect, createContext } from "react";
import { getCookie } from "cookies-next/client";
import { AdminDataProvider} from "@/components/context/AdminContext";
import { LayoutDashboard, Users, ListTodo } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import Loader from '@/components/ui/pulsating-loader'
import { useLoadingContext } from "@/components/context/LoadingContext";
// const DataContext = createContext();

export default function RootLayout({ children }) {
    const links = [
        {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: (
                <LayoutDashboard className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
            ),
        },
        {
            label: "Manage Teams",
            href: "/admin/dashboard/manage-teams",
            icon: (
                <Users className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
        },
        {
            label: "Manage Tasks",
            href: "/admin/dashboard/manage-tasks",
            icon: (
                <ListTodo className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
        },

    ];
    const { loading } = useLoadingContext()
    const router = useRouter()
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
        <>     
            {
                loading ?
                    <div className='h-[90vh] w-full flex  justify-center items-center'>
                        <Loader />
                    </div>
                    :
                    children
            }
        </>
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

