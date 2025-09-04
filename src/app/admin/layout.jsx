"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next/client";
import { LayoutDashboard, Users, ListTodo, Edit, CirclePlus, Home, Trash, ScanEye } from "lucide-react";
import { AdminDataProvider } from "@/components/context/AdminContext";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink, SidebarSup } from "@/components/ui/sidebar";
import { useLoadingContext } from "@/components/context/LoadingContext";
import Loader from '@/components/ui/pulsating-loader'
import { useRouter, redirect } from "next/navigation";
import Navbar from "@/components/NavbarAdmin";

export default function RootLayout({ children }) {
    const router = useRouter()
    const links = [
        {
            label: "Dashboard",
            href: "/admin/dashboard",
            icon: (
                <LayoutDashboard className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
            ),
            sub: [
                {
                    label: "Go To Home",
                    href: "/admin/dashboard",
                    icon: (
                        <Home className=" font-bold dark:text-neutral-200 h-5 w-5 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                },

            ]
        },
        {
            label: "Manage Tasks",
            href: "/admin/dashboard/manage-tasks",

            icon: (
                <ListTodo className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
            sub: [
                {
                    label: "Create New Task",
                    href: "/admin/dashboard/manage-tasks/add-task",
                    icon: (
                        <CirclePlus className=" font-bold dark:text-neutral-200 h-5 w-5 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                },
                {
                    label: "Update Tasks",
                    href: "/admin/dashboard/manage-tasks",
                    icon: (
                        <Edit className=" font-bold dark:text-neutral-200 h-5 w-5 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                },

                {
                    label: "Delete Tasks",
                    href: "/admin/dashboard/manage-tasks",
                    icon: (
                        <Trash className=" font-bold dark:text-neutral-200 h-5 w-5 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                },
                {
                    label: "Review & Complate",
                    href: "/admin/dashboard/manage-tasks",
                    icon: (
                        <ScanEye className=" font-bold dark:text-neutral-200 h-5 w-5 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                }
            ]
        },
        {
            label: "Manage Teams",
            href: "/admin/dashboard/manage-teams",
            icon: (
                <Users className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
            sub: [
                {
                    label: "Create New Team",
                    href: "/admin/dashboard/manage-teams/add-team",
                    icon: (
                        <CirclePlus className=" font-bold dark:text-neutral-200 h-5 w-5 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                },
                {
                    label: "Update Teams",
                    href: "/admin/dashboard/manage-teams",
                    icon: (
                        <Edit className=" font-bold dark:text-neutral-200 h-5 w-5 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                },
                {
                    label: "Delete Teams",
                    href: "/admin/dashboard/manage-teams",
                    icon: (
                        <Trash className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
                    ),
                }
            ]
        },
    ]

    const { setLoading, loading } = useLoadingContext();
    const [open, setOpen] = useState(false)


    useEffect(() => {

        setLoading(false)
        const checkSession = () => {
            const token = getCookie('token');
            if (!token) {
                router.push('/admin-login');
            }
        }
        checkSession()
        setInterval(checkSession, 3000)

    }, []);

    return (
        <AdminDataProvider>
            <div
                className={cn(
                    "rounded-md flex flex-col md:flex-row bg-white flex-1  w-full border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                    " w-full " // for your use case, use `h-screen` instead of `h-[60vh]`
                )}>
                <Sidebar open={open} setOpen={setOpen} >
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            <div className=" flex fixed flex-col justify-start items-start mt-15">
                                {links.map((link, idx) => (
                                    <div key={idx} className="flex gap-3 flex-col">
                                        <SidebarSup key={idx} link={link} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </SidebarBody>
                </Sidebar>
                {
                    loading ?
                        <div className='h-[90vh] w-full flex  justify-center items-center'>
                            <Loader />
                        </div>
                        :
                        <div className="h-full w-full md:min-w-[90vw] lg:w-full  bg-white">
                            <Navbar islogin={true} isAdmin={true} adminLinks={links} />
                            {children}
                        </div>
                }
            </div>
        </AdminDataProvider>
    );
}




