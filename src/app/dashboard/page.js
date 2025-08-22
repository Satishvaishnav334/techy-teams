'use client';
import React, { useState } from 'react';
import axios from 'axios'
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import { useLoadingContext } from '@/components/context/LoadingContext';

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });
  const date = new Date(task.dueDate)
  const date1 = new Date()
  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className='flex my-3 w-full border-1 border-black items-center justify-between  bg-white rounded-lg shadow-md cursor-move'
    >
      <div className='flex flex-col items-between     gap-3 w-full'>
        <span
          className={task?.priority === 'Important' ? 'bg-red-500 text-lg md:text-2xl font-bold rounded-t-lg  px-3 py-2  text-white' : 'bg-gray-500 rounded-t-lg  text-lg md:text-2xl font-bold  px-3 py-2   text-white'
            && task?.priority === 'Medium' ? 'bg-yellow-400 text-lg md:text-2xl font-bold  px-3 py-2 rounded-t-lg  text-white' : 'bg-gray-500 rounded-t-lg  text-lg md:text-2xl font-bold px-3 py-2  text-white'}>
          {task?.priority}
        </span>
        <span className=' mx-auto  w-[80%] text-lg md:text-2xl font-extrabold text-center   '>
          {task.title}
        </span>
        <div className='flex flex-col items-between justify-between  w-full'>
          <p className='text-lg  px-3'>{task.description}</p>
          <p className='px-3'>Status : {task.status}</p>
          <div className='flex justify-end w-full'>
            <div className='flex items-end  mt-2'>
              <p className={date1 < date ? 'bg-gray-300    font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl w-full  rounded-tl-xl' : 'bg-red-500 text-white w-full  font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl rounded-tl-xl'} >
                {date1 < date ? ` Due Date ${formatDate(task.dueDate)}` : `Over Due ${formatDate(task.dueDate)}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Column = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 bg-gray-200 rounded-xl min-h-[400px] shadow-md transition-all duration-300 ${isOver ? 'ring-2 ring-orange-400' : ''
        }`}
    >
      <h2 className=' text-center text-xl  lg:text-2xl font-bold mb-2 '>{title}</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task._id} task={task} />)
      ) : (
        <p className='text-center text-gray-500'>No Tasks</p>
      )}
    </div>
  );
};

export default function Page() {
  const { user, createNotification, refresh } = useLoadingContext();
  const [trigger, setTrigger] = useState(false); // trigger re-render

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = user?.tasks?.find((t) => t._id === taskId);
    if (!task || task.status === newStatus) return;

    // update task status temporarily
    task.status = newStatus;
    setTrigger((prev) => !prev);

    try {
      console.log(taskId, newStatus)
      const formData = new FormData()
      formData.append('taskId', taskId)
      formData.append('newStatus', newStatus)
      const res = await axios.put(`/api/get-tasks/update-status/`, formData);
      if (res.status == '200') {
        createNotification(`Updated Status of ${task?.title} to ${newStatus} by ${user?.name}`)

      }
    } catch (err) {
      console.error('API failed:', err);
    }

  };

  const getTasksByStatus = (status) =>
    user?.tasks?.filter((task) => task.status === status) || [];



  return (
    <div className='flex flex-col w-full p-5'>
      <div className='bg-gray-200 w-100 m-4 rounded-2xl shadow-md p-10'>
        <h1 className='text-2xl  text-center lg:text-3xl font-extrabold'>
          WelCome   <span className='text-orange-600'>{user?.name}</span>
        </h1>
      </div>

      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>My Task</h1>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            <Column
              id='pending'
              title='Pending Tasks'
              tasks={getTasksByStatus('pending')}
            />
            <Column
              id='in-progress'
              title='In Progress Tasks'
              tasks={getTasksByStatus('in-progress')}
            />
            <Column
              id='completed'
              title='Completed Tasks'
              tasks={getTasksByStatus('completed')}
            />
          </div>
        </DndContext>
      </div>

      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>My Teams</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>

          {
            user?.team?.map((team, index) => (

              <div key={index} className=' bg-gray-200 flex-col flex justify-between rounded-xl min-h-[400px] shadow-md transition-all duration-300'>
                <div className='flex justify-between w-full'>
                  <span
                    className={team?.level === 'level 1' ? 'bg-red-500 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-500 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white'
                      && team?.level === 'level 2' ? 'bg-yellow-400 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-500 h-15  text-lg md:text-2xl font-extrabold md:px-6 p-4 rounded-br-xl rounded-tl-xl text-white'}>
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
                    {/* <p className='text-center text-lg'>{team?.createdBy?.name}</p> */}
                  </div>
                </div>
                <div
                  className='flex justify-end mt-5'>
                  <p className='bg-gray-300 min-w-[40%] font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl rounded-tl-xl'>
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
  );
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
