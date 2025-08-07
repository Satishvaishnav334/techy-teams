
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserDataContext } from '@/components/context/UserContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function page() {

  const { user } = useUserDataContext()
  const [teams, setTeams] = useState([])
  const [totalMembers, setTotalMembers] = useState(false)
  const router = useRouter()
  console.log(user)
  
  useEffect(()=>{
    if(user?.team?.map((team)=>team?.members?.length < 4)){
    setTotalMembers(true)
    console.log(totalMembers,"hi")
  }
  },[user])

  if (!user?.team) {
    return (
      <div className='p-10 text-xl font-bold text-center'>Loading teams...</div>
    );
  }
  return (
    <div className='flex flex-col w-full p-5'>
      <div className='bg-gray-200  m-4 rounded-2xl shadow-md p-10'>
        <h1 className='text-2xl  text-center lg:text-3xl font-extrabold'>
          WelCome To  <span className='text-orange-600'>Teams</span>
        </h1>
      </div>
      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>My Teams</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
          {
            user?.team?.map((team, index) => (
              <div key={index} className=' bg-gray-200 flex-col flex justify-between rounded-xl min-h-[400px] shadow-md transition-all duration-300'>
                <div className='flex justify-between w-full'>
                  <span
                    className={team?.level === 'level 1' ? 'bg-red-500 h-18 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-500 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white'
                      && team?.level === 'level 2' ? 'bg-gray-700 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-500  text-lg md:text-2xl font-extrabold md:px-6 p-4 rounded-br-xl rounded-tl-xl text-white'}>
                    {team?.level?.split("level")}
                  </span>
                  <span className=' mx-auto py-5 w-[80%] text-lg md:text-2xl font-extrabold md:px-6 text-center  rounded-br-xl rounded-tl-xl '>
                    {team?.teamName}
                  </span>
                </div>

                <div className='p-4 flex flex-col  h-full'>
                  <span className='  font-bold  text-sm md:text-lg  py-2 px-1 '> Members :</span>
                    <div className='grid grid-cols-2 justify-around gap-5'>
                      {
                        team?.members?.map((member, index) => (
                          <div className='bg-white  font-bold  text-sm md:text-lg  py-2 px-4 rounded-lg flex justify-center items-center ' key={index}> {member.name}</div>
                          
                        ))
                      }
                    </div>
                </div>
                <p>{team?.description}</p>
                <p>{team?.createdBy?.name}</p>
                <span
                  className='flex justify-end'>
                  <p className='bg-gray-300 min-w-[40%] font-bold  text-sm md:text-lg text-right    py-2 px-4 rounded-br-xl rounded-tl-xl'>
                    Created {formatDate(team?.createdAt)}
                  </p>
                </span>

              </div>
            )

            )

          }
        </div>
      </div>
    </div>
  )
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: '2-digit',
    hour12: true
  });
}