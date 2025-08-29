'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAdminContext } from '@/components/context/AdminContext'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useLoadingContext } from '@/components/context/LoadingContext'
import { DatePicker } from "@/components/ui/date-picker"
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

function page() {
    const { slug } = useParams()
    const { users, refresh } = useAdminContext()
    const { user, createNotification, setLoading } = useLoadingContext()
    const [task, setTask] = useState({})
    const [newtitle, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [status, setStatus] = useState()
    const [priority, setPriority] = useState()
    const [assignedTo, setAssignedTo] = useState()
    const [date, setDate] = useState()
    const router = useRouter()


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const task = await axios.get(`/api/admin/get-tasks/${slug}`)
                setTask(task.data)
                setAssignedTo(task.data.assignedTo)
            }
            catch (error) {
                console.log(error)
            }
        }
        setLoading(true)
        fetchTask()
        setLoading(false)

    }, [])

    console.log(task)

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            console.log(assignedTo)
            console.log(task?.assignedTo?._id)
            const newslug = newtitle?.split(' ').join('-').toLowerCase();
            const formData = new FormData();
            formData.append('title', newtitle ? newtitle : task?.title);
            formData.append('slug', newslug ? newslug : task?.slug);
            formData.append('description', desc ? desc : task?.description);
            formData.append('priority', priority ? priority : task?.priority);
            formData.append('status', status ? status : task?.status);
            formData.append('assignedTo', assignedTo ? assignedTo : task?.assignedTo?._id);
            formData.append('dueDate', date ? date : task?.dueDate);

            const update = await axios.put(`/api/admin/get-tasks/${slug}`, formData)
            if (update.status == '200') {
                createNotification(`The task ${newtitle ? newtitle : task?.title} is Updated by ${user.name}`)
                refresh()
                router.push('/admin/dashboard/manage-tasks')
            }

        } catch (error) {
            console.error('Error creating team:', error);
            toast.error("Server Error", { closeButton: true })
        }
        finally {
            setLoading(false)
            setAssignedTo([])
            setTitle('')
            setDesc('')
            setDate('')
        }
    };

    return (

        <div className="  flex flex-col items-center justify-center sm:h-[90vh]  text-black ">
            <form onSubmit={handleUpdate} className=" m-2  rounded-xl shadow-md shadow-black/50 p-5 flex flex-col gap-3">
                <h1 className=" text-center sm:text-2xl text-xl !text-gray-900 font-bold " >
                    Update Task
                </h1>
                <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
                    Task Title
                </Typography>
                <Input type="text" className=" focus:border-t-gray-900 rounded-lg w-full p-2"
                    defaultValue={task?.title}
                    value={newtitle}
                    onChange={(e) => { setTitle(e.target.value) }}
                    containerProps={{
                        className: "min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600  w-full '>
                    <div className='w-full flex flex-col items-start sm:items-center sm:justify-center'>
                        <Typography variant="xl" className="sm:my-2 text-left font-medium !text-gray-900" >
                            Due Date  : {formatDate(task?.dueDate)}
                        </Typography>
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                        />
                    </div>
                    <div className='w-full flex flex-col items-start sm:items-center sm:justify-center'>
                        <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
                            Assign Task To
                        </Typography>
                        <label className="flex items-center space-x-2">
                            <select className="border border-gray-600 text-xl rounded-2xl  p-2" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                                <option value={task?.assignedTo}>{task?.assignedTo?.name}</option>
                                {
                                    users?.map((member, index) => {
                                        return (
                                            <option key={index} value={member._id}>{member.name}</option>
                                        );
                                    })}
                            </select>
                        </label>
                    </div>
                </div>
                <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
                    Task Description
                </Typography>
                <Textarea
                    defaultValue={task?.description}
                    value={desc}
                    onChange={(e) => { setDesc(e.target.value) }}
                    name="message"
                    className="focus:border-t-gray-900  text-xl rounded-lg w-full p-2"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                />
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 justify-start text-gray-600  w-full '>
                    <div className='w-full flex flex-col items-start sm:items-center sm:justify-center'>
                        <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
                            Task Priority
                        </Typography>
                        <select className="border border-gray-400 text-xl rounded-lg  p-2 " onChange={(e) => setPriority(e.target.value)} >
                            <option value={task?.priority}>{task?.priority}</option>
                            <option value="Medium" className=' border border-gray-400 '> Medium</option>
                            <option value="Important">Important</option>
                            <option value="Low">Low </option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col items-start sm:items-center sm:justify-center'>
                        <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
                            Task Status
                        </Typography>
                        <select className="border border-gray-600 text-xl rounded-2xl  p-2" onChange={(e) => setStatus(e.target.value)}>
                            <option value={task?.status}> {task?.status}</option>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In-progress</option>
                            <option value="completed">completed </option>
                        </select>
                    </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Update Task</button>
            </form>

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