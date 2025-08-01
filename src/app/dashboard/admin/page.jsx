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
  const { users, teams, user, tasks } = useUserDataContext()
  const router = useRouter()


  return (
    <div className='flex flex-col items-center justify-start w-full'>
      <h1 className='text-2xl font-bold my-4'>Welcome Back {user?.name}</h1>
      <div>
        <Table>
          <TableCaption>Your Task</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell>{task?.assignedTo?.map((user) => (user.name))}</TableCell>
                <TableCell className="text-right">{formatDate(task?.dueDate)}</TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
        <Table>
          <TableCaption>All Teams</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Team Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Members</TableHead>
            </TableRow>
          </TableHeader>
          {teams?.map((team, id) => (
            <TableBody key={id} >
              <TableRow>
                <TableCell className="font-medium">{team?.teamName}</TableCell>
                <TableCell>{team?.description}</TableCell>
                <TableCell>{team?.level}</TableCell>
                <TableCell>
                  {team?.members?.map((user,id) => (
                    <TableCell key={id}>{user?.name}</TableCell>
                  ))}
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