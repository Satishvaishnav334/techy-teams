"use client"
import React,{useEffect,useState} from 'react'
import { toast } from "sonner"
import { Button } from "@/components/ui/button2.0"
import { useUserDataContext } from "@/components/context/UserContext";

export default function page() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const {createSendMessage} = useUserDataContext()
    
  return (
     <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={()=>createSendMessage(message)}>Send</button>
    </div>
    // <Button
    //   variant="black"
    //   onClick={() => {
    //     const myPromise = new Promise
    //     ((resolve) => {
    //       setTimeout(() => {
    //         resolve({ name: 'My toast' });
    //       }, 3000);
    //     });
		
    //     toast.promise(myPromise, {
    //       loading: 'Loading...',
    //       success: (data) => {
    //         return `${data.name} toast has been added`;
    //       },
    //       error: 'Error',
    //     });
    //   }}
    //   // onClick={() =>
    //   //   toast.success("Login Succesfully", { closeButton: true , duration: 2000,})

    //   //   // toast("Event has been created", {
    //   //   //   invert: true,
    //   //   //   closeButton: true,
    //   //   //   description: "Sunday, December 03, 2023 at 9:00 AM",
    //   //   //   action: {
    //   //   //     label: "Undo",
    //   //   //     onClick: () => console.log("Undo"),
    //   //   //   },
    //   //   // })
        
    //   // }
    // >
    //   Show Toast
    // </Button>
    
  )
}
