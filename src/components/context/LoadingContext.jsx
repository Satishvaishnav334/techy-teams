// context/CategoryContext.jsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { toast } from 'sonner';
import { decrypt } from '@/lib/auth.js'
import { useRouter } from 'next/navigation';
const LoadingContext = createContext();
let socket = io();

export const LoadingProvider = ({ children }) => {
    const router = useRouter()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(user ? true : false)
    const [isAdmin, setIsAdmin] = useState(user?.role == "admin" ? true : false)
    const [notifications, setNotifications] = useState([]);

    const createNotification = (notification) => {
        if (!socket) {
            socket = io('http://localhost:3000'); // Connect to your custom server
        }
        socket.emit('notification', notification);
        return () => {
            socket.off('notification');
        };
    };

    const fetchContaxtData = async () => {
        try {
            const token = getCookie('token')

            const user = await decrypt(token);
            const name = user.username
            setLoading(true)
            const res2 = await axios.get(`/api/get-user/${name}`);
            setUser(res2.data)
                setIsAdmin(res2.data.role=="admin" ? true : false)
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }



    useEffect(() => {

        fetchContaxtData();
        if (!socket) {
            socket = io('http://localhost:3000'); // Connect to your custom server
        }
        socket.on('notification', (notification) => {
            setNotifications((prevNotifications) => [...prevNotifications, notification]);
            toast.success(notification, { closeButton: true, duration: 2000 })
        });
        return () => {
            socket.off('notification');
        };
    }, []);

    return (
        <LoadingContext.Provider value={{ loading, setLoading,setIsAdmin,isAdmin, isLogin, setIsLogin, notifications, refresh: fetchContaxtData, setNotifications, user, setUser, createNotification }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => useContext(LoadingContext);
