'use client'
'use client'

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminContext } from '@/components/context/AdminContext';
import { useLoadingContext } from '@/components/context/LoadingContext';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { Plus } from 'lucide-react';

function AdminDashboard() {
  const {  teams, refresh } = useAdminContext();
  const { createNotification, setLoading } = useLoadingContext()
  const router = useRouter();
  const [searchTeam, setSearchTeam] = useState('');

  const filteredteams = useMemo(() => {
    return teams
      ?.filter((p) =>
        p?.teamName?.toLowerCase().includes(searchTeam.toLowerCase())
      )
  }, [teams, searchTeam]);

  const handleTeamDelete = async (slug, teamName) => {
    if (!confirm("Are you sure you want to delete this Team?")) return;
    try {
      setLoading(true)
      const res = await axios.delete(`/api/admin/get-teams/${slug}`);
      if (res.status == '200') {
        createNotification(`The Team ${teamName} is Deleted by ${admin?.name}`)
        refresh();
      } else {
        toast.error("Failed to delete task.");
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div className='flex flex-col items-center justify-start w-full min-h-[90vh] p-2'>
      <hr className='text-gray-500 h-1 w-full my-3' />
      <div className=' w-full h-full mt-4'>
        <h1 className='sm:text-2xl text-lg font-bold text-center'>All Teams </h1>
        <div className='flex items-center justify-start gap-5 p-4 m w-full'>
          <Link href='/admin/dashboard/manage-teams/add-team' className='sm:px-4 sm:py-2 px-2 py-1 text-sm sm:text-lg justify-center items-center bg-blue-600 text-white flex gap-1 rounded hover:bg-blue-700'>
            <Plus /> Add teams
          </Link>
          <div className="flex md:w-[60%] bg-gray-100">
            <input

              type="text"
              placeholder="Search Teams..."
              className="border p-2 rounded w-full"
              value={searchTeam}
              onChange={(e) => setSearchTeam(e.target.value)}
            />
          </div>
        </div>
      </div>


      <Table className="my-3">
        <TableCaption>All teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Members</TableHead>
            <TableHead >Update</TableHead>
            <TableHead >Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredteams?.map((team) => (
            <TableRow key={team._id}>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.description}</TableCell>
              <TableCell>
                {team.members?.map((user,index) => <span key={index} className='mx-2'>{user?.name}</span>)}
              </TableCell>
              <TableCell className="">
                <button
                  onClick={() => router.push(`/admin/dashboard/manage-teams/update/${team?.slug}`)}
                  className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update
                </button>
              </TableCell>
              <TableCell className="">
                <button
                  onClick={() => handleTeamDelete(team?.slug, team?.teamName)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminDashboard;

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
// 'use client'
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAdminContext } from '@/components/context/AdminContext';
// import axios from 'axios';
// import { Delete, Edit, Plus, Trash, Pencil } from 'lucide-react';
// import Link from 'next/link';
// import { toast } from 'sonner';
// import { useLoadingContext } from '@/components/context/LoadingContext';

// export default function page() {
//   const { teams, refresh,admin } = useAdminContext()
//   const {  setLoading, createNotification } = useLoadingContext()
//   const router = useRouter()

//   const handleDelete = async (slug, teamName) => {
//     try {
//       setLoading(true)
//       const res = await axios.delete(`/api/admin/get-teams/${slug}`)
//       if (res.status == '200') {
//         createNotification(`The Team ${teamName} is Deleted by ${admin?.name}`)
//         router.push('/admin/dashboard/manage-teams')
//         refresh();
//       } else {
//         toast.error("Failed to delete task.");
//       }
//     }
//     catch (error) {
//       toast.error("Failed to delete task.");
//       console.log(error)
//     }
//     finally {
//       setLoading(false)
//       refresh()
//     }
//   }
//   return (
//     <div className='flex flex-col w-full sm:p-5 p-2'>
//       <div className='w-full flex justify-between'>
//         <div className='bg-gray-200  m-4 rounded-2xl shadow-md p-5 md:p-8'>
//           <h1 className='text-2xl  text-center lg:text-3xl font-extrabold'>
//             Welcome To  <span className='text-orange-600'>Teams</span>
//           </h1>
//         </div>
//         <div className='fixed right-5 bottom-2  flex flex-col p-2'>
//           <Link href='/admin/dashboard/manage-teams/add-team' className='bg-black  text-white    rounded-2xl shadow-md p-4 flex justify-center my-2 '>
//             <Plus size={30} />
//           </Link>
//         </div>
//       </div>
//       {/* <h1 className='text-xl text-center lg:text-3xl font-bold mb-4'>All Teams</h1> */}
//       <div className='w-full  sm:p-5 p-2 mb-10'>
//         <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-3 sm:gap-5'>
//           {
//             teams?.map((team, index) => (
//               <div key={index} className=' bg-gray-200 w-full flex-col flex justify-between rounded-xl  shadow-md transition-all duration-300'>
//                 <div className='flex justify-between w-full'>
//                   <span
//                     className={team?.level === 'level 1' ? 'bg-gray-600 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-300 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white'
//                       && team?.level === 'level 2' ? 'bg-gray-400 h-15 text-lg md:text-2xl font-extrabold md:px-6  p-4 rounded-br-xl rounded-tl-xl text-white' : 'bg-gray-300 h-15  text-lg md:text-2xl font-extrabold md:px-6 p-4 rounded-br-xl rounded-tl-xl text-white'}>
//                     {team?.level?.split("level")}
//                   </span>
//                   <span className=' mx-auto py-5 w-[80%] text-lg md:text-2xl font-extrabold md:px-6 text-center  rounded-br-xl rounded-tl-xl '>
//                     {team?.teamName}
//                   </span>
//                 </div>
//                 <div className='px-4 flex flex-col justify-start h-full'>
//                   <span className='  font-bold  text-sm md:text-lg  py-2 px-1 '> Members :</span>
//                   <div className='grid grid-cols-2 justify-around  gap-5'>
//                     {
//                       team?.members?.map((member, index) => (
//                         <div key={index}>
//                           <div className='bg-white  font-bold  text-sm md:text-lg  py-2 px-4 rounded-lg flex justify-center items-center ' > {member.name}</div>
//                         </div>
//                       ))
//                     }

//                   </div>
//                   <div className='my-5'>
//                     <p className='text-center text-lg'>{team?.description}</p>

//                   </div>
//                 </div>


//                 <div className='flex flex-col  justify-between  w-full'>
//                   <div className='flex flex-row justify-around px-5 sm:gap-5 gap-2 '>
//                     <button onClick={(e) => handleDelete(team?.slug, team?.teamName)}
//                       className=' bg-red-500 cursor-pointer hover:bg-red-600 text-white flex gap-2  font-semibold  sm:text-xl text-lg  px-3 py-2 rounded-lg'>
//                       <Trash /> Delete
//                     </button>
//                     <Link href={`/admin/dashboard/manage-teams/update/${team?.slug}`}
//                       className='bg-blue-600 hover:bg-blue-700 text-white font-semibold flex gap-2 sm:text-xl text-md px-3 py-2 rounded-lg'>
//                       <Pencil />Update
//                     </Link>
//                   </div>
//                   <div
//                     className='flex justify-end mt-5'>
//                     <p className='bg-gray-300 min-w-[40%] font-semibold  text-sm text-right    py-1 px-2 rounded-br-xl rounded-tl-xl'>
//                       Created {formatDate(team?.createdAt)}
//                     </p>
//                   </div>
//                 </div>

//               </div>
//             )
//             )
//           }
//         </div>
//       </div>
//     </div>
//   )
// }

// function formatDate(dateString) {
//   const date = new Date(dateString);
//   return date.toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric',
//     // hour: 'numeric',
//     // minute: '2-digit',
//     hour12: true
//   });
// }


