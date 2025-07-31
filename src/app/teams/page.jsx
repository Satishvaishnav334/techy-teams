'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useUserDataContext } from '@/components/context/UserContext'
function page() {
  const { user } = useUserDataContext()
  return (
    <div className='h-screen'>


      My Teams
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 m-5'>
        {user?.team?.map((team, id) => (
          <div key={id} className='flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow'>
            <div className='flex flex-col items-center gap-4'>
              <h1 className='text-lg font-semibold'>{team.teamName}</h1>
              <p>{team.description}</p>
            </div>
          </div>
        )
        )}
      </div>
    </div>
  )
}

export default page
