'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminContext } from '@/components/context/AdminContext'
import { toast } from 'sonner'
import { useLoadingContext } from '@/components/context/LoadingContext'
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

function page() {
  const { users, refresh } = useAdminContext()
  const { user, setLoading, createNotification } = useLoadingContext()
  const [teamName, setTeamName] = useState('')
  const [level, setLevel] = useState('')
  const [desc, setDesc] = useState("")
  const [addmemebers, setAddMembers] = useState([])
  const router = useRouter();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const slug = teamName?.split(' ').join('-').toLowerCase();
      const formData = new FormData()
      formData.append('teamName', teamName)
      formData.append('slug', slug)
      formData.append('level', level)
      formData.append('createdBy', user._id)
      formData.append('description', desc)
      formData.append('members', addmemebers)

      const create = await axios.post('/api/admin/get-teams', formData)
      if (create.status == '200') {
        createNotification(`New Team ${teamName}  Created by ${user?.name}`)
        router.push('/admin/dashboard/manage-teams')
        refresh();
      } else {
        toast.error("Failed to Create  Team.");
      }
    } catch (error) {
      toast.error("Failed to Create  Team.");
      console.error('Error creating team:', error);
    }
    finally {
      setLoading(false)
    }
  };
  const handleCheckboxChange = (id) => {
    setAddMembers((prev) => [...prev, id]);
  };

  return (
    <div className="  flex flex-col items-center justify-center md:h-[90vh] text-black ">  
      <form onSubmit={handleCreate} className=" m-2  rounded-xl shadow-md shadow-black/50 p-5 flex flex-col gap-3">
        <h1 className=" text-center sm:text-2xl text-xl !text-gray-900 font-bold " >
          Create New Team
        </h1>
        <div className='flex sm:flex-row flex-col justify-around items-around h-full w-full sm:gap-5 gap-2'>
          <div >
            <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
              Team Name
            </Typography>
            <Input
              className="  focus:border-t-gray-900 rounded-lg text-xl w-full p-2"
              required={true}
              type="text"
              placeholder="Enter Team Name or Title"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              size="xl" name="task-title"
              containerProps={{
                className: "min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div>
            <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
              Team Level
            </Typography>
            <select className=" border border-gray-600 text-xl rounded-2xl  p-2 " value={level} onChange={(e) => setLevel(e.target.value)}>
              <option value="level 2">Choose an Level</option>
              <option value="level 1">Level 1</option>
              <option value="level 2">Level 2</option>
              <option value="level 3">Level 3 </option>
            </select>
          </div>
        </div>

        <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
          Team Description
        </Typography>
        <Textarea
          className="focus:border-t-gray-900  text-xl rounded-lg w-full p-2"
          required={true}
          rows={4} color="gray"
          placeholder="Enter Team Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          name="message"
          containerProps={{
            className: "!min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
        />

        <div className="p-5 my-5 text-2xl rounded-lg border w-full">
          <h2 className="text-lg font-semibold mb-3">Select Team Members</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {users?.map((member, index) => {
              return (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={member.name}
                    onChange={() => handleCheckboxChange(member._id)}
                  />
                  <span>{member.name}</span>
                </label>
              );
            })}
          </div>
        </div>
        <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Create Team</button>
      </form>
    </div>
  )
}

export default page
