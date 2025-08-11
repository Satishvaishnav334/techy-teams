'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUserDataContext } from '@/components/context/UserContext'
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from 'sonner'
function page() {
  const { users, refresh, user } = useUserDataContext()
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [status, setStatus] = useState()
  const [priority, setPriority] = useState()
  const [assignedTo, setAssignedTo] = useState('')
  const [date, setDate] = useState()
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const slug = title?.split(' ').join('-').toLowerCase();
      const formData = new FormData();
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('status', status ? status : "pending");
      formData.append('priority', priority ? priority : "Medium");
      formData.append('createdBy', user._id);
      formData.append('description', desc);
      formData.append('assignedTo', assignedTo);
      formData.append('dueDate', date ? date : "15 july 2026");
      console.log(date)
      toast.success("Task Created SuccessFully",{closeButton:true})
      const create = await axios.post('/api/get-tasks', formData)
      console.log(create)
    } catch (error) {
      toast.error("Error creating Task ",{closeButton:true})
      console.error('Error creating Task :', error);
    }
    finally {
      setAssignedTo('')
      setPriority('')
      setTitle('')
      setDesc('')
      setDate('')
    }
  };


  console.log(users.map((mem) => mem._id))
  return (
    <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Task</h1>
      <form onSubmit={handleCreate} className="p-4 m-2 bg-white rounded shadow-md">
        <label className="block font-semibold text-2xl  my-1">Team Title</label>
        <input
          type="text"
          required={true}
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Task Name or Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block font-semibold text-2xl  my-1">Description</label>
        <textarea
          required={true}
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Task Description *"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <label className="block font-semibold text-2xl  my-1">Task Priority</label>
        <select className="border border-gray-600 text-xl rounded-2xl  p-2" onChange={(e) => setPriority(e.target.value)}>
          <option value=""> Priority default Medium</option>
          <option value="Important">Important</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low </option>
        </select>

        <label className="block font-semibold text-2xl  my-1">Status</label>
        <select className="border border-gray-600 text-xl rounded-2xl  p-2" onChange={(e) => setStatus(e.target.value)}>
          <option value=""> Status default Pending</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="completed">completed </option>
        </select>


        <label className="block font-semibold text-2xl  my-1">Due Date</label>
        <DatePicker
          date={date}
          onDateChange={setDate}
        />



        <div className="p-5 text-2xl rounded-lg border my-4 w-full">
          <h2 className="text-lg font-semibold mb-3">Select User you Want to Assign Task</h2>
          <div className="grid grid-cols-2 gap-3 ">
            <label className="flex items-center space-x-2">
              <select className="border border-gray-600 text-xl rounded-2xl  p-2" required={true} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                <option value="">No User Selected</option>
                {users?.map((member, index) => {
                  return (
                    <option  key={index} value={member._id}>{member.name}</option>
                  );
                })}
              </select>
            </label>
          </div>
        </div>
        <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Create Task</button>
      </form>

    </div>
  )
}

export default page