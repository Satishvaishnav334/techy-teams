
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoadingContext } from '@/components/context/LoadingContext';
export default function page() {

  const { user } = useLoadingContext()

  return (
    <div className='flex flex-col w-full sm:p-5'>
      <div className='bg-gray-200 sm:w-100 sm:m-4 mx-2 my-4 rounded-2xl shadow-md sm:p-10 p-3'>
        <h1 className='sm:text-2xl text-xl  text-center lg:text-3xl font-extrabold'>
          WelCome  To <span className='text-orange-600'>Teams</span>
        </h1>
      </div>
      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>My Teams</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
       
          {
            user?.team?.map((team, index) => (
              <div key={index} className=' bg-gray-200 flex-col flex justify-between rounded-xl min-h-[400px] shadow-md transition-all duration-300'>
                <div className='flex justify-between w-full'>
                  <span
                    className={team?.level === 'level 1' ? 'bg-gray-600 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-300 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white'
                      && team?.level === 'level 2' ? 'bg-gray-400 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-300 h-15  text-lg md:text-2xl font-extrabold md:px-6 p-4 rounded-br-xl rounded-tl-xl text-white'}>
                    {team?.level?.split("level")}
                  </span>
                  <span className=' mx-auto py-5 w-[80%] text-lg md:text-2xl font-extrabold md:px-6 text-center  rounded-br-xl rounded-tl-xl '>
                    {team?.teamName}
                  </span>
                </div>

                <div className='p-4 flex flex-col justify-start h-full'>
                  <span className='  font-bold  text-sm md:text-lg  py-2 px-1 '> Members :</span>
                  <div className='grid grid-cols-2 justify-around gap-5'>
                    {
                      team?.members?.map((member, index) => (
                        <div key={index}>

                          <div className='bg-white  font-bold  text-sm md:text-lg  py-2 px-4 rounded-lg flex justify-center items-center ' > {member.name}</div>
                          
                        </div>
                      ))
                    }
                    
                  </div>
                   <div className='my-5'>
                    <p className='text-center text-lg'>{team?.description}</p>
                </div>
                </div>
               
                 <div
                  className='flex justify-end mt-5'>
                  <p className='bg-gray-300 w-full xl:w-[60%] font-semibold  text-sm text-center    py-1 px-2 xl:rounded-br-xl xl:rounded-tl-xl'>
                    Created {formatDate(team?.createdAt)}
                    </p>
                  </div>

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


