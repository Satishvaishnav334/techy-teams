'use client';
import React from 'react'
import { redirect } from 'next/navigation';
function page() {
  return (
    redirect('/dashboard')
  )
}

export default page
