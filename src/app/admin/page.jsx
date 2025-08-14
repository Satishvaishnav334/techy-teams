'use client';
import React from 'react'
import { redirect } from 'next/navigation';
function page() {
  return (
    redirect('/admin/dashboard')
  )
}

export default page
