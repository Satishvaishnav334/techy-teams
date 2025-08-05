
'use client'

import { useRouter } from 'next/navigation';
import { useUserDataContext } from '@/components/context/UserContext';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,TableLink
} from "@/components/ui/table"
import axios from 'axios';
import Link from 'next/link';

function page() {
  const { user,tasks,refresh } = useUserDataContext()
  const router = useRouter()

  async function handleDelete(slug){
    try{
      const res = await axios.delete(`/api/get-tasks/${slug}`)
      console.log(res)
    }
    catch(error){
      console.log(error)
    }
    finally{
      refresh()
    }
  }
  return (
    <div className='flex flex-col items-center justify-start h-screen w-full'>
      <h1 className='text-2xl font-bold my-4'>Welcome Back {user?.name}</h1>
      <div className='flex flex-col items-center justify-between p-4 bg-gray-200 rounded-lg shadow'>
          <div className='flex items-center justify-center gap-4'>
            <Link href='/dashboard/admin/manage-tasks/add-task'>
              <h1 className='text-lg text-center w-full font-semibold'>Add New Team</h1>
            </Link>
          </div>
        </div>
      <div>
        <Table>
          <TableCaption>Your Task</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
              <TableHead className="text-right">Edit</TableHead>
              <TableHead className="text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          {tasks?.map((task, id) => (
            <TableBody key={id}>
              <TableRow>
                <TableCell className="font-medium">{task?.title}</TableCell>
                <TableCell>{task?.description}</TableCell>
                <TableCell>{task?.priority}</TableCell>
                <TableCell>{task?.status}</TableCell>
                <TableCell className="text-right">{formatDate(task?.dueDate)}</TableCell>
                <TableLink href={`/dashboard/admin/manage-tasks/update/${task?.slug}`}>
                  Edit
                </TableLink>
                <TableCell className="text-right">
                  <button onClick={(e)=>handleDelete(task?.slug)} className="bg-blue-600 cursor-pointer font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl">
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>

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
    hour: 'numeric',
    // minute: '2-digit',
    hour12: true
  });
}