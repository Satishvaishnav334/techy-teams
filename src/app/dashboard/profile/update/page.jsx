'use client';
import React,{useState} from 'react'
import { useUserDataContext } from '@/components/context/UserContext';
import axios from 'axios';
function page() {
  const { user, refresh } = useUserDataContext()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('oldPassword', oldpassword);
      formData.append('email', email);
      formData.append('password', password);
      const response = await axios.put(`/api/get-users/${user.name}`, formData)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
  <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Log In</h1>
      <form onSubmit={handleLogIn} encType="multipart/form-data" className="p-4 m-2 bg-white rounded shadow-md">
        <label className="block font-semibold text-2xl  my-1">Name</label>
        <input
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder={user.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block font-semibold text-2xl  my-1">Email</label>
        <input
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder={user.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
    
        <label className="block font-semibold text-2xl  my-1">Old Password</label>
        <input
          type="password"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Your Old Password"
          value={oldpassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label className="block font-semibold text-2xl  my-1"> New Password</label>
        <input
          type="password"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Your New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Publish</button>
      </form>
    </div>
  )
}

export default page

