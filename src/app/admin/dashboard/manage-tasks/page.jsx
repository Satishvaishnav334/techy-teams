'use client';
import React, { useMemo, useState } from 'react';
import axios from 'axios'
import { Pencil, Trash, Plus } from 'lucide-react';
import { toast } from "sonner"
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
} from '@dnd-kit/core';
import Link from 'next/link';
import { useAdminContext } from '@/components/context/AdminContext';

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: task._id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
  };

  const date = new Date(task.dueDate)
  const date1 = new Date()


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
            && task?.priority === 'Medium' ? 'bg-gray-400  text-lg md:text-2xl font-bold  px-3 py-2 rounded-t-lg  text-white' : 'bg-gray-300  rounded-t-lg  text-lg md:text-2xl font-bold px-3 py-2  text-white'}>
          {task?.priority}
        </span>
        <span className=' mx-auto  w-[80%] text-lg md:text-2xl font-extrabold text-center   '>
          {task.title}
        </span>
        <div className='flex flex-col items-between justify-between  w-full'>
          <p className='text-lg  px-3'>{task.description}</p>
          <p className='px-3'>Status : {task.status}</p>
          <div className='px-3'>
            Assigned To :  {task?.assignedTo?.name}
          </div>

          <div className='flex justify-between  w-full'>
            <div className='flex justify-between gap-2 my-2 mx-3  '>
              <Link href={`/admin/dashboard/manage-tasks/update/${task?.slug}`}
                className=' bg-yellow-500 hover:bg-yellow-600 text-white font-semibold flex gap-2 text-sm text-right px-3 py-2  rounded-lg'>
                <Pencil size={18} />Edit
              </Link>
              <Link href={`/admin/dashboard/manage-tasks/delete/${task?.slug}`}
                className='bg-red-500 hover:bg-red-600 text-white z-50 cursor-pointer flex gap-2 font-semibold  text-sm text-right px-3 py-2 rounded-lg'>
                <Trash size={18} /> Delete
              </Link>
            </div>

            <div className='flex items-end  '>
              <p className={date1 < date ? 'bg-gray-300   font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl w-full  rounded-tl-xl' : 'bg-red-500 text-white w-full font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl rounded-tl-xl'} >
                Due {formatDate(task.dueDate)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Column = ({ id, title, tasks, searchItem, setSearchItem, filterSearch }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 bg-gray-200 rounded-xl min-h-[400px] shadow-md transition-all duration-300 ${isOver ? 'ring-2 ring-orange-400' : ''
        }`}
    >
      {/* <div className="flex gap-4 w-full mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded w-full"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
      </div> */}
      <h2 className=' text-center text-xl  lg:text-2xl font-bold mb-2 '>{title}</h2>
      {tasks?.length > 0 ? (
        tasks?.map((task) => <TaskCard key={task._id} task={task} />)
      ) : (
        <p className='text-center text-gray-500'>No Tasks</p>
      )}
    </div>
  );
};

export default function Page() {
  const { tasks,createNotification ,user} = useAdminContext();
  console.log(tasks)
  const [trigger, setTrigger] = useState(false); // trigger re-render
  // const [searchItem, setSearchItem] = useState('')

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
     if (res.status == '200') {
                createNotification(`Updated Status of ${task?.title} to ${newStatus} by ${user?.name}`)
                router.push('/admin/dashboard/manage-tasks')
            }
    } catch (err) {
      console.error('API failed:', err);
    }
    
  };

  const getTasksByStatus = (status) =>
    tasks?.filter((task) => task.status === status) || [];




    

  return (
    <div className='flex flex-col w-full p-5'>
      <div className='fixed right-5 bottom-2  flex flex-col p-2'>
        <Link href='/admin/dashboard/manage-tasks/add-task' className='bg-black  text-white    rounded-2xl shadow-md p-4 flex justify-center my-2 '>
          <Plus size={30} />
        </Link>
      </div>

      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>All Task</h1>

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
            <Column
              id='pending'
              title='Pending Tasks'
              tasks={getTasksByStatus('pending')}
              // filterSearch={filterSearch}
              // searchItem={searchItem}
              // setSearchItem={setSearchItem}
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
