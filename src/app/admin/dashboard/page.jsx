'use client'
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDataContext } from '@/components/context/UserContaxt';


function page() {
  const {users,teams,admin} = useDataContext()
  const router = useRouter()

  
  useEffect(() => {
    const checkSession = async () => {
      const token = getCookie('token')
      if (!token) {
        router.push('/admin/login')
      }
    }
    checkSession()
  }, []);
  return (
    <div className='flex flex-col items-center justify-start h-screen overflow-scroll'>
      <h1 className='text-2xl font-bold mb-4'>Welcome Back {admin.name}</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 w-full  gap-5 mt-5 overflow-scroll'>
        <div className='grid grid-cols-1  gap-5 mt-5 overflow-scroll'>
          <h1 className='text-2xl text-center font-bold mb-4'>List of User</h1>
          {users.map((team, id) => (
            <div key={id} className='flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow'>
              <div className='flex flex-col items-center gap-4'>
                <h1 className='text-lg font-semibold'>{team.name}</h1>
                <p>{team.email}</p>
                <div>
                  Joining at: {team.createdAt}
                  <div>
                    Role: {team.role}
                  </div>
                </div>
              </div>
            </div>
          )
          )}
        </div>
        <div className='grid grid-cols-1  gap-5 mt-5 overflow-scroll'>
                    <h1 className='text-2xl text-center font-bold mb-4'>List of Teams</h1>

          {teams.map((team, id) => (
            <div key={id} className='flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow'>
              <div className='flex flex-col items-center gap-4'>
                <h1 className='text-lg font-semibold'>{team.teamName}</h1>
                <p>{team.description}</p>
                <div>
                  Members List:
                  {team.members.map((member, index) => (
                    <div key={index} className='flex flex-col items-center gap-2 mt-2 bg-blue-200 p-2 rounded'>
                      <span className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
                        {member.name} ({member.role})
                      </span>
                    </div>
                  ))}
                  <div>
                    Task List:
                    {team.tasks.map((task, index) => (
                      <div key={index} className='flex flex-col items-center gap-2 mt-2 bg-blue-200 p-2 rounded'>
                        <span className='  text-sm font-medium mr-2 px-2.5 py-0.5 rounded '>


                          <h1 className=''> Task Name : {task.title}</h1>
                          <p>Status : {task.status}</p>
                          <p>{task.description}</p>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
          )}
        </div>
      </div>

    </div>
  )
}

export default page
