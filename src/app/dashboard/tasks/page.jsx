
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
  TableRow,
} from "@/components/ui/table"

function page() {
  const { user} = useUserDataContext()
  const router = useRouter()


  return (
    <div className='flex flex-col items-center justify-start h-screen w-full'>
      <h1 className='text-2xl font-bold my-4'>Welcome Back {user?.name}</h1>
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
            </TableRow>
          </TableHeader>
          {user.tasks?.map((task, id) => (
            <TableBody key={id}>
              <TableRow>
                <TableCell className="font-medium">{task?.title}</TableCell>
                <TableCell>{task?.description}</TableCell>
                <TableCell>{task?.priority}</TableCell>
                <TableCell>{task?.status}</TableCell>
                <TableCell className="text-right">{formatDate(task?.dueDate)}</TableCell>
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