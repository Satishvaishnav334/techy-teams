// context/CategoryContext.jsx
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { toast } from 'sonner';
import {decrypt} from '@/lib/auth.js'
const LoadingContext = createContext();
let socket = io();

export const LoadingProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const [isLogin, setIsLogin] = useState(user ? true : false)
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
            const res2 = await axios.get(`/api/get-users/${name}`);
            setUser(res2.data)
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
        <LoadingContext.Provider value={{ loading, setLoading,isLogin,setIsLogin, notifications, refresh: fetchContaxtData, setNotifications, user, setUser, createNotification }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoadingContext = () => useContext(LoadingContext);
