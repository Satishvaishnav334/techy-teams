'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
// import { Calendar } from "@/components/ui/calendar.jsx"
import { useAdminContext } from '@/components/context/AdminContext'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useLoadingContext } from '@/components/context/LoadingContext'
import { DatePicker } from "@/components/ui/date-picker"

function page() {


    const { slug } = useParams()
    const { users, refresh} = useAdminContext()
    const { user ,createNotification,setLoading} = useLoadingContext()
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
                
                const task = await axios.get(`/api/get-tasks/${slug}`)
                setTask(task.data)
                setAssignedTo(task.data.assignedTo)

            }
            catch (error) {
                console.log(error)
            }
           

        }
        fetchTask()
    }, [])

    console.log(task)
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const newslug = newtitle?.split(' ').join('-').toLowerCase();
            const formData = new FormData();
            formData.append('title', newtitle ? newtitle : task?.title);
            formData.append('slug', newslug ? newslug : task?.slug);
            formData.append('description', desc ? desc : task?.description);
            formData.append('priority', priority ? priority : task?.priority);
            formData.append('status', status ? status : task?.status);
            formData.append('assignedTo', assignedTo?._id ? assignedTo?._id : task?.assignedTo?._id);
            formData.append('dueDate', date ? date : task?.dueDate);

            const update = await axios.put(`/api/get-tasks/${slug}`, formData)
            if (update.status == '200') {
                createNotification(`The task ${newtitle ? newtitle : task?.title} is Updated by ${user.name}`)
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
        <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Update Task</h1>
            <form onSubmit={handleUpdate} className="p-4 m-2 bg-white rounded shadow-md">
                <label className="block font-semibold text-2xl  my-1">Team Title</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={task?.title}
                    value={newtitle}
                    onChange={(e) => { setTitle(e.target.value ? e.target.value : task.title) }}
                />
                <label className="block font-semibold text-2xl  my-1">Description</label>
                <textarea
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={task?.description}
                    value={desc}
                    onChange={(e) => { setDesc(e.target.value) }}
                />

                <label className="block font-semibold text-2xl  my-1">Task Priority</label>
                <select className="border border-gray-600 text-xl rounded-2xl  p-2" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value={task?.priority}>{task?.priority}</option>
                    <option value="Important">Important</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low </option>
                </select>

                <label className="block font-semibold text-2xl  my-1">Status</label>
                <select className="border border-gray-600 text-xl rounded-2xl  p-2" onChange={(e) => setStatus(e.target.value)}>
                    <option value={task?.status}> {task?.status}</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In-progress</option>
                    <option value="completed">completed </option>
                </select>

                <label className="block font-semibold text-2xl  my-1"> Due Date  : {formatDate(task?.dueDate)}</label>
               
                <DatePicker
                    date={date}
                    onDateChange={setDate}
                />



                <div className="p-5 text-2xl rounded-lg border my-4 w-full">
                    <h2 className="text-lg font-semibold mb-3">Select User you Want to Assign Task</h2>
                    <div className="grid grid-cols-2 gap-3 ">
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
                <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Update Task</button>
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