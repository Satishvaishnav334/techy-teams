// context/CategoryContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { useLoadingContext } from './LoadingContext';
import { toast } from 'sonner';

const UserDataContext = createContext();
let socket = io();

export const UserDataProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const { setLoading } = useLoadingContext()

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
            const name = getCookie('name')
            setLoading(true)
            const res2 = await axios.get(`/api/get-users/${name}`);
            setUser(res2.data)
            const res = await axios.get(`/api/get-users`);
            setUsers(res.data)

            const res3 = await axios.get('/api/get-teams');
            setTeams(res3.data)

            const res4 = await axios.get('/api/get-tasks');
            setTasks(res4.data)

        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
        finally {
            setLoading(false)

        }
    };

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
        <UserDataContext.Provider value={{ createNotification, notifications, user, users, refresh: fetchContaxtData, teams, tasks }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserDataContext = () => useContext(UserDataContext);
