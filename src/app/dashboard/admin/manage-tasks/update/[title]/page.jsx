'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar.jsx"
import { useUserDataContext } from '@/components/context/UserContext'
import { useParams } from 'next/navigation'
function page() {
    const { title } = useParams()
    const { users, refresh, user } = useUserDataContext()
    const [task, setTask] = useState({})
    const [newtitle, setTitle] = useState()
    const [slug, setSlug] = useState()
    const [desc, setDesc] = useState()
    const [status, setStatus] = useState("pending")
    const [priority, setPriority] = useState("medium")
    const [assignedTo, setAssignedTo] = useState([])
    const [date, setDate] = useState()
    async function fetchTask() {
        try {
            const task = await axios.get(`/api/get-tasks/${title}`)
            setTask(task.data)
            setAssignedTo(task.data.assignedTo)

        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTask()
    }, [])
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            
            console.log(newtitle ? newtitle : task?.title,newtitle)
            formData.append('title', newtitle ? newtitle : task?.title);
            formData.append('slug', slug ? slug : task?.slug);
            formData.append('description', desc ? desc : task?.description);
            formData.append('priority', priority ? priority : task?.priority);
            formData.append('status', status ? status : task?.status);
            formData.append('assignedTo', assignedTo ? assignedTo : task?.assignedTo);
            formData.append('dueDate', date ? date : task?.dueDate);
            // console.log(task?.title,"title=")
            const create = await axios.put(`/api/get-tasks/${title}`, formData)
            console.log(create)
        } catch (error) {
            console.error('Error creating team:', error);
        }
        finally {
            setAssignedTo([])
            setTitle('')
            setDesc('')
            setDate('')
        }
    };
    const handleCheckboxChange = (id) => {
        if (assignedTo?.includes(id)) {
            setAssignedTo(Array.isArray(assignedTo) && assignedTo?.filter((cid) => cid !== id))
       
    }
    else {
            console.log("objecthb")
            setAssignedTo([...assignedTo, id]);

        }
    };
    // console.log(assignTo)

    return (
        <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Create Task</h1>
            <form onSubmit={handleCreate} className="p-4 m-2 bg-white rounded shadow-md">
                <label className="block font-semibold text-2xl  my-1">Team Title</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={task?.title}
                    value={newtitle}
                    onChange={(e) => {setTitle(e.target.value ? e.target.value : task.title)}}
                />
                <label className="block font-semibold text-2xl  my-1">Team Slug</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={slug}
                    value={slug}
                    onChange={(e) => {setSlug(e.target.value ? e.target.value : task.slug)}}
                />
                <label className="block font-semibold text-2xl  my-1">Task Priority</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={task?.priority}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value ? e.target.value :  task.priority)}
                />

                <label className="block font-semibold text-2xl  my-1">Description</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={task?.description}
                    value={desc}
                    onChange={(e) => {setDesc(e.target.value)}}
                />
                <label className="block font-semibold text-2xl  my-1">Date</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={formatDate(task?.dueDate)}
                    value={date}
                    onChange={(e) => setDate(e.target.value ? e.target.value :  task.dueDate)}
                />


                {/* <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-lg border"
                /> */}

                <div className="p-5 text-2xl rounded-lg border my-4 w-full">
                    <h2 className="text-lg font-semibold mb-3">Select User you Want to Assign Task</h2>
                    <div className="grid grid-cols-2 gap-3 ">
                        {users?.map((member, index) => {
                            return (
                                <label key={index} className="flex items-center space-x-2">

                                    <input type="checkbox"
                                        checked={Array.isArray(assignedTo)
                                            && assignedTo?.includes(member?._id)}
                                        onChange={() => handleCheckboxChange(member?._id)} />

                           
                                    <span>{member.name}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Create Task</button>
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
    // hour: 'numeric',
    // minute: '2-digit',
    hour12: true
  });
}