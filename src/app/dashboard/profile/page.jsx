'use client';
import React from 'react'
import { useLoadingContext } from '@/components/context/LoadingContext';
import Link from 'next/link';
function page() {
  const { user, refresh } = useLoadingContext()

  return (
    <div className='flex justify-center items-center h-[90vh] '>
      <div className=" m-2  rounded-xl shadow-md lg:w-[30%] sm:w-[50%] w-[90%] sm:mx-10 shadow-black/50 p-5 flex flex-col gap-3">
        <h1 className='text-xl text-center lg:text-4xl font-bold md:m-2'> Username : <span className='font-medium '>{user?.name}</span> </h1>
        <h1 className='text-xl  lg:text-2xl font-bold '> Email : <span className='font-medium '>{user?.email}</span> </h1>
        <h1 className='text-xl  lg:text-2xl font-bold '> Joing Date :  <span className='font-medium '>{formatDate(user?.createdAt)}</span> </h1>
        <h1 className='text-xl  lg:text-2xl font-bold '> Last Update :  <span className='font-medium '>{formatDate(user?.updatedAt)}</span> </h1>


        <Link href='/dashboard/profile/update'>
          <button className='bg-blue-600 cursor-pointer hover:bg-blue-700 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl'>Update</button>
        </Link>
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
    // hour: 'numeric',
    // minute: '2-digit',
    // hour12: true
  });
}