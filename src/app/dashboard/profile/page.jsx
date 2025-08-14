'use client';
import React from 'react'
import { useLoadingContext } from '@/components/context/LoadingContext';
import Link from 'next/link';
function page() {
  const { user, refresh } = useLoadingContext()

  return (
    <div className='flex justify-center items-center h-[90vh] '>
      <div className='bg-green-300 flex flex-col justify-center  rounded-2xl shadow-xl h-[80%] w-[50%] p-20'>
        <h1 className='text-2xl text-center lg:text-6xl font-extrabold md:m-2'> name : {user?.name}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'> Email : {user?.email}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'>Role : {user?.role}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'>Joing Date : {formatDate(user?.createdAt)}</h1>
        <h1 className='text-2xl lg:text-3xl  md:m-2'>Last Update : {formatDate(user?.updatedAt)}</h1>
        <Link href='/dashboard/profile/update'>
          <button className='bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl'>Update Profile</button>
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