// components/SocketClient.js (or directly in a page)
'use client'
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io('http://localhost:8080'); // Connects to the same origin by default

export default function App() {
    const [notification, setNotification] = useState([]);

    useEffect(() => {
        
        socket.on('PushNotification', (data) => {
            console.log("object", data);
            setNotification((pre) => {
                [...pre, data]
            })
        })
        return () => {
            socket.off('PushNotification')
        }
    }, [])


    return (
        <div>
            <h1>Push Notification : </h1>
            <div>
                {notification?.map((item,index)=>(
                    <div key={index}>
                            {item?.message}
                    </div>
                ))}
            </div>
        </div>
    )
}