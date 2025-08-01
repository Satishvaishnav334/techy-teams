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
  const { teams } = useUserDataContext()
  return (
    <div>
      Manage Teams
      <div className='flex flex-col  gap-5 mt-5  w-full '>
        <div className='flex flex-col items-center justify-between p-4 bg-gray-200 rounded-lg shadow'>
          <div className='flex items-center justify-center gap-4'>
            <Link href='/dashboard/admin/manage-teams/add-team'>
              <h1 className='text-lg text-center w-full font-semibold'>Add New Team</h1>
            </Link>
          </div>
        </div>
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
                  {team?.members?.map((user, id) => (
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