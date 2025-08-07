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
      className='flex my-3 items-center justify-between p-4 bg-white rounded-lg shadow-md cursor-move'
    >
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-lg font-semibold'>{task.title}</h1>
        <p className='text-sm text-gray-500'>{task.status}</p>
      </div>
    </div>
  );
};

const Column = ({ id, title, tasks }) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`p-4 bg-gray-200 rounded-xl min-h-[400px] shadow-md transition-all duration-300 ${
        isOver ? 'ring-2 ring-orange-400' : ''
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
  const { user } = useUserDataContext();
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
      console.log(taskId,newStatus)
      const formData = new FormData()
      formData.append('taskId',taskId)
      formData.append('newStatus',newStatus)
      const res = await axios.put(`/api/get-tasks/update-status/`,formData);
      console.log(`Updated task ${taskId} to ${newStatus}`,res);
    } catch (err) {
      console.error('API failed:', err);
    }
    finally{
      toast.success("Status Update Succesfully",{description:`Current Status is ${newStatus}`,closeButton:true})
    }
  };

  const getTasksByStatus = (status) =>
    user?.tasks?.filter((task) => task.status === status) || [];

  if (!user?.tasks) {
    return (
      <div className='p-10 text-xl font-bold text-center'>Loading tasks...</div>
    );
  }

  return (
    <div className='flex flex-col w-full p-5'>
      <div className='bg-gray-200 w-100 m-4 rounded-2xl shadow-md p-10'>
        <h1 className='text-2xl  text-center lg:text-3xl font-extrabold'>
          WellCome To  <span className='text-orange-600'>Taskbar</span>
        </h1>
      </div>

      <div className='w-full  p-5 mb-10'>
        <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>My Task</h1>

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
