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
  const { tasks, teams, users, refresh } = useAdminContext();
  const { user, createNotification, setLoading } = useLoadingContext()
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  

    const filteredtasks = useMemo(() => {

      return tasks?.filter((p) =>
        p?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [tasks, searchTerm]);

    const filteredteams = useMemo(() => {
      return teams
        ?.filter((p) =>
          p?.teamName?.toLowerCase().includes(searchTeam.toLowerCase())
        )
  }, [teams, searchTeam]);

  // Delete task
  const handleDelete = async (slug, title) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      setLoading(true)
      const res = await axios.delete(`/api/admin/get-tasks/${slug}`);
      if (res.status == '200') {
        createNotification(`The Task ${title} is Deleted by ${user?.name}`)
        refresh();
      }
      else {
        toast.error("Failed to delete task.");
      }
    } catch (err) {
      console.error(err);
    }
    finally {
      setLoading(false)
    }
  };
  const handleTeamDelete = async (slug, teamName) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      setLoading(true)
      const res = await axios.delete(`/api/admin/get-teams/${slug}`);
      if (res.status == '200') {
        createNotification(`The Team ${teamName} is Deleted by ${user?.name}`)

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
    <div className='flex flex-col items-center justify-start w-full  p-2'>
      <div className=' w-full h-full mt-4'>
        <h1 className='sm:text-2xl text-lg font-bold text-center '>Task Table</h1>
        <div className='flex items-center justify-start gap-5 sm:p-4   w-full'>
          <Link href='/admin/dashboard/manage-tasks/add-task' className='sm:px-4 px-2 justify-center items-center py-1 sm:py-2 text-sm sm:text-lg bg-blue-600 text-white flex gap-1 rounded hover:bg-blue-700'>
            <Plus />
            Add Tasks
          </Link>
          <div className="flex w-[60%]  bg-gray-100">
            <input
              
              type="text"
              placeholder="Search tasks..."
              className="border p-2 rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Table>
        <TableCaption>All tasks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead >Edit</TableHead>
            <TableHead >Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredtasks?.map((task) => (
            <TableRow key={task._id} >
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell >{formatDate(task.dueDate)}</TableCell>
              <TableCell>{task?.assignedTo?.name}</TableCell>
              <TableCell className="">
                <button
                  onClick={() => router.push(`/admin/dashboard/manage-tasks/update/${task.slug}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
              </TableCell>

              <TableCell className="">
                <button
                  onClick={() => handleDelete(task.slug, task?.title)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr className='text-gray-500 h-1 w-full my-3' />
      <div className=' w-full h-full mt-4'>
        <h1 className='sm:text-2xl text-lg font-bold text-center'>Team  Table</h1>
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


      <Table className="mt-8">
        <TableCaption>All teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Team Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Members</TableHead>
            <TableHead >Edit</TableHead>
            <TableHead >Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredteams?.map((team) => (
            <TableRow key={team._id}>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.description}</TableCell>
              <TableCell>
                {team.members?.map((user) => <span className='mx-2'>{user?.name}</span>)}
              </TableCell>
              <TableCell className="">
                <button
                  onClick={() => router.push(`/admin/dashboard/manage-teams/update/${team?.slug}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
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