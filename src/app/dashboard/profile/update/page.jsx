'use client';
import React, { useState } from 'react'
import { useLoadingContext } from '@/components/context/LoadingContext';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {  Input, Typography } from "@material-tailwind/react";

function page() {
  const { user, refresh } = useLoadingContext()
  const router = useRouter()
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [oldpassword, setOldPassword] = useState('');
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name ? name : user?.name);
      formData.append('email', email ? email : user?.email);
      formData.append('oldPassword', oldpassword);
      formData.append('password', password);
      const res = await axios.put(`/api/get-user/${user.name}`, formData)
      console.log(res)
      toast.success(res.data.message)
      refresh()
      router.push('/dashboard/profile')
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="  flex flex-col items-center justify-center h-[90vh]  text-black ">
      <form onSubmit={handleLogIn} className=" m-2  rounded-xl shadow-md lg:w-[30%] sm:w-[50%] w-[90%] mx-10 shadow-black/50 p-5 flex flex-col gap-3">
        <h1 className=" text-center sm:text-2xl text-xl !text-gray-900 font-bold " >
          Update Profile
        </h1>
        <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
          Username
        </Typography>
        <Input type="text" className=" focus:border-t-gray-900 rounded-lg w-full p-2"
          defaultValue={user?.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          containerProps={{
            className: "min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
        />
        <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
          Email
        </Typography>
        <Input type="text" className=" focus:border-t-gray-900 rounded-lg w-full p-2"
          defaultValue={user?.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          containerProps={{
            className: "min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
        />
        {/* <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
          New Password
        </Typography>
        <Input type="text" className=" focus:border-t-gray-900 rounded-lg w-full p-2"
          placeholder="Enter Your New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          containerProps={{
            className: "min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
        />
        <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
          Old Password
        </Typography>
        <Input type="text" className=" focus:border-t-gray-900 rounded-lg w-full p-2"
          placeholder="Enter Your Old Password *"
          // required={true}
          value={oldpassword}
          onChange={(e)=>setOldPassword(e.target.value)}
          containerProps={{
            className: "min-w-full",
          }}
          labelProps={{
            className: "hidden",
          }}
        />

 */}

        <button className="bg-blue-600 hover:bg-blue-700 font-semibold cursor-pointer text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Update</button>
      </form>

    </div>

  )
}

export default page

