
'use client'
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useLoadingContext } from '@/components/context/LoadingContext';
import Xarrow from "react-xarrows";
const boxStyle = { border: "grey solid 2px", borderRadius: "10px", padding: "5px" };

export default function page() {
  const box1Ref = useRef(null);

  const { user } = useLoadingContext()
  console.log(user)
  return (
    <div className='flex flex-col w-full sm:p-5 gap-5 min-h-[90vh] p-3'>
      <div className='bg-gray-200 sm:w-100 sm:m-4 mx-2 my-4 rounded-xl shadow-md sm:p-10 p-3'>
        <h1 className='sm:text-2xl text-xl  text-center lg:text-3xl font-extrabold'>
          WelCome  To <span className='text-orange-600'>Teams</span>
        </h1>
      </div>

      <div className='flex justify-center items-center w-full h-full'>
        <div className=' bg-gray-200 flex-col flex justify-between rounded-xl sm:min-h-[400px] sm:min-w-[400px] shadow-md transition-all duration-300'>
          <div className='flex flex-col justify-between w-full'>
            <div
              className={user?.team?.level === 'level 1' ? 'bg-gray-600 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4  rounded-t-xl text-white' : 'bg-gray-300 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4  rounded-t-xl text-white'
                && user?.team?.level === 'level 2' ? 'bg-gray-400 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4  rounded-t-xl text-white' : 'bg-gray-300 h-15  text-lg md:text-2xl font-extrabold md:px-6 p-4  rounded-t-xl text-white'}>
              {user?.team?.level}
            </div>
            <span className=' mx-auto py-5 w-[80%] text-lg md:text-2xl font-extrabold md:px-6 text-center  rounded-br-xl rounded-tl-xl '>
              {user?.team?.teamName}
            </span>
          </div>
          <div className='my-5'>
            <p className='text-center text-lg'>{user?.team?.description}</p>
          </div>
          <div className='p-4 flex flex-col justify-center items-center h-full'>
            <span ref={box1Ref} className='  font-bold  text-sm md:text-lg  py-2 px-1 text-center w-50'> Teammates</span>
          </div>
          <div
            className='flex justify-end mt-5'>
            <p className='bg-gray-300 w-full xl:w-[60%] font-semibold  text-sm text-center    py-1 px-2 xl:rounded-br-xl xl:rounded-tl-xl'>
              Created {formatDate(user?.team?.createdAt)}
            </p>
          </div>
        </div>
        <div className='flex flex-col justify-around gap-5 mx-5'>
          {
            user?.team?.members?.map((member, index) => (
              <div key={index}>
                <Xarrow
                  start={box1Ref}
                  end={member?.name}
                />
                <div id={member?.name} className='bg-black text-white  font-bold  text-sm md:text-lg  py-2 px-4 rounded-lg flex justify-center items-center ' > {member.name}</div>
              </div>
            ))
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


