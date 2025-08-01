'use client'
import React from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useUserDataContext } from '@/components/context/UserContext'
function page() {

  const { tasks } = useUserDataContext()
  
  return (
    <div className='overflow-scroll'>
      Manage Tasks
      <div className='flex flex-col gap-5 mt-5  w-full'>
        <div className='flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow'>
          <div className='flex items-center gap-4'>

            <h1 className='text-lg font-semibold'><Link href='/dashboard/admin/manage-tasks/add-task'>Add New Task</Link></h1>
          </div>
        </div>

        <Table>
          <TableCaption>Your Task</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead className="text-right">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          {tasks?.map((task, id) => (
            <TableBody key={id}>
              <TableRow>
                <TableCell className="font-medium">{task?.title}</TableCell>
                <TableCell>{task?.description}</TableCell>
                <TableCell>{task?.status}</TableCell>
                <TableCell>{task?.priority}</TableCell>
                <TableCell>{task?.assignedTo?.map((user) => (user.name))}</TableCell>
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