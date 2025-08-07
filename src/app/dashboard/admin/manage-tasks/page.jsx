'use client';
import React, { useState } from 'react';
import axios from 'axios'
import { toast } from "sonner"
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import Link from 'next/link';
import { useUserDataContext } from '@/components/context/UserContext';

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

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
      className='flex my-3 w-full items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-move'
    >
      <div className='flex flex-col items-start gap-2 w-full'>
        <span
          className={task?.priority === 'Important' ? 'bg-red-500 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-500 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white'
            && task?.priority === 'Meduim' ? 'bg-gray-700 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-500 h-15  text-lg md:text-2xl font-extrabold md:px-6 p-4 rounded-br-xl rounded-tl-xl text-white'}>
          {task?.priority}
        </span>
        <h1 className='text-xl text-center w-full  font-semibold'>{task.title}</h1>
        <p className='text-lg text-gray-500'>{task.status}</p>
        <Link href={`/dashboard/admin/manage-tasks/update/${task.slug}`}>
          <button className='bg-blue-600 cursor-pointer font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl'>Update</button>
        </Link>
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
  const { tasks } = useUserDataContext();
  console.log(tasks)
  const [trigger, setTrigger] = useState(false); // trigger re-render

  const handleDragEnd = async ({ active, over }) => {
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    const task = tasks?.find((t) => t._id === taskId);
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
      console.log(`Updated task ${taskId} to ${newStatus}`, res);
    } catch (err) {
      console.error('API failed:', err);
    }
    finally {
      toast.success("Status Update Succesfully", { description: `Current Status is ${newStatus}`, closeButton: true })
    }
  };

  const getTasksByStatus = (status) =>
    tasks?.filter((task) => task.status === status) || [];

  if (!tasks) {
    return (
      <div className='p-10 text-xl font-bold text-center'>Loading tasks...</div>
    );
  }

  return (
    <div className='flex flex-col w-full p-5'>


      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>All Task</h1>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
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
    </div>
  );
}
