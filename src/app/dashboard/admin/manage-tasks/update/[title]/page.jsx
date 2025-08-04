'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar.jsx"
import { useUserDataContext } from '@/components/context/UserContext'
import { useParams } from 'next/navigation'
function page() {
    const {title} = useParams()
    const { users, refresh, user } = useUserDataContext()
    const [task, setTask] = useState({})
    const [newtitle, setTitle] = useState()
    const [desc, setDesc] = useState()
    const [status, setStatus] = useState("pending")
    const [priority, setPriority] = useState("medium")
    const [assignTo, setAssignTo] = useState([])
    const [date, setDate] = useState()
    async function fetchTask() {
        try {
            const task = await axios.get(`/api/get-tasks/${title}`)
            console.log(task,"on")
            setTask(task.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchTask()
    }, [])
    console.log(task)
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newtitle);
            formData.append('description', desc);
            formData.append('priority', priority);
            formData.append('status', status);
            formData.append('assignedTo', assignTo);
            formData.append('dueDate', date);
            const create = await axios.put(`/api/get-tasks/${title}`, formData)
            console.log(create)
        } catch (error) {
            console.error('Error creating team:', error);
        }
        finally {
            setAssignTo([])
            setTitle('')
            setDesc('')
            setDate('')
        }
    };
    const handleCheckboxChange = (id) => {
        setAssignTo((prev) => [...prev, id]);
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
                    placeholder={task?.title}
                    value={newtitle}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className="block font-semibold text-2xl  my-1">Task Priority</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    placeholder={task?.priority}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                />

                <label className="block font-semibold text-2xl  my-1">Description</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    placeholder={task?.description}
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />


                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="rounded-lg border"
                            />

                <div className="p-5 text-2xl rounded-lg border my-4 w-full">
                    <h2 className="text-lg font-semibold mb-3">Select User you Want to Assign Task</h2>
                    <div className="grid grid-cols-2 gap-3 ">
                        {users?.map((member, index) => {
                            return (
                                <label key={index} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        // checked={}
                                        value={member.name}
                                        onChange={() => handleCheckboxChange(member._id)}
                                    />
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