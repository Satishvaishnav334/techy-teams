// import React from 'react'

// function page() {
//   return (
//     <div>
//       Blogs
//     </div>
//   )
// }

// export default page
"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function page() {
  return (
    <Button
      variant="inline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
  )
}
