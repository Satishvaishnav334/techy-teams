'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie,setCookie } from "cookies-next/client";
export default function Home() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleLogIn = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      const response = await axios.post("/api/auth/user-register", formData)
      setUsers(response.data);
      console.log(response.data.token);
      setCookie('token', response.data.token)
      console.log(users)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  console.log(getCookie('token'))
  console.log(users)
  return (
    <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Log In</h1>
      <form onSubmit={handleLogIn} className="p-4 m-2 bg-white rounded shadow-md">
          <label className="block font-semibold text-2xl  my-1">Name</label>
        <input
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block font-semibold text-2xl  my-1">Email</label>
        <input
          type="text"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Your Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="block font-semibold text-2xl  my-1">Password</label>
        <input
          type="password"
          className="border border-gray-600 text-xl rounded-2xl w-full p-2"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Publish</button>
      </form>
    </div>
  );
}
