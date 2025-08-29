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
    const [admin, setAdmin] = useState()
    const [tasks, setTasks] = useState([])
    const [teams, setTeams] = useState([])
    const { setLoading } = useLoadingContext()
    const [isAdmin, setIsAdmin] = useState(admin?.role == "admin" ? true : false)

    const fetchContaxtData = async () => {
        try {

            setLoading(true)
            const token = getCookie('token')
            const user = await decrypt(token);
            const name = user?.username
            const res2 = await axios.get(`/api/admin/get-admin/${name}`);
            setAdmin(res2.data)
            setIsAdmin(res2.data.role == "admin" ? true : false)
            console.log(res2)
            const res = await axios.get(`/api/admin/get-users`);
            setUsers(res.data)
            const res3 = await axios.get('/api/admin/get-teams');
            setTeams(res3.data)
            const res4 = await axios.get('/api/admin/get-tasks');
            setTasks(res4.data)


        } catch (err) {
            console.error('❌ Failed to fetch categories:', err);
        }
        finally {
            setLoading(false)

        }
    };

    useEffect(() => {

        setLoading(false)
        const checkSession = () => {
            const token = getCookie('token');
            if (!token) {
                router.push('/admin-login');
            }
            
        }
        checkSession()
        setInterval(checkSession, 3000)

        fetchContaxtData();
    }, []);

    return (
        <AdminContext.Provider value={{ users, refresh: fetchContaxtData, teams, tasks, admin, isAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdminContext = () => useContext(AdminContext);
