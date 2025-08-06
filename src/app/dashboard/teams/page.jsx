
'use client'
import React, { useState } from 'react';
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
  const router = useRouter()
  console.log(user)
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
              <div key={index} className='p-4 bg-gray-200 rounded-xl min-h-[400px] shadow-md transition-all duration-300'>
                <h2 className='text-2xl  text-center lg:text-3xl font-extrabold'>
                  {team?.teamName}
                </h2>
                <h3 className='text-xl  text-center lg:text-2xl '>
                  {team?.level}
                </h3>
                <p>{team?.description}</p>
                <p>{team?.createdBy?.name}</p>
                <p>{formatDate(team?.createdAt)}</p>

                <span> Members :
                  {
                   team?.members?.map((member, index) => (
                      <span key={index}> {member.name}</span>
                    ))
                  }
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
    hour: 'numeric',
    // minute: '2-digit',
    hour12: true
  });
}