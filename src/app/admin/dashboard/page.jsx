'use client';
import React, { useEffect, useState } from 'react';
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
import { useAdminContext } from '@/components/context/AdminContext';

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
  // const { user } = useLoadingContext();
  const { teams, tasks, refresh,isAdmin } = useAdminContext()
  const [panddingTask, setPanddingTask] = useState()
  const [complatedTask, setComplatedTask] = useState()
  const [inProgressTask, setInProgressTask] = useState()
  const [teamtasks, setTeamTasks] = useState(teams?.map((team) => team?.members?.map((mem) => mem?.tasks?.length)))


  useEffect(() => {
    setPanddingTask(tasks?.filter((task) => task?.status === "pending"))
    setComplatedTask(tasks?.filter((task) => task?.status === "completed"))
    setInProgressTask(tasks?.filter((task) => task?.status === "in-progress"))
    const result = teamtasks.map((subArr) => subArr.reduce((sum, val) => sum + val, 0))
  }, [tasks, teams])

  const bardata = {
    labels: teams?.map((team) => team?.teamName),
    datasets: [
      {
        label: 'Tasks',
        data: teams?.map((team) => team?.members?.map((mem) => mem?.tasks?.length)).map(sub => eval(sub.join('+'))),
        backgroundColor: [
          "green"
        ],
        borderWidth: 1,
      },
    ],
  };

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

  return (
    <div className='h-full w-full p-5 flex flex-col justify-around gap-5 items-around'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <Link href="/dashboard/tasks" className=' bg-red-100 flex-col hover:bg-red-200 flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Total Tasks</h1>
          <p className='text-green-600 font-semibold text-lg'>{tasks?.length}</p>
        </Link>
        <Link href="/dashboard/teams" className=' bg-blue-100 flex-col hover:bg-blue-200 flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '> All Teams</h1>
          <p className='text-red-500 font-semibold text-lg'>Go To Team</p>
        </Link>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        <Link href="/admin/dashboard/manage-tasks" className=' bg-gray-200 flex-col hover:bg-gray-300 flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Completed Tasks</h1>
          <p className='text-green-600 font-semibold text-lg'>{complatedTask?.length}</p>
        </Link>
        <Link href="/admin/dashboard/manage-tasks" className=' bg-gray-200 flex-col hover:bg-gray-300 flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>Pandding Tasks</h1>
          <p className='text-red-800 font-semibold text-lg'>{panddingTask?.length}</p>
        </Link>
        <Link href="/admin/dashboard/manage-tasks" className=' bg-gray-200 flex-col hover:bg-gray-300 flex justify-center items-center rounded-xl min-h-[150px]  max-w-[400px] shadow-md transition-all duration-300'>
          <h1 className='font-bold text-2xl '>In-Progress Tasks</h1>
          <p className='text-orange-400 font-semibold text-lg'>{inProgressTask?.length}</p>
        </Link>
      </div>
      <div className='flex h-full flex-col md:flex-row w-full md:w-[90vw] lg:w-full   justify-around gap-5 lg:items-end lg:p-5'>
        <div className=''>
          <Pie options={options} data={data} width={300} height={300} />
        </div>
        <div className=' h-full'>
          <Bar options={options} data={bardata}  width={500} height={350} />
        </div>
      </div>
    </div>
  )
}

export default page
