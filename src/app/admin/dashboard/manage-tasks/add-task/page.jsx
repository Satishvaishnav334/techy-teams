'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminContext } from '@/components/context/AdminContext'
import { DatePicker } from "@/components/ui/date-picker"
import { toast } from 'sonner'
import { useLoadingContext } from '@/components/context/LoadingContext'
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
function page() {

  const { users, refresh, } = useAdminContext()
  const { user, createNotification } = useLoadingContext()
  const router = useRouter()
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
      const create = await axios.post('/api/get-tasks', formData)
      console.log(create)
      if (create.status == '200') {
        createNotification(` New task ${title} Create by ${user.name}`)
        refresh()
        router.push('/admin/dashboard/manage-tasks')
      }
    } catch (error) {
      toast.error("Error creating Task ", { closeButton: true })
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


  return (

    <div className="  flex flex-col items-center justify-center sm:h-[90vh] text-black ">
      {/* <h1 className="text-3xl font-bold mb-6">Create Task </h1> */}
      <form onSubmit={handleCreate} className=" m-2  rounded-xl shadow-md shadow-black/50 p-5 flex flex-col gap-3">
        <h1 className=" text-center sm:text-2xl text-xl !text-gray-900 font-bold " >
          Create New Task
        </h1>
        <Typography variant="xl" className="mb-2 text-left font-medium !text-gray-900" >
          Task Title
        </Typography>
        <Input type="text" required={true} className="  focus:border-t-gray-900 rounded-lg w-full p-2" placeholder="Enter Task Name or Title *" value={title}
          onChange={(e) => setTitle(e.target.value)} color="gray" size="xl" name="task-title"
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
              Task Due Date
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
              <select className="border border-gray-600 text-xl rounded-2xl  p-2" required={true} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                <option value="">No User Selected</option>
                {users?.map((member, index) => {
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
        <Textarea required={true} value={desc} rows={4} color="gray" placeholder="Enter Task Description *" name="message" className="focus:border-t-gray-900  text-xl rounded-lg w-full p-2"
          onChange={(e) => setDesc(e.target.value)}
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
              <option value="" className=' border border-gray-400 '> Medium</option>
              <option value="Important">Important</option>
              {/* <option value="Medium">Medium</option> */}
              <option value="Low">Low </option>
            </select>
          </div>
          <div className='w-full flex flex-col items-start sm:items-center sm:justify-center'>
            <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
              Task Status
            </Typography>
            <select className="border border-gray-400 text-xl rounded-lg  p-2" onChange={(e) => setStatus(e.target.value)}>
              <option value="">  Pending</option>
              {/* <option value="pending">Pending</option> */}
              <option value="in-progress">In-progress</option>
              <option value="completed">completed </option>
            </select>
          </div>
        </div>





        <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Create Task</button>
      </form>

    </div>
  )
}

export default page