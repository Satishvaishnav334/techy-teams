'use client'
import React from 'react'
import { useEffect,useState } from 'react'
function page() {
  const [user, setUser] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/get-users');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);
  console.log(user)
  return (
    <div>
     Add Task
    </div>
  )
}

export default page
