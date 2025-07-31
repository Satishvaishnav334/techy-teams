'use client';
import React from 'react'
import { useUserDataContext } from '@/components/context/UserContext';
function page() {
  const { user, refresh } = useUserDataContext()

  return (
    <div className='flex flex-col justify-center items-center h-[90vh] '>
      <div className='bg-green-300 flex flex-col justify-center  rounded-2xl shadow-xl h-[40%] w-[50%] p-20'>
        <h1 className='text-2xl text-center lg:text-8xl font-extrabold md:m-2'>{user?.name}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'>{user?.email}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'>{formatDate(user?.createdAt)}</h1>
      </div>
      <div className='flex justify-between gap-5'>
        <div>
          <h1 className='text-2xl lg:text-3xl  md:m-2'>My Task</h1>
          <div className='flex flex-col gap-5 mt-5'>
            {user?.tasks?.map((task, id) => (
              <div key={id} className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
                <div className='flex items-center gap-4'>
                  <h1 className='text-lg font-semibold'>{task.title}</h1>
                </div>
              </div>
            )
            )}
          </div>
        </div>
        <div>
          <h1 className='text-2xl lg:text-3xl  md:m-2'>My Team</h1>
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