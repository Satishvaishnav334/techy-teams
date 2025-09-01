"use client";
import React, { useState, useEffect } from "react";
import { getCookie } from "cookies-next/client";
import { LayoutDashboard, Users, ListTodo, Plus } from "lucide-react";
import { AdminDataProvider } from "@/components/context/AdminContext";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
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
        },
        {
            label: "Manage Tasks",
            href: "/admin/dashboard/manage-tasks",

            icon: (
                <ListTodo className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 ]" />
            ),
        },
        {
            label: "Create New Task",
            href: "/admin/dashboard/manage-teams/add-task",
            icon: (
                <Plus className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
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
            label: "Create New Team",
            href: "/admin/dashboard/manage-teams/add-team",
            icon: (
                <Plus className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
            ),
        },
    ];
    // sub: [{
    //     label: "Add New Team",
    //     href: "/admin/dashboard/manage-teams/add-team",
    //     icon: (
    //         <Plus className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
    //     ),
    // },{
    //     label: "Update Teams",
    //     href: "/admin/dashboard/manage-tasks",
    //     icon: (
    //         <Plus className=" font-bold dark:text-neutral-200 h-6 w-6 flex-shrink-0 text-[#111111d1] transition-colors duration-300 " />
    //     ),
    // }],

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
                    "rounded-md flex flex-col md:flex-row bg-white w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
                    "w-full  " // for your use case, use `h-screen` instead of `h-[60vh]`
                )}>
                <Sidebar open={open} setOpen={setOpen} >
                    <SidebarBody className="justify-between gap-10">
                        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                            <div className=" flex fixed flex-col gap-2 mt-8">

                                {links.map((link, idx) => (
                                    <SidebarLink key={idx} link={link} />
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
                        <div className="h-full w-full bg-white">
                            <Navbar islogin={true} isAdmin={true} />
                            {children}
                        </div>
                }

            </div>
        </AdminDataProvider>
    );
}




