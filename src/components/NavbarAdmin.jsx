'use client';
import React from 'react'
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { UserPen, House, User, LogOut, AlignRight, BellRing, X } from "lucide-react"
import { useEffect, useState } from "react";
import { deleteCookie, getCookie } from 'cookies-next'
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLoadingContext } from './context/LoadingContext';
import { toast } from 'sonner';
import { SidebarLink } from './ui/sidebar';
function Navbar({ adminLinks }) {
  const router = useRouter();
  const { user, setIsLogin, isLogin } = useLoadingContext()
  const [isOpen, setIsOpen] = useState(false);
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
      router.push('/admin-login')
    }
    else {
      router.push('/admin-login')
      setIsLogin(false)
    }
  }
  return (
    <div className='w-full bg-white justify-end  flex border-b-black border-1 shadow-lg  '>
      <nav className='border-b-1 w-[100%] p-3 '>
        <div className=' flex justify-between items-center   text-[#11111198]'>
          <div className='text-black w-[25%]  lg:w-[40%]'>
            <Link href='/admin/dashboard'>
              <h1 className='text-2xl lg:text-4xl font-extrabold md:m-2'>Techy_Teams</h1>
            </Link>
          </div>
          <div className='hidden md:flex  justify-end items-center w-[15%] gap-2'>
            <DropdownMenu role={user?.role}
              options={[
                {
                  label: "Profile",
                  onClick: () => router.push('/admin/dashboard/profile'),
                  Icon: <UserPen className="h-6 w-6" />,
                },
                {
                  label: isLogin ? "Logout" : "Login",
                  onClick: () => { Logout() },
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
            <div className='absolute top-15 right-0 bg-white z-5 m-2 shadow-lg rounded-lg p-4 w-53 sm:w-60'>
              < DropdownMenu role={user?.role}
                options={[

                  {
                    label: "Profile",
                    onClick: () => { router.push('/admin/dashboard/profile'); setIsOpen(false) },
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

              <div className=' flex  flex-col justify-between items-start my-5   font-semibold sm:text-lg text-sm gap-4'>
                {
                  adminLinks?.map((item, index) => (
                    <div key={index}  className='hover:text-[#111111d1] transition-colors duration-300'>
                      {item?.label}
                      <div className="flex flex-col">
                        {item?.sub?.map((sub, idx) => (
                          <Link key={idx} href={sub?.href} onClick={() => setIsOpen(false)} 
                          className={ pathname == sub?.href ? `flex items-center ml-5 border-blue-300 border-b-1 justify-start gap-2 group/sidebar py-2 hover:text-black text-black/80     transition-colors duration-300` : `flex items-center ml-5 border-blue-300 border-b-1 justify-start gap-2 group/sidebar py-2 hover:text-[#111111d1]   transition-colors duration-300` }
                          >
                            {sub?.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                  )}

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
