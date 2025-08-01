'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useUserDataContext } from '@/components/context/UserContext'
function page() {
  const { users, admin } = useUserDataContext()
  const [title, setTitle] = useState('')
  const [level, setLevel] = useState()
  const [desc, setDesc] = useState([])
  const [addmemebers, setAddMembers] = useState([])


  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('level', level)
      formData.append('createdBy', admin._id)
      formData.append('description', desc)
      formData.append('members', addmemebers)

      const create = await axios.post('/api/get-teams', formData)

    } catch (error) {
      console.error('Error creating team:', error);
    }
    finally {

    }
  };
  const handleCheckboxChange = (id) => {

    setAddMembers((prev) => [...prev, id]);

  };

  return (
    <div className="  flex flex-col   bg-gray-200 m-20  rounded shadow-md text-black">
      <h1 className="text-3xl m-5 text-center font-bold">Create Team</h1>
      <form onSubmit={handleCreate} className="p-10 m-2 w-full  ">
        <div className='flex gap-10 my-5'>
          <div>

            <label className="block font-semibold text-xl  my-1"> Title</label>
            <input
              type="text"
              className="border border-gray-600 text-xl rounded-2xl  p-2"
              placeholder="Enter Team Name or Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-semibold text-xl  my-1"> Level</label>

            <select  className="border border-gray-600 text-xl rounded-2xl  p-2">
              <option value="">Choose an Level</option>
          
              <option value="parrot">Level 1</option>
              <option value="spider">Level 2</option>
              <option value="goldfish">Level 3 </option>
            </select>
            {/* <input
              type="text"
              className="border border-gray-600 text-xl rounded-2xl  p-2"
              placeholder="Enter Team Level : "
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            /> */}
          </div>
        </div>

        <label className="block font-semibold text-2xl  my-1">Description</label>
        <input
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-[70%] p-2"
          placeholder="Enter Team Description"

          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="p-5 my-5 text-2xl rounded-lg border w-full">
          <h2 className="text-lg font-semibold mb-3">Select Team Members</h2>
          <div className="grid grid-cols-2 gap-3">
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
