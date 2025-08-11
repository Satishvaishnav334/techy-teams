"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next/client";
import { LayoutDashboard, Users, ListTodo, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";

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
            label: "Add New Task",
            href: "/dashboard/admin/manage-tasks/add-task",
            icon: (
                <Plus className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
            ),
        },

        {
            label: "Add New Team",
            href: "/dashboard/admin/manage-teams/add-team",
            icon: (
                <Plus className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
            ),
        },
        {
            label: "Manage Tasks",
            href: "/dashboard/admin/manage-tasks",
            icon: (
                <ListTodo className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
        },
        {
            label: "Manage Teams",
            href: "/dashboard/admin/manage-teams",
            icon: (
                <Users className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
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
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-white w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                "w-full  " // for your use case, use `h-screen` instead of `h-[60vh]`
            )}>
            <Sidebar open={open} setOpen={setOpen} >
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                        <div className="mt-8 flex fixed flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>

                </SidebarBody>
            </Sidebar>
            <div className="h-full w-full">
                {children}
            </div>
        </div>
    );
}




