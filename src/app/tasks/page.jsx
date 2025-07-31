'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUserDataContext } from '@/components/context/UserContext'
function page() {
  const {user} = useUserDataContext()
  return (
    <div className='h-screen'>
      Manage Tasks
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 m-5'>
        {user?.tasks?.map((task,id) => (
          <div key={id} className='flex flex-col items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
            <div className='flex  items-center gap-4'>
              <h1 className='text-lg font-semibold'>{task.title}</h1>  
            </div>
              <h1 className='text-lg font-semibold'>{task.status}</h1>  
              <h1 className='text-lg font-semibold'>{formatDate(task.dueDate)}</h1>  
          </div>
        )
        )}
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
    // minute: '2-digit',
    hour12: true
  });
}