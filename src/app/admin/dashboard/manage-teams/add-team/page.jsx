'use client'
import React from 'react'
import { useEffect,useState } from 'react'
function page() {
  const [user, setUser] = useState([])
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await fetch('/api/add-team');
  //       const data = await response.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   };

  //   fetchUser();
  // }, []);
  console.log(user)
  return (
    <div>
     Add Teams
    </div>
  )
}

export default page
