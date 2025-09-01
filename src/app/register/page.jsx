'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Input, Typography } from "@material-tailwind/react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();
  const links = [
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
  ];
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('name', name);
      const res = await axios.post("/api/auth/member-register", formData)
      toast.success(res.data.message, { closeButton: true })
      router.push('/dashboard')
    } catch (error) {
      toast.error(error.massage, { closeButton: true })
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    const checkSession = () => {
      const token = getCookie('token')
      if (token) {
        router.replace(`/dashboard`)
      }
    }
    checkSession()

  }, [])
  return (
    <div className="  flex  flex-col    h-full text-black ">
      <Navbar links={links} islogin={false}  />
      <div className=" flex md:flex-row flex-col justify-around  items-center h-[90vh] w-full mb-15 md:mb-0  lg:gap-10 gap-5">

        <div className="bg-yellow-300 w-full h-full flex justify-center items-center ">
        <h1 className="font-bold text-2xl">Branding </h1>
      </div>

      <div className="bg-blue-200  w-[90%] lg:w-[50%] md:h-[75%]  md:m-10 m-2 rounded-2xl shadow-2xl shadow-black/50">
        <form onSubmit={handleLogIn} className="lg:p-10 p-5 flex flex-col gap-3 md:mx-5">
          <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>
          <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
            Username
          </Typography>
          <Input type="text" className=" focus:border-t-gray-900  border-gray-500 rounded-lg w-full p-2"
            placeholder="Enter Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={true}
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
          <Input type="text" className=" focus:border-t-gray-900  border-gray-500 rounded-lg w-full p-2"
            required={true}
            placeholder="Enter Email Address *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            containerProps={{
              className: "min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />
          <Typography variant="xl" className=" text-left font-medium !text-gray-900" >
            Password
          </Typography>
          <Input type="password" className=" focus:border-t-gray-900 border-gray-500 rounded-lg w-full p-2"
            required={true}
            placeholder="Enter Your Password *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            containerProps={{
              className: "min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />
          <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-3 py-1 mt-3  rounded-lg text-xl" type="submit">Sign Up</button>
        </form>
        <p className="w-full flex  justify-center md:my-0 sm:py-5 p-3 md:py-0 ">
          I have an account
          <Link href='/login' className="text-red-500 mx-2 font-bold"> Login</Link>
        </p>
      </div>
      </div>
    </div>
  );
}
