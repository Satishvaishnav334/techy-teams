'use client'
import React from 'react'
import { useEffect,useState } from 'react'
function page() {
  const [user, setUser] = useState([])
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/get-teams');
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
      Manage
    </div>
  )
}

export default page
