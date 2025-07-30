'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
function page() {
  const [teams, setTeams] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/get-teams');
        const data = await response.json();
        setTeams(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  console.log(teams)
  return (
    <div>
      
      Manage Teams
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-5'>
         
        {teams.map((team,id) => (
          <div key={id} className='flex items-center justify-center p-4 bg-gray-100 rounded-lg shadow'>
            <div className='flex flex-col items-center gap-4'>
              <h1 className='text-lg font-semibold'>{team.teamName}</h1>  
              <p>{team.description}</p>
              <div>
                Members List:
                {team.members.map((member, index) => (
                   <div key={index} className='flex flex-col items-center gap-2 mt-2 bg-blue-200 p-2 rounded'>
                  <span  className='bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800'>
                   {member.name} ({member.role})
                  </span>
                  </div>
                ))}
                <div>
Task List:
                  {team.tasks.map((task, index) => (
                    <div key={index} className='flex flex-col items-center gap-2 mt-2 bg-blue-200 p-2 rounded'>
                    <span  className='  text-sm font-medium mr-2 px-2.5 py-0.5 rounded '>
                     
                       
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
  )
}

export default page
