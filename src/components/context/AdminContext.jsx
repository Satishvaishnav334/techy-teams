// context/CategoryContext.jsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getCookie } from 'cookies-next/client';
import { useLoadingContext } from './LoadingContext';
import { useRouter, redirect } from 'next/navigation';
import { decrypt } from '@/lib/auth.js'

const AdminContext = createContext();


export const AdminDataProvider = ({ children }) => {
    const router = useRouter()
    const [users, setUsers] = useState([])
    const [user, setUser] = useState()
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const { setLoading } = useLoadingContext()

    const fetchContaxtData = async () => {
        try {

            setLoading(true)
            const token = getCookie('token')
            const user = await decrypt(token);
            const name = user.username
            const res2 = await axios.get(`/api/get-user/${name}`);
            setUser(res2.data)
            if (res2.status == 200) {
                const isAdmin = res2.data.role === "admin"
                if (!isAdmin) {
                    console.log(isAdmin)
                    router.push('/dashboard');
                }
                const res = await axios.get(`/api/admin/get-users`);
                setUsers(res.data)
                const res3 = await axios.get('/api/admin/get-teams');
                setTeams(res3.data)
                const res4 = await axios.get('/api/admin/get-tasks');
                setTasks(res4.data)
            }

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
        <AdminContext.Provider value={{ users, refresh: fetchContaxtData, teams, tasks }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
