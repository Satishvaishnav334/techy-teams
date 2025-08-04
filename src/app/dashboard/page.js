'use client';
import React, { useEffect, useState, useRef } from 'react'
import { useUserDataContext } from '@/components/context/UserContext';
import Draggable from 'react-draggable';

function page() {
  const nodeRef = useRef(null)

  const { user, refresh } = useUserDataContext()
   const [pending, setPending] = useState({ x: 0, y: 0 });
   const [process, setProcess] = useState({ x: 0, y: 0 });
   const [complate, setComplate] = useState({ x: 0, y: 0 });
    const [currentArea, setCurrentArea] = useState('Area A'); // Initial area

    const handleStop = (e, data) => {
        const { x, y } = data;
        if (x < 100) {
            setCurrentArea('Area A');
            console.log(pending)
        } else if (x >= 100 && x < 500) {
            setCurrentArea('Area B');
            console.log(process)
        } else {
            setCurrentArea('Area C');
            console.log(complate)
        }
    };

  const pendingTask = user?.tasks?.filter(task => task?.status == "pending");
  const progressTask = user?.tasks?.filter(task => task?.status == "in-progress");
  const complateTask = user?.tasks?.filter(task => task?.status == "completed");

  console.log(pendingTask)
  return (
    <div className='flex flex-col w-full p-5 items-start '>
      <div className='bg-gray-200 flex flex-col justify-start  m-4 rounded-2xl shadow-md  p-10'>
        <h1 className='text-2xl text-center lg:text-5xl font-extrabold md:m-2'> Hello <span className='text-orange-600 '>{user?.name}</span></h1>
      </div>
      <div className='flex flex-col w-full justify-between gap-5 my-5'>


        <div className='w-full  bg-gray-200   rounded-xl shadow-md p-5'>
          <h1 className='text-xl text-center lg:text-3xl font-bold md:m-2'>My  Task</h1>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            <div className='gap-5 mt-5 ' > {currentArea}
              <h1 className='text-xl text-center lg:text-3xl font-bold md:m-2'> Panding Task</h1>

              {!pendingTask?.length > 0 ? <div>No Task</div> :
                pendingTask?.map((task, id) => (
                  <Draggable nodeRef={nodeRef}    position={pending} // Control position with state
                onStop={handleStop}>
                    <div key={id} ref={nodeRef} className='flex my-5 items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
                      <div className='flex flex-col items-center gap-4'>
                        <h1 className='text-lg font-semibold'>{task?.title}</h1>
                        <h1 className='text-lg font-semibold'>{task?.status}</h1>
                      </div>
                    </div>
                  </Draggable>
                )
                )}
            </div>
            <div className='gap-5  mt-5 '>

              <h1 className='text-xl text-center lg:text-3xl font-bold md:m-2'> In Progress Task</h1>

              {progressTask?.length > 0 ? progressTask?.map((task, id) => (
                <Draggable nodeRef={nodeRef}   position={process} // Control position with state
                onStop={handleStop}>
                  <div key={id} ref={nodeRef} className='flex my-5 items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
                    <div className='flex flex-col items-center gap-4'>
                      <h1 className='text-lg font-semibold'>{task?.title}</h1>
                      <h1 className='text-lg font-semibold'>{task?.status}</h1>
                    </div>
                  </div>
                </Draggable>
              )
              ) : <div>
                No Complated Task
              </div>}
            </div>
            <div className='gap-5 mt-5 '>

              <h1 className='text-xl text-center lg:text-3xl font-bold md:m-2'> Complated Task</h1>

              {complateTask?.length > 0 ? complateTask?.map((task, id) => (
                <Draggable nodeRef={nodeRef}   
                position={complate} // Control position with state
                onStop={handleStop}>
                  <div key={id} ref={nodeRef} className='flex my-5 items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
                    <div className='flex flex-col items-center gap-4'>
                      <h1 className='text-lg font-semibold'>{task?.title}</h1>
                      <h1 className='text-lg font-semibold'>{task?.status}</h1>
                    </div>
                  </div>
                </Draggable>
              )
              )
                : <div>
                  No Complated Task
                </div>
              }
            </div>

          </div>
        </div>


        <div className='w-full  bg-gray-200 rounded-xl shadow-md p-5'>
          <h1 className='text-xl text-center lg:text-3xl font-bold md:m-2'>My Team</h1>
          <div className='flex flex-col gap-5 mt-5'>
            {user?.team?.length > 0 ? user?.team?.map((team, id) => (
              <div key={id} className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
                <div className='flex items-center gap-4'>
                  <h1 className='text-lg font-semibold'>{team.teamName}</h1>
                </div>
              </div>
            )
            ) : <div>
              You have No Teams
            </div>}
          </div>
        </div>
      </div>
    </div >
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
    minute: '2-digit',
    hour12: true
  });
}