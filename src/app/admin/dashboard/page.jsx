'use client'
import React from 'react'
import { useEffect,useState } from 'react'
function page() {
  const [user, setUser] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const name = 'satish'; 
        const response = await fetch(`/api/get-users/${name}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  console.log(user)
  return (
    <div className='flex flex-col items-center justify-start '>
      <h1 className='text-2xl font-bold mb-4'>Welcome Back {user.name}</h1>
      <div className='flex   items-between justify-between  h-full w-full  p-10 rounded-lg shadow-lg'>
      <div className='h-150 w-[45%] bg-gray-200 rounded-lg shadow-lg'>
      <h1 className='text-2xl text-center p-2 font-bold mb-4'>Welcome </h1>

      </div>
      <div className='h-150 w-[45%] bg-gray-200 rounded-lg shadow-lg'>
              <h1 className='text-2xl text-center p-2 font-bold mb-4'>Welcome </h1>

      </div>
      </div>
    </div>
  )
}

export default page
