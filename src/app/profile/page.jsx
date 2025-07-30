'use client';
import React from 'react'
import { useUserDataContext } from '@/components/context/UserContext';
function page() {
  const {user,refresh} = useUserDataContext()


  return (
    <div>
      Edit Profile {user.name}
      <button onClick={refresh} >Click me </button>
    </div>
  )
}

export default page
