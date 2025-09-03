'use client';
import { redirect, useRouter } from 'next/navigation';
function page() {
  const router = useRouter()

  return (
    redirect('/admin/dashboard')
  )
}

export default page
