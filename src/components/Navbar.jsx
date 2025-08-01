'use client';
import React from 'react'
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { UserPen, House, User, LogOut, AlignRight } from "lucide-react"
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUserDataContext } from './context/UserContext';
function Navbar() {
  const router = useRouter();
  const { user  } = useUserDataContext()
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { label: 'Tasks', href: '/dashboard/tasks' },
    { label: 'Teams', href: '/dashboard/teams' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Pricing', href: '/pricing' },
  
  ]
  
 
useEffect(()=>{
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
},[])




  const Logout = async () => {
    deleteCookie('token');
    deleteCookie('name');
    router.push('/login')
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

          <div className=' hidden md:flex justify-between items-center w-[45%]   font-semibold text-lg gap-4'>
            
            {user?.role == 'admin' && (
              <Link href='/dashboard/admin' className='hover:text-[#111111d1]  font-semibold transition-colors duration-300'>
                Admin Panel
              </Link>
            )}

            {items.map((item, index) => (
              <Link key={index} href={item.href} className='hover:text-[#111111d1] transition-colors duration-300'>
                {item.label}
              </Link>
            ))}
          </div>

          <div className='hidden md:flex  justify-end items-center w-[15%] gap-2'>
            <DropdownMenu role={user?.role}
              options={[
                {
                  label: "Profile",
                  onClick: () => router.push('/dashboard/profile'),
                  Icon: <UserPen className="h-6 w-6" />,
                },
                {
                  label: "Logout",
                  onClick: () => Logout(),
                  Icon: <LogOut className="h-6 w-6" />,
                },
              ]}
            >

            </DropdownMenu>
          </div>

          <div className=' md:hidden flex justify-end items-center  gap-2 '>
            <AlignRight onClick={() => setIsOpen(!isOpen)} />
          </div>

          {isOpen && (
            <div className='absolute top-15 right-0 bg-white m-2 shadow-lg rounded-lg p-4 w-48'>
              < DropdownMenu role={user?.role}
                options={[

                  {
                    label: "Dashboard",
                    onClick: () => router.push('/admin/dashboard'),
                    Icon: <House className="h-6 w-6" />,
                  },
                  {
                    label: "Profile",
                    onClick: () => router.push('/admin/profile'),
                    Icon: <UserPen className="h-6 w-6" />,
                  },
                  {
                    label: "Logout",
                    onClick: () => Logout(),
                    Icon: <LogOut className="h-6 w-6" />,
                  },
                ]}
              >
                Options
              </DropdownMenu>

              <div className=' flex  flex-col justify-between items-start my-5   font-semibold text-lg gap-4'>
                {items.map((item, index) => (
                  <Link key={index} href={item.href} className='hover:text-[#111111d1] transition-colors duration-300'>
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
