'use client';
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next';
import { useUserDataContext } from '@/components/context/UserContext';
function page() {
  const { user, refresh } = useUserDataContext()
    return (
    <div className='flex flex-col w-full p-5 items-start '>
      <div className='bg-gray-200 flex flex-col justify-start  m-4 rounded-2xl shadow-md  p-10'>
        <h1 className='text-2xl text-center lg:text-5xl font-extrabold md:m-2'> Hello <span className='text-orange-600 '>{user?.name}</span></h1>
      </div>
      <div className='flex w-full justify-between gap-5 my-5'>
        <div className='w-[50%]  bg-gray-200   rounded-xl shadow-md p-5'>
          <h1 className='text-xl text-center lg:text-3xl font-bold md:m-2'>My Panding Task</h1>
          <div className='flex flex-col gap-5 mt-5'>
            {user?.tasks?.map((task, id) => (
              <div key={id} className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
                <div className='flex flex-col items-center gap-4'>
                  <h1 className='text-lg font-semibold'>{task.title}</h1>
                  <h1 className='text-lg font-semibold'>{task.status}</h1>
                </div>
              </div>
            )
            )}
          </div>
        </div>
        <div className='w-[50%]  bg-gray-200 rounded-xl shadow-md p-5'>
          <h1 className='text-xl text-center lg:text-3xl font-bold md:m-2'>My Team</h1>
          <div className='flex flex-col gap-5 mt-5'>
            {user?.team?.map((team, id) => (
              <div key={id} className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
                <div className='flex items-center gap-4'>
                  <h1 className='text-lg font-semibold'>{team.teamName}</h1>
                </div>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}