// app/page.js or any client component
'use client'; // Mark as client component

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
let socket; 

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   // Initialize socket connection only once
  //   if (!socket) {
  //     socket = io('http://localhost:3000'); // Connect to your custom server
  //   }
  //   const data = async () => {
  //     await axios.get('/api/get-tasks')
  //   }
  //   data()
  //   // Listen for 'chat message' events
  //   socket.on('noti', (msg) => {
  //     setMessages((prevMessages) => [...prevMessages, msg]);
  //     console.log(msg)
  //   });

  //   // Cleanup on component unmount
  //   return () => {
  //     socket.off('chat message');
  //   };
  // }, []);

  // const sendMessage = () => {
  //   if (message.trim()) {
  //     socket.emit('hello', message); // Emit 'chat message' event
  //     setMessage('');
  //   }
  // };
} 