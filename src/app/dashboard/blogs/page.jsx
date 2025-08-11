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
import { Button } from "@/components/ui/button2.0"

export default function page() {
  return (
    <Button
      variant="black"
      onClick={() => {
        const myPromise = new Promise
        ((resolve) => {
          setTimeout(() => {
            resolve({ name: 'My toast' });
          }, 3000);
        });
		
        toast.promise(myPromise, {
          loading: 'Loading...',
          success: (data) => {
            return `${data.name} toast has been added`;
          },
          error: 'Error',
        });
      }}
      // onClick={() =>
      //   toast.success("Login Succesfully", { closeButton: true , duration: 2000,})

      //   // toast("Event has been created", {
      //   //   invert: true,
      //   //   closeButton: true,
      //   //   description: "Sunday, December 03, 2023 at 9:00 AM",
      //   //   action: {
      //   //     label: "Undo",
      //   //     onClick: () => console.log("Undo"),
      //   //   },
      //   // })
        
      // }
    >
      Show Toast
    </Button>
  )
}
