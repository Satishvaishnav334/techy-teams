'use client';
import React, { useEffect, useState } from 'react';
import { useLoadingContext } from '@/components/context/LoadingContext';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Link from 'next/link';
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


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Team Perforemence   ',
    },
  },
};

function page() {
  const { user } = useLoadingContext();
  const [panddingTask, setPanddingTask] = useState()
  const [complatedTask, setComplatedTask] = useState()
  const [inProgressTask, setInProgressTask] = useState()
  const [teamMates, setTeamMates] = useState()
  const getTasksByStatus = (status) => user?.tasks?.filter((task) => task.status === status) || [];
  useEffect(() => {
    setPanddingTask(getTasksByStatus("pending"))
    setComplatedTask(getTasksByStatus("completed"))
    setInProgressTask(getTasksByStatus("in-progress"))
    setTeamMates(user?.team?.members)
  }, [])
  const bardata = {
    labels: teamMates?.map((mem)=>mem?.name),
    datasets: [
      {
        label: 'Task Status',
        data: getTasksByStatus("completed"),
        backgroundColor: [
          "red",
          "blue",
          "green"
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  // console.log("panddingTask : ", panddingTask, "complatedTask : ", complatedTask, "inProgressTask : ", inProgressTask)
  console.log(user)
  const data = {
    labels: ['Pandding Task', 'In-Progress', 'Completed Task'],
    datasets: [
      {
        label: 'Task Status',
        data: [panddingTask?.length, inProgressTask?.length, complatedTask?.length],
        backgroundColor: [
          "red",
          "blue",
          "green"
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  console.log(teamMates?.map((mem)=>mem?.name),"teanmates")
  
  return (
    <div className='h-full w-full p-5 flex flex-col justify-around gap-5 items-around'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <div className=' bg-red-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Total Tasks</h1>
          <p className='text-green-600 font-semibold text-lg'>{user?.tasks?.length}</p>
        </div>
        <div className=' bg-blue-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '> {user?.team?.teamName}</h1>
          <Link href='/dashboard/teams' className='text-red-500 font-semibold text-lg'>Go To Team</Link>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <div className=' bg-gray-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Completed Tasks</h1>
          <p className='text-green-600 font-semibold text-lg'>{complatedTask?.length}</p>
        </div>
        <div className=' bg-gray-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Pandding Tasks</h1>
          <p className='text-red-800 font-semibold text-lg'>{panddingTask?.length}</p>
        </div>
        <div className=' bg-gray-200 flex-col flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>In-Progress Tasks</h1>
          <p className='text-orange-400 font-semibold text-lg'>{inProgressTask?.length}</p>
        </div>
      </div>
      <div className='flex h-full  w-full justify-around items-end p-5'>
        <div className=''>
          <Pie data={data} width={300} height={300} />
        </div>
        <div className=' '>
          <Bar options={options} data={bardata} width={500} height={300} />
        </div>
      </div>
    </div>
  )
}

export default page

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // hour: 'numeric',
    // minute: '2-digit',
    hour12: true
  });
}