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

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) {
            socket = io('http://localhost:3000'); // Connect to your custom server
        }
       

        socket.on('notification', (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
            toast.success(msg, { closeButton: true })
        });


        return () => {
            socket.off('chat message');
        };
    }, []);
    const createSendMessage = (message) => {
        socket.emit('notification', message); 
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


    }, []);
    return (
        <UserDataContext.Provider value={{ createSendMessage, user, users, refresh: fetchContaxtData, teams, tasks }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserDataContext = () => useContext(UserDataContext);
