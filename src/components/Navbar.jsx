'use client';
import React from 'react'
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { UserPen, House, User, LogOut, AlignRight, BellRing, X } from "lucide-react"
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from 'cookies-next'
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
 const links = [
        {
            label: "Home",
            href: "/dashboard",
           
        },
        {
            label: "Tasks",
            href: "/dashboard/tasks",
       
        },
        {
            label: "Teams",
            href: "/dashboard/teams",
        
        },
    ];
function Navbar({ islogin, menuHide }) {
  const router = useRouter();
  console.log(menuHide)
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(islogin);
    const pathname = usePathname();

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
      router.push('/login')
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
            {
              <div className='flex gap-10'>
                  <Link href="/dashboard"  className={ pathname == '/dashboard' ? `hover:text-black text-black    font-semibold transition-colors duration-300` : `hover:text-[#111111d1]  font-semibold transition-colors duration-300` }>
                    Home
                  </Link>
                  <Link href="/dashboard/tasks"  className={ pathname == '/dashboard/tasks' ? `hover:text-black text-black     font-semibold transition-colors duration-300` : `hover:text-[#111111d1]  font-semibold transition-colors duration-300` }>
                    Tasks
                  </Link>
                  <Link href="/dashboard/teams"  className={ pathname == '/dashboard/teams' ? `hover:text-black text-black    font-semibold transition-colors duration-300` : `hover:text-[#111111d1]  font-semibold transition-colors duration-300` }>
                    Teams
                  </Link>
                
              </div>
            }
          </div>


          <div className='hidden md:flex  justify-end items-center w-[15%] gap-2'>
            <DropdownMenu
              options={[
                {
                  label: isLogin ? "Profile" : "SignUp",
                  onClick: () => { isLogin ? router.push('/dashboard/profile') : router.push('/register') },
                  Icon: <UserPen className="h-6 w-6" />,
                },
                {
                  label: isLogin ? "Logout" : "Login",
                  onClick: () => { isLogin ? Logout() : router.push('/login') },
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

              <DropdownMenu
                options={[
                  {
                    label: isLogin ? "Profile" : "SignUp",
                    onClick: () => { isLogin ? router.push('/dashboard/profile') : router.push('/register') },
                    Icon: <UserPen className="h-6 w-6" />,
                  },
                  {
                    label: isLogin ? "Logout" : "Login",
                    onClick: () => { isLogin ? Logout() : router.push('/login') },
                    Icon: <LogOut className="h-6 w-6" />
                  },
                ]}
              >
              </DropdownMenu>


              <div className=' flex  flex-col justify-between items-start my-5   font-semibold text-lg gap-4'>
                {
                  links.map((item, index) => (
                    <Link key={index} href={item.href} onClick={() => setIsOpen(false)} className='hover:text-[#111111d1] transition-colors duration-300'>
                      {item.label}
                    </Link>
                  ))
                }
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
