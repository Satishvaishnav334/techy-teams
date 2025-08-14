'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAdminContext } from '@/components/context/AdminContext'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useLoadingContext } from '@/components/context/LoadingContext'
function page() {
    const { slug } = useParams()
    const { users, refresh} = useAdminContext()
    const {user,setLoading,createNotification} = useLoadingContext()
    const [team, setTeam] = useState({})
    const [newteamName, setTeamName] = useState()
    const [desc, setDesc] = useState()
    const [level, setLevel] = useState()
    const [members, setMembers] = useState([])
    const router = useRouter()
    async function fetchteam() {
        try {
            const team = await axios.get(`/api/get-teams/${slug}`)
            setTeam(team?.data)
            setMembers(team?.data?.members)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchteam()
    }, [])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const newslug = newteamName?.split(' ').join('-').toLowerCase();
            const formData = new FormData();
            formData.append('teamName', newteamName ? newteamName : team?.teamName);
            formData.append('description', desc ? desc : team?.description);
            formData.append('slug', newslug ? newslug : slug);
            formData.append('level', level ? level : team?.level);
            formData.append('members', members ? members : team?.members);
            const res = await axios.put(`/api/get-teams/${slug}`, formData)
            if (res.status == '200') {
                createNotification(`The Team ${newteamName ? newteamName : team?.teamName} is Upadted by ${user?.name}`)
                router.push('/admin/dashboard/manage-teams')
                refresh();
            } else {
                toast.error("Failed to Update task.");
            }
        }
        catch (error) {
            toast.error("Failed to Update task.");
            console.error('Error creating team:', error);
        }
        finally {
            setLoading(false)
            setMembers([])
            setTeamName('')
            setDesc('')
            setLevel('')
        }
    };
    const handleCheckboxChange = (id) => {
        if (members?.includes(id)) {
            setMembers(Array.isArray(members) && members?.filter((cid) => cid !== id))
        }
        else {
            setMembers([...members, id]);
        }
    };


    return (
        <div className="  flex flex-col items-center justify-center min-h-screen text-black bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Create team</h1>
            <form onSubmit={handleUpdate} className="p-4 m-2 bg-white rounded shadow-md">
                <label className="block font-semibold text-2xl  my-1">Team Name</label>
                <input
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={team?.teamName}
                    value={newteamName}
                    onChange={(e) => { setTeamName(e.target.value) }}
                />

                <div>
                    <label className="block font-semibold text-xl  my-1"> Level</label>

                    <select className="border border-gray-600 text-xl rounded-2xl  p-2" value={level} onChange={(e) => setLevel(e.target.value)}>
                        <option value={team?.level}>{team?.level}</option>
                        <option value="level 1">Level 1</option>
                        <option value="level 2">Level 2</option>
                        <option value="level 3">Level 3 </option>
                    </select>

                </div>
                <label className="block font-semibold text-2xl  my-1">Description</label>
                <textarea
                    type="text"
                    className="border border-gray-600 text-xl rounded-2xl w-full p-2"
                    defaultValue={team?.description}
                    value={desc}
                    onChange={(e) => { setDesc(e.target.value) }}
                />
                <label className="block font-semibold text-2xl  my-1">Date</label>

                <div className="p-5 text-2xl rounded-lg border my-4 w-full">
                    <h2 className="text-lg font-semibold mb-3">Select User you Want to Assign team</h2>
                    <div className="grid grid-cols-2 gap-3 ">
                        {users?.map((member, index) => {
                            return (
                                <label key={index} className="flex items-center space-x-2">

                                    <input type="checkbox"
                                        checked={Array.isArray(members)
                                            && members?.includes(member?._id)}
                                        onChange={() => handleCheckboxChange(member?._id)} />


                                    <span>{member.name}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <button className="bg-blue-600 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Create team</button>
            </form>

        </div>
    )
}

export default page

