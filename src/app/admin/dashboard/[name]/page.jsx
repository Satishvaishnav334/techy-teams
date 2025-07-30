'use client'
import { getCookie } from 'cookies-next';
import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import {
  TableBody,
  TableCell,
  TableColumnHeader,
  TableHead,
  TableHeader,
  TableHeaderGroup,
  TableProvider,
  TableRow,
} from "@/components/ui/data-table";
import {
  addMonths,
  endOfMonth,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

function page() {
  const [user, setUser] = useState([])
  const [members, setMembers] = useState([])
  const router = useRouter()
  const { name } = useParams();
  console.log(name)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/get-users/${name}`);
        const res = await axios.get(`/api/get-users`);
        console.log(response.data)
        console.log(res.data)
        setUser(response.data);
        setMembers(res.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
    const checkSession = async () => {
      const token = getCookie('token')
      if (!token) {
        router.push('/admin/login')
      }
    }
    checkSession()
  }, []);
  console.log("object", members)
  return (
    <div>
      Manage Teams
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>

        {members.map((team, id) => (
          <div key={id} className='flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow'>
            <div className='flex flex-col items-center gap-4'>
              <h1 className='text-lg font-semibold'>{team.name}</h1>
              <p>{team.email}</p>
              <div>
                Joining at: {team.createdAt}


                <div>
                  Role: {team.role}

                </div>
              </div>
            </div>
          </div>
        )
        )}
      </div>
    </div>
    // <div className='flex flex-col items-center justify-start '>

    //   <h1 className='text-2xl font-bold mb-4'>Welcome Back {user.name}</h1>
    //   <div className='flex   items-between justify-between  h-full w-full  p-10 rounded-lg shadow-lg'>
    //     {/* <div className='h-150 w-[45%] bg-gray-200 rounded-lg shadow-lg'>
    //       <h1 className='text-2xl text-center p-2 font-bold mb-4'>Welcome </h1>
    //       <div className='bg-amber-500'>
    //         {members.map((member,index)=>{
    //           <div key={index}>
    //               <h1 className='text-2xl text-black'>{member.name}</h1>
    //           </div>
    //         })}
    //       </div>
    //     </div> */}

    //   </div>
    //   <div className='bg-amber-500'>
    //     {members.map((member, index) => {
    //       <div key={index}>
    //         <h1 className='text-2xl text-black'>{member.name}</h1>
    //       </div>
    //     })}
    //   </div>
    // </div>
  )
}

export default page
