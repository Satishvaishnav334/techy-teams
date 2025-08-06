'use client'

import { useRouter } from 'next/navigation';
import { useUserDataContext } from '@/components/context/UserContext';


function page() {
  const { users, teams, user, tasks } = useUserDataContext()
  const router = useRouter()


  return (
    <div className='flex flex-col items-center justify-start w-full'>
      <h1 className='text-2xl font-bold my-4'>Welcome Back {user?.name}</h1>
      <div>
        <div className='w-full  p-5 mb-10'>
          <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>All Tasks</h1>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            {tasks?.map((task, id) => (
              <div className='p-4 bg-gray-200 rounded-xl min-h-[400px] shadow-md transition-all duration-300' key={id}>
                <h1 >{task?.title}</h1>
                <p>{task?.description}</p>
                <p>{task?.status}</p>
                <span>{task?.assignedTo?.name}</span>
                <p >{formatDate(task?.dueDate)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='w-full  p-5 mb-10'>
          <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>All Teams</h1>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>

            {teams?.map((team, id) => (
              <div className='p-4 bg-gray-200 rounded-xl min-h-[400px] shadow-md transition-all duration-300' key={id} >

                <h1 >{team?.teamName}</h1>
                <p>{team?.description}</p>
                <p>{team?.level}</p>
                <span>
                  {team?.members?.map((user, id) => (
                    <span key={id}>{user?.name}</span>
                  ))}
                </span>

              </div>
            ))}
          </div>
        </div>
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