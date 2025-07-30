// context/CategoryContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { getCookie } from 'cookies-next/client';
import { useRouter } from 'next/navigation';
const UserDataContext = createContext();

export const UserDataProvider = ({ children, name }) => {
    const [user, setUser] = useState({})
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const router = useRouter() 
    const fetchContaxtData = async () => {
        try {
            const name = getCookie('name')
            console.log(name)
            const res2 = await axios.get(`/api/get-users/${name}`);
            setUser(res2.data)

            const res3 = await axios.get('/api/get-teams');
            setTeams(res3.data)
            const res4 = await axios.get('/api/get-tasks');
            setTasks(res4.data)
        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
    };

    useEffect(() => {
        fetchContaxtData();
     
    }, []);

    return (
        <UserDataContext.Provider value={{ user, setUser, refresh: fetchContaxtData, teams, tasks }}>
            {children}
        </UserDataContext.Provider>
    );
};

export const useUserDataContext = () => useContext(UserDataContext);
