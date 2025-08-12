"use client";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("hello", (data) => {
      setNotifications((prev) => [...prev, data.message]);
    });
    socket.emit("hello","namste")

    return () => {
      socket.off("hello");
    };
  }, []);
  // console.log(notifications,"note")
  return (
    <div className="fixed bottom-4 right-4 bg-white shadow p-4 rounded">
      {notifications.map((n, i) => (
        <div key={i} className="p-2 border-b">{n}</div>
      ))}
    </div>
  );
}
