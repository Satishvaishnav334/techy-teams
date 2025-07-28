'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const router = useRouter();

  const handleLogIn = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      const response = await axios.post("/api/auth/member-login", formData)
      localStorage.setItem('token', response.data.token);
      console.log(response.data);
      setToken(response.data.token);
      localStorage.setItem('token 2', token);
      if (response.status === 200) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    const checkSession = () => {
      const storedToken = localStorage.getItem('token');
      const storedToken2 = getCookie('token');
      setToken(storedToken || storedToken2);
      if (storedToken) {
        router.replace('/dashboard')
      }
    }
    checkSession()
  }, []);

  return (
    <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Log In</h1>
      <form onSubmit={handleLogIn} className="p-4 m-2 bg-white rounded shadow-md">
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
