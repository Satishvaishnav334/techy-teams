

// 'use client'
// import React, { useState } from "react";
// import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
// import axios from "axios";
// import { toast } from "sonner";
// export default function page() {
//   const [firstname,setFirstName] = useState('')
//   const [lastname,setLastName] = useState('')
//   const [email,setEmail] = useState('')
//   const [message,setMessage] = useState('')
//   const handleSubmit = async(e) =>{
//      e.preventDefault();
//     try {

//       const formData = new FormData();
//       formData.append('firstname', firstname);
//       formData.append('lastname', lastname);
//       formData.append('email', email);
//       formData.append('message', message);
//       const res = await axios.post("/api/client-data", formData)
//       toast.success(res.data.message, { closeButton: true })
//     } catch (error) {
//       toast.error(error.massage, { closeButton: true })
//       console.error("Error fetching users:", error);
//     }
//   }

//   return (
//     <section className="px-8 py-8 lg:py-16">
//       <div className="container mx-auto text-center">
//         <Typography
//           variant="h5"
//           color="blue-gray"
//           className="mb-4 !text-base lg:!text-2xl"
//         >
//           Customer Care
//         </Typography>
//         <Typography
//           variant="h1"
//           color="blue-gray"
//           className="mb-4 !text-3xl lg:!text-5xl"
//         >
//           We&apos;re Here to Help
//         </Typography>
//         <Typography className="mb-10 font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500">
//           Whether it&apos;s a question about our services, a request for
//           technical assistance, or suggestions for improvement, our team is
//           eager to hear from you.
//         </Typography>
//         <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
//           <img
//             src="/logo.png"
//             alt="map"
//             className="w-full h-full lg:max-h-[510px]"
//           />
//           <form
//             onSubmit={handleSubmit}
//             className="flex flex-col gap-4 lg:max-w-sm"
//           >

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <Typography
//                   variant="small"
//                   className="mb-2 text-left font-medium !text-gray-900"
//                 >
//                   First Name
//                 </Typography>
//                 <Input
//                   onChange={(e)=>setFirstName(e.target.value)}
//                   color="gray"
//                   size="lg"
//                   placeholder="First Name"
//                   name="first-name"
//                   className="focus:border-t-gray-900"
//                   containerProps={{
//                     className: "min-w-full",
//                   }}
//                   labelProps={{
//                     className: "hidden",
//                   }}
//                 />
//               </div>
//               <div>
//                 <Typography
//                   variant="small"
//                   className="mb-2 text-left font-medium !text-gray-900"
//                 >
//                   Last Name
//                 </Typography>
//                 <Input
//                 onChange={(e)=>setLastName(e.target.value)}
//                   color="gray"
//                   size="lg"
//                   placeholder="Last Name"
//                   name="last-name"
//                   className="focus:border-t-gray-900"
//                   containerProps={{
//                     className: "!min-w-full",
//                   }}
//                   labelProps={{
//                     className: "hidden",
//                   }}
//                 />
//               </div>
//             </div>
//             <div>
//               <Typography
//                 variant="small"
//                 className="mb-2 text-left font-medium !text-gray-900"
//               >
//                 Your Email
//               </Typography>
//               <Input
//               onChange={(e)=>setEmail(e.target.value)}
//                 color="gray"
//                 size="lg"
//                 placeholder="name@email.com"
//                 name="email"
//                 className="focus:border-t-gray-900"
//                 containerProps={{
//                   className: "!min-w-full",
//                 }}
//                 labelProps={{
//                   className: "hidden",
//                 }}
//               />
//             </div>
//             <div>
//               <Typography
//                 variant="small"
//                 className="mb-2 text-left font-medium !text-gray-900"
//               >
//                 Your Message
//               </Typography>
//               <Textarea
//               onChange={(e)=>setMessage(e.target.value)}
//                 rows={6}
//                 color="gray"
//                 placeholder="Message"
//                 name="message"
//                 className="focus:border-t-gray-900"
//                 containerProps={{
//                   className: "!min-w-full",
//                 }}
//                 labelProps={{
//                   className: "hidden",
//                 }}
//               />
//             </div>
//             <Button className="w-full bg-gray-700" color="gray" type="submit">
//               Send message
//             </Button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client"
// import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);

//  const data = {
//     labels: [  'Pandding Task','In-Progress','Completed Task'],
//     datasets: [
//         {
//             label: 'Task Status',
//             data: [12, 19, 3],
//             backgroundColor: [
//                 "red",
//                 "blue",
//                 "green"
//             ],
//             borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//             ],
//             borderWidth: 1,
//         },
//     ],
// };


// function page() {
//   return (
//     <div className='h-100 w-full'>

//       <Pie data={data} height={350} width={350}/>;
//     </div>
//   )
// }

// export default page


import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const data = {
  labels: ['Pandding Task', 'In-Progress', 'Completed Task'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "red",
        "blue",
        "green"
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

function page() {
  return (
    <div className='h-full w-full p-5 flex flex-col justify-around gap-5 items-around'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <div className=' bg-red-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Total Tasks</h1>
          <p className='text-green-600 font-semibold text-lg'>67</p>
        </div>
        <div className=' bg-blue-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Total Teams</h1>
          <p className='text-red-800 font-semibold text-lg'>47</p>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <div className=' bg-gray-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Completed Tasks</h1>
          <p className='text-green-600 font-semibold text-lg'>67</p>
        </div>
        <div className=' bg-gray-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Pandding Tasks</h1>
          <p className='text-red-800 font-semibold text-lg'>47</p>
        </div>
        <div className=' bg-gray-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>In-Progress Tasks</h1>
          <p className='text-orange-400 font-semibold text-lg'>7</p>
        </div>
      </div>
      <div className='flex h-full  w-full justify-around items-end p-5'>
        <div className=' '>
          <Bar options={options} data={data} width={500} height={300} />
        </div>
        <div className=''>
          <Pie data={data} width={300} height={300} />
        </div>
      </div>
    </div>
  )
}

export default page