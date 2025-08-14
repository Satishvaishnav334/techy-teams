'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAdminContext } from '@/components/context/AdminContext'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { Pencil, Trash, Plus } from 'lucide-react';
import { useLoadingContext } from '@/components/context/LoadingContext'

function page() {

    const { slug } = useParams()
    const { refresh  } = useAdminContext()
    const {createNotification,user,setLoading} = useLoadingContext()
    const [task, setTask] = useState({})
    const router = useRouter()

    async function fetchTask() {
        try {
            setLoading(true)
            const task = await axios.get(`/api/get-tasks/${slug}`)
            if (task.status == '200') {
                setLoading(false)
            }
            setTask(task.data)

        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (slug) => {
        if (!confirm("Delete Task")) return;
        try {
            setLoading(true)
            const deletetask = await axios.delete(`/api/get-tasks/${slug}`)
            if (deletetask.status == '200') {
                createNotification(`The task ${task?.title} is Delete by ${user.name}`)
                setLoading(false)
                router.push('/admin/dashboard/manage-tasks')
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            refresh()
            router.push('/admin/dashboard/manage-tasks')
        }
    }

    useEffect(() => {
        fetchTask()
    }, [])
    console.log(task)



    const date = new Date(task?.dueDate)
    const date1 = new Date()
    return (
        <div className="  flex flex-col items-center justify-start min-h-screen text-black ">
            <h1 className="text-3xl font-bold my-6">Delete Task</h1>
            <div
                className='flex my-3 w-[40%] border-1 border-black items-center justify-between  bg-white rounded-lg shadow-md '
            >
                <div className='flex flex-col items-between     gap-3 w-full'>
                    <span
                        className={task?.priority === 'Important' ? 'bg-red-500 text-lg md:text-2xl font-bold rounded-t-lg  px-3 py-2  text-white' : 'bg-gray-500 rounded-t-lg  text-lg md:text-2xl font-bold  px-3 py-2   text-white'
                            && task?.priority === 'Medium' ? 'bg-gray-700  text-lg md:text-2xl font-bold  px-3 py-2 rounded-t-lg  text-white' : 'bg-gray-500  rounded-t-lg  text-lg md:text-2xl font-bold px-3 py-2  text-white'}>
                        {task?.priority}
                    </span>
                    <span className=' mx-auto  w-[80%] text-lg md:text-2xl font-extrabold text-center   '>
                        {task?.title}
                    </span>
                    <div className='flex flex-col items-between justify-between  w-full'>
                        <p className='text-lg  px-3'>{task?.description}</p>
                        <p className='px-3'>Status : {task?.status}</p>
                        <div className='px-3'>
                            Assigned To :  {task?.assignedTo?.name}
                        </div>

                        <div className='flex justify-between  w-full'>
                            <div className='flex justify-between gap-2 my-2 mx-3  '>
                                <Link href={`/admin/dashboard/manage-tasks/update/${task?.slug}`}
                                    className='bg-black text-white font-semibold flex gap-2 text-sm text-right px-3 py-2  rounded-lg'>
                                    <Pencil size={18} />Edit
                                </Link>

                            </div>

                            <div className='flex items-end  '>
                                <p className={date1 < date ? 'bg-gray-300   font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl w-full  rounded-tl-xl' : 'bg-red-500 text-white w-full font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl rounded-tl-xl'} >
                                    Due {formatDate(task?.dueDate)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button onClick={(e) => handleDelete(task?.slug)}
                className=' text-white px-4 py-3 cursor-pointer flex gap-2 font-semibold bg-red-500  text-xl rounded-lg'>
                <Trash /> Delete
            </button>
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
        hour12: true
    });
}