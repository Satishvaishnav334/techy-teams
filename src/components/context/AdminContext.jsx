// context/CategoryContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { useLoadingContext } from './LoadingContext';
import { useRouter } from 'next/navigation';
const AdminContext = createContext();


export const AdminDataProvider = ({ children }) => {
    const router  = useRouter()
    const [users, setUsers] = useState([])
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const { setLoading,user } = useLoadingContext()

    const fetchContaxtData = async () => {
        try {

            setLoading(true)

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
        const isAdmin = user?.role === "admin"

        const checkIsAdmin = () => {
            if (!isAdmin) {
                router.push('/dashboard');
            }
        };

        checkIsAdmin()
        fetchContaxtData();
    }, []);

    return (
        <AdminContext.Provider value={{ users, refresh: fetchContaxtData, teams, tasks }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
