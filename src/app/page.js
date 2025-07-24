'use client';
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/request");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Landing Page</h1>
      {users?.map((user) => (
        <div key={user.id} className="p-4 m-2 bg-white rounded shadow-md">

          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      ))}
      </div>
      );
}
