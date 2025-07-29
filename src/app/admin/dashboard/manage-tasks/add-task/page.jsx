'use client'
import React from 'react'
import axios from 'axios'
import Calendar from 'react-calendar'
import { useEffect, useState } from 'react'
function page() {
  const [members, setMembers] = useState()
  const [title, setTitle] = useState()
  const [desc, setDesc] = useState()
  const [status, setStatus] = useState("pending")
  const [assignTo, setAssignTo] = useState()
  const [dueDate, setDueDate] = useState()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/get-users');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  console.log(members)
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const date = new Date(2025,8,27)
      console.log(date)
      setDueDate(date)
      const formData = new FormData();  
      formData.append('title', title);
      formData.append('status', status);
      formData.append('createBy', "6883688467f357f0562544a2");
      formData.append('description', desc);
      formData.append('assignTo', assignTo);
      formData.append('dueDate', dueDate);

      const create = await axios.post('/api/get-tasks', formData)
      console.log(create.data)

    } catch (error) {
      console.error('Error creating team:', error);
    }
  };
  const handleCheckboxChange = (id) => {
    setAssignTo(id);
  };
  console.log(assignTo)

  return (
    <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Create Team</h1>
      <form onSubmit={handleCreate} className="p-4 m-2 bg-white rounded shadow-md">
        <label className="block font-semibold text-2xl  my-1">Team Title</label>
        <input
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Team Name or Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="block font-semibold text-2xl  my-1">Description</label>
        <input
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Team Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
       
        <div className="p-5 text-2xl rounded-lg border w-full">
          <h2 className="text-lg font-semibold mb-3">Select up to 5 Categories:</h2>
          <div className="grid grid-cols-2 gap-3">
            {members?.map((member, index) => {
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
        <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Create Task</button>
      </form>
      
    </div>
  )
}

export default page
