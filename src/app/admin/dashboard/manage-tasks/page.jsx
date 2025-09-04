

'use client'

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminContext } from '@/components/context/AdminContext';
import { useLoadingContext } from '@/components/context/LoadingContext';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { Plus } from 'lucide-react';

function AdminDashboard() {
  const { tasks, refresh, } = useAdminContext();
  const { createNotification, setLoading } = useLoadingContext()
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredtasks = useMemo(() => {
    return tasks?.filter((p) =>
      p?.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [tasks, searchTerm]);

  const handleDelete = async (slug, title) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      setLoading(true)
      const res = await axios.delete(`/api/admin/get-tasks/${slug}`);
      if (res.status == '200') {
        createNotification(`The Task ${title} is Deleted by ${admin?.name}`)
        refresh();
      }
      else {
        toast.error("Failed to delete task.");
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className='flex flex-col items-center justify-start w-full min-h-[90vh]  p-2'>
      <div className=' w-full h-full mt-4'>
        <h1 className='sm:text-2xl text-lg font-bold text-center '>All Tasks</h1>
        <div className='flex items-center justify-start gap-5 sm:p-4   w-full'>
          <Link href='/admin/dashboard/manage-tasks/add-task' className='sm:px-4 px-2 justify-center items-center py-1 sm:py-2 text-sm sm:text-lg bg-blue-600 text-white flex gap-1 rounded hover:bg-blue-700'>
            <Plus />
            Add Tasks
          </Link>
          <div className="flex w-[60%]  bg-gray-100">
            <input
              type="text"
              placeholder="Search tasks..."
              className="border p-2 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table className='my-3'>
        <TableCaption>All tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead >Edit</TableHead>
            <TableHead >Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredtasks?.map((task) => (
            <TableRow key={task._id} >
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell >{formatDate(task.dueDate)}</TableCell>
              <TableCell>{task?.assignedTo?.name}</TableCell>
              <TableCell className="">
                <button
                  onClick={() => router.push(`/admin/dashboard/manage-tasks/update/${task.slug}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </TableCell>

              <TableCell className="">
                <button
                  onClick={() => handleDelete(task.slug, task?.title)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminDashboard;

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
// 'use client';
// import React, { useMemo, useState } from 'react';
// import axios from 'axios'
// import { Pencil, Trash, Plus } from 'lucide-react';
// import { toast } from "sonner"
// import {
//   DndContext,
//   useDraggable,
//   useDroppable,
//   closestCenter,
// } from '@dnd-kit/core';
// import Link from 'next/link';
// import { useAdminContext } from '@/components/context/AdminContext';
// import { useLoadingContext } from '@/components/context/LoadingContext';

// export default function Page() {
//   const { tasks ,admin} = useAdminContext();
//   const { createNotification} = useLoadingContext()
//   // console.log(tasks)
//   const [trigger, setTrigger] = useState(false); // trigger re-render
//   // const [searchItem, setSearchItem] = useState('')

//   const handleDragEnd = async ({ active, over }) => {
//     if (!over) return;

//     const taskId = active.id;
//     const newStatus = over.id;

//     const task = tasks?.find((t) => t._id === taskId);
//     if (!task || task.status === newStatus) return;

//     // update task status temporarily
//     task.status = newStatus;
//     setTrigger((prev) => !prev);

//     try {
//       // console.log(taskId, newStatus)
//       const formData = new FormData()
//       formData.append('taskId', taskId)
//       formData.append('newStatus', newStatus)
//       const res = await axios.put(`/api/admin/get-tasks/update-status/`, formData);
//       if (res.status == '200') {
//         createNotification(`Updated Status of ${task?.title} to ${newStatus} by ${admin?.name}`)
//       }
//     } catch (err) {
//       console.error('API failed:', err);
//     }

//   };

//   const getTasksByStatus = (status) =>
//     tasks?.filter((task) => task.status === status) || [];
//   return (
//     <div className='flex flex-col w-full p-5'>
//       <div className='fixed right-5 bottom-2  flex flex-col p-2'>
//         <Link href='/admin/dashboard/manage-tasks/add-task' className='bg-black  text-white    rounded-2xl shadow-md p-4 flex justify-center my-2 '>
//           <Plus size={30} />
//         </Link>
//       </div>

//       <div className='w-full  p-5 mb-10'>
//         <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>All Task</h1>

//         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
//             <Column
//               id='pending'
//               title='Pending Tasks'
//               tasks={getTasksByStatus('pending')}
//             />
//             <Column
//               id='in-progress'
//               title='In Progress Tasks'
//               tasks={getTasksByStatus('in-progress')}
//             />
//             <Column
//               id='completed'
//               title='Completed Tasks'
//               tasks={getTasksByStatus('completed')}
//             />
//           </div>
//         </DndContext>
//       </div>
//     </div>
//   );
// }

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     // hour: 'numeric',
//     // minute: '2-digit',
//     hour12: true
//   });
// }


// const TaskCard = ({ task }) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } =
//     useDraggable({ id: task._id });

//   const style = {
//     transform: transform
//       ? `translate(${transform.x}px, ${transform.y}px)`
//       : undefined,
//     opacity: isDragging ? 0.5 : 1,
//   };

//   const date = new Date(task.dueDate)
//   const date1 = new Date()


//   return (
//     <div
//       ref={setNodeRef}
//       {...listeners}
//       {...attributes}
//       style={style}
//       className='flex my-3 w-full border-1 border-black items-center justify-between  bg-white rounded-lg shadow-md cursor-move'
//     >
//       <div className='flex flex-col items-between     gap-3 w-full'>
//         <span
//           className={task?.priority === 'Important' ? 'bg-gray-600 text-lg md:text-2xl font-bold rounded-t-lg  px-3 py-2  text-white' : 'bg-gray-300 rounded-t-lg  text-lg md:text-2xl font-bold  px-3 py-2   text-white'
//             && task?.priority === 'Medium' ? 'bg-gray-400  text-lg md:text-2xl font-bold  px-3 py-2 rounded-t-lg  text-white' : 'bg-gray-300  rounded-t-lg  text-lg md:text-2xl font-bold px-3 py-2  text-white'}>
//           {task?.priority}
//         </span>
//         <span className=' mx-auto  w-[80%] text-lg md:text-2xl font-extrabold text-center   '>
//           {task.title}
//         </span>
//         <div className='flex flex-col items-between justify-between  w-full'>
//           <p className='text-lg  px-3'>{task.description}</p>
//           <p className='px-3'>Status : {task.status}</p>
//           <div className='px-3'>
//             Assigned To :  {task?.assignedTo?.name}
//           </div>


//             <div className='flex flex-row justify-around px-5 sm:gap-5 gap-2 my-3 text-md '>
//               <Link href={`/admin/dashboard/manage-tasks/update/${task?.slug}`}
//                 className=' bg-blue-600 hover:bg-blue-700 text-white font-semibold flex gap-1  text-right  px-3 rounded-b-lg py-2  rounded-lg'>
//                 <Pencil size={18} />Update
//               </Link>
//               <Link href={`/admin/dashboard/manage-tasks/delete/${task?.slug}`}
//                 className='bg-red-500 hover:bg-red-600 text-white z-50 cursor-pointer flex gap-1 font-semibold   text-right  px-3 rounded-b-lg py-2 rounded-lg'>
//                 <Trash size={18} /> Delete
//               </Link>
//             </div>

//           <div
//             className='flex justify-end '>
//             <p className={`bg-gray-300 w-full xl:w-[60%] font-semibold  text-sm text-center    py-1 px-2 xl:rounded-br-xl xl:rounded-tl-xl 
//               ${date1 < date ? 'bg-gray-300 text-gray-800' : 'bg-red-500 text-white'} `} >
//               {date1 < date ? ` Due Date ${formatDate(task.dueDate)}` : `Over Due ${formatDate(task.dueDate)}`}
//             </p>
               
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Column = ({ id, title, tasks }) => {
//   const { setNodeRef, isOver } = useDroppable({ id });

//   return (
//     <div
//       ref={setNodeRef}
//       className={`p-4 bg-gray-200 rounded-xl min-h-[400px] shadow-md transition-all duration-300 ${isOver ? 'ring-2 ring-orange-400' : ''
//         }`}
//     >

//       <h2 className=' text-center text-xl  lg:text-2xl font-bold mb-2 '>{title}</h2>
//       {tasks?.length > 0 ? (
//         tasks?.map((task) => <TaskCard key={task._id} task={task} />)
//       ) : (
//         <p className='text-center text-gray-500'>No Tasks</p>
//       )}
//     </div>
//   );
// };
