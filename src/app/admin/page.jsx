'use client';
import React from 'react'
import { redirect, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLoadingContext } from '@/components/context/LoadingContext';
function page() {
  const { user } = useLoadingContext()
  const router = useRouter()

  return (
    redirect('/admin/dashboard')
  )
}

export default page
