'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUserDataContext } from '@/components/context/UserContext'
function page() {
  const {tasks} = useUserDataContext()
  return (
    <div>
      Manage Tasks
      <div className='flex flex-col gap-5 mt-5'>
         <div  className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
            <div className='flex items-center gap-4'>
              <h1>{ }</h1>
              <h1 className='text-lg font-semibold'><Link href='/admin/dashboard/manage-tasks/add-task'>Add New Task</Link></h1>  
            </div>
          </div>
        {tasks.map((task,id) => (
          <div key={id} className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
            <div className='flex items-center gap-4'>
             
              <h1 className='text-lg font-semibold'>{task.title}</h1>  
            </div>
          </div>
        )
        )}
      </div>
    </div>
  )
}

export default page
