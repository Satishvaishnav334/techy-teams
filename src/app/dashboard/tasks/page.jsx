'use client';
import React, { useRef, useState } from 'react';
import axios from 'axios'
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import { useLoadingContext } from '@/components/context/LoadingContext';

export default function Page() {
  const { user, createNotification, refresh } = useLoadingContext();
  const [trigger, setTrigger] = useState(false); // trigger re-render
  const [disable, setDisable] = useState(false)
  const handleDragEnd2 = async () => {
    createNotification(`Can't Updated Status after to backword}`)
  }
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
      // console.log(taskId, newStatus)
      const formData = new FormData()
      formData.append('taskId', taskId)
      formData.append('newStatus', newStatus)
      const res = await axios.put('/api/get-user/update-status/', formData);
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
    <div className='flex flex-col w-full sm:p-5'>
      <div className='bg-gray-200 sm:w-100 sm:m-4 mx-2 my-4 rounded-2xl shadow-md sm:p-10 p-3'>
        <h1 className='sm:text-2xl text-xl  text-center lg:text-3xl font-extrabold'>
          WellCome To  <span className='text-orange-600'>Taskbar</span>
        </h1>
      </div>

      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>My Task</h1>

        <DndContext collisionDetection={closestCenter} onDragEnd={!disable ? handleDragEnd : handleDragEnd2}>
          <div className='grid grid-cols-1  md:grid-cols-3 gap-5'>
            <Column
              disable={false}
              id='pending'
              title='Pending Tasks'
              tasks={getTasksByStatus('pending')}
            />
            <Column
              disable={false}
              id='in-progress'
              title='In Progress Tasks'
              tasks={getTasksByStatus('in-progress')}
            />
            <Column
              disable={true}
              id='completed'
              title='Completed Tasks'
              tasks={getTasksByStatus('completed')}
            />
          </div>
        </DndContext>
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
          className={task?.priority === 'Important' ? 'bg-gray-600 text-lg md:text-2xl font-bold rounded-t-lg  px-3 py-2  text-white' : 'bg-gray-300 rounded-t-lg  text-lg md:text-2xl font-bold  px-3 py-2   text-white'
            && task?.priority === 'Medium' ? 'bg-gray-400 text-lg md:text-2xl font-bold  px-3 py-2 rounded-t-lg  text-white' : 'bg-gray-300 rounded-t-lg  text-lg md:text-2xl font-bold px-3 py-2  text-white'}>
          {task?.priority}
        </span>
        <span className=' mx-auto  w-[80%] text-lg md:text-2xl font-extrabold text-center   '>
          {task.title}
        </span>
        <div className='flex flex-col items-between justify-between  w-full'>
          <p className='text-lg  px-3'>{task.description}</p>
          <p className='px-3'>Status : {task.status}</p>
          <div
            className='flex justify-end mt-5'>
            <p className={`bg-gray-300 w-full xl:w-[60%] font-semibold  text-sm text-center    py-1 px-2 xl:rounded-br-xl xl:rounded-tl-xl 
              ${date1 < date ? 'bg-gray-300 text-gray-800' : 'bg-red-500 text-white'} `} >
              {date1 < date ? ` Due Date ${formatDate(task.dueDate)}` : `Over Due ${formatDate(task.dueDate)}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Column = ({ id, title, tasks, disable }) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const noref = useRef()
  return (
    <div
      // ref={!disable ?  noref : setNodeRef}
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
