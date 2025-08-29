'use client';
import React from 'react'
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { UserPen, House, User, LogOut, AlignRight, BellRing, X } from "lucide-react"
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from 'cookies-next'
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoadingContext } from './context/LoadingContext';
import { toast } from 'sonner';
function Navbar() {
  const router = useRouter();
  const { user, createNotification, setIsLogin, isLogin,isAdmin,setIsAdmin } = useLoadingContext()
  const [isOpen, setIsOpen] = useState(false);
  const Userlinks = [
    { label: 'Tasks', href: '/dashboard/tasks' },
    { label: 'Teams', href: '/dashboard/teams' },
    { label: 'Contact', href: '/contact' },
    { label: 'Pricing', href: '/pricing' },
  ]
  const Adminlinks = [
    {
      label: "Admin Dashboard",
      href: "/admin/dashboard",
    },
    {
      label: "Add New Task",
      href: "/admin/dashboard/manage-tasks/add-task",
    },
    {
      label: "Add New Team",
      href: "/admin/dashboard/manage-teams/add-team",
    },
    {
      label: "Manage Tasks",
      href: "/admin/dashboard/manage-tasks",
    },
    {
      label: "Manage Teams",
      href: "/admin/dashboard/manage-teams",
    },
  ]

  useEffect(() => {
    router.refresh();
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  const Logout = async () => {
    const token = getCookie('token')
    if (token) {

      deleteCookie('token');
      toast.info("Logout Succesfully", { closeButton: true })
      setIsLogin(false)
      setIsAdmin(false)
      redirect('/login')

    }
    else {
      router.push('/login')
      setIsLogin(false)
    }

  }

  return (
    <div className='w-full bg-white justify-end  flex border-b-black border-1 shadow-lg  '>
      <nav className='border-b-1 w-[100%] p-3 '>
        <div className=' flex justify-between items-center   text-[#11111198]'>
          <div className='text-black w-[25%]  lg:w-[40%]'>
            <Link href='/dashboard'>
              <h1 className='text-2xl lg:text-4xl font-extrabold md:m-2'>Techy_Teams</h1>
            </Link>
          </div>

          <div className=' hidden md:flex justify-end  items-center w-[55%] lg:w-[56%]   font-semibold lg:text-lg text-sm gap-10'>

            {isAdmin && (
              <Link href='/admin/dashboard' className='hover:text-[#111111d1]   font-semibold transition-colors duration-300'>
                Admin Panel
              </Link>
            )}

            {Userlinks.map((item, index) => (
              <Link key={index} href={item.href} className='hover:text-[#111111d1] transition-colors duration-300'>
                {item.label}
              </Link>
            ))}
          </div>

          <div className='hidden md:flex  justify-end items-center w-[15%] gap-2'>
            {/* <div className='mx-5'>
              <BellRing />
            </div> */}
            <DropdownMenu role={user?.role}
              options={[
                {
                  label: "Profile",
                  onClick: () => router.push('/dashboard/profile'),
                  Icon: <UserPen className="h-6 w-6" />,
                },
                {
                  label: isLogin ? "Logout" : "Login",
                  onClick: () => { user?.role ? Logout() : router.push('login') },
                  Icon: <LogOut className="h-6 w-6" />
                },
              ]}
            >

            </DropdownMenu>
          </div>


          <div className=' md:hidden flex justify-end items-center  gap-2'>
            {!isOpen ? <AlignRight onClick={() => setIsOpen(!isOpen)} /> : <X onClick={() => setIsOpen(!isOpen)} />}
          </div>

          {isOpen && (
            <div className='absolute top-15 right-0 bg-white z-5 m-2 shadow-lg rounded-lg p-4 w-48'>
              < DropdownMenu role={user?.role}
                options={[

                  {
                    label: "Profile",
                    onClick: () => { router.push('/dashboard/profile'); setIsOpen(false) },
                    Icon: <UserPen className="h-6 w-6" />,
                  },
                  {
                    label: isLogin ? "Logout" : "Login",
                    onClick: () => { user?.role ? Logout() : router.push('login'); setIsOpen(false) },
                    Icon: <LogOut className="h-6 w-6" />
                  },
                ]}
              >
                Menu
              </DropdownMenu>

              <div className=' flex  flex-col justify-between items-start my-5   font-semibold text-lg gap-4'>
                {isAdmin && (
                  Adminlinks.map((item, index) => (
                    <Link key={index} href={item.href} onClick={() => setIsOpen(false)} className='hover:text-[#111111d1] transition-colors duration-300'>
                      {item.label}
                    </Link>
                  ))
                )}
                {Userlinks.map((item, index) => (
                  <Link key={index} href={item.href} onClick={() => setIsOpen(false)} className='hover:text-[#111111d1] transition-colors duration-300'>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )
          }
        </div>
      </nav >

    </div >
  )
}

export default Navbar
