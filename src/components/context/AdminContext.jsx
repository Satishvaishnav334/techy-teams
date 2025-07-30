// context/CategoryContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { getCookie } from 'cookies-next/client';
const DataContext = createContext();

export const DataProvider = ({ children, name }) => {
    const [users, setUsers] = useState([])
    const [admin, setAdmin] = useState({})
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const fetchContaxtData = async () => {
        try {
            const name = getCookie('name')
            const res = await axios.get(`/api/get-users`);
            setUsers(res.data)
            console.log("object23", res.data)
            const res2 = await axios.get(`/api/get-users/${name}`);
            setAdmin(res2.data)
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
        <DataContext.Provider value={{ users, admin, setAdmin, setUsers, refresh: fetchContaxtData, setTeams, teams, setTasks, tasks }}>
            {children}
        </DataContext.Provider>
    );
};

export const useDataContext = () => useContext(DataContext);
