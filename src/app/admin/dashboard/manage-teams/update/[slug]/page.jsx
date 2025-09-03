'use client'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAdminContext } from '@/components/context/AdminContext'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useLoadingContext } from '@/components/context/LoadingContext'
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";

function page() {
    const { slug } = useParams()
    const { users, refresh,admin } = useAdminContext()
    const {  setLoading, createNotification } = useLoadingContext()
    const [team, setTeam] = useState({})
    const [newteamName, setTeamName] = useState()
    const [desc, setDesc] = useState()
    const [level, setLevel] = useState()
    const [members, setMembers] = useState([])
    const router = useRouter()
    async function fetchteam() {
        try {
            const team = await axios.get(`/api/admin/get-teams/${slug}`)
            setTeam(team?.data)
            setMembers(team?.data?.members)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        setLoading(true)
        fetchteam()
        setLoading(false)
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
            const res = await axios.put(`/api/admin/get-teams/${slug}`, formData)
            if (res.status == '200') {
                createNotification(`The Team ${newteamName ? newteamName : team?.teamName} is Upadted by ${admin?.name}`)
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
        <div className="  flex flex-col items-center justify-center md:h-[90vh] text-black ">
            <form onSubmit={handleUpdate} className=" m-2  rounded-xl shadow-md shadow-black/50 p-5 flex flex-col gap-3">
                <h1 className=" text-center sm:text-2xl text-xl !text-gray-900 font-bold " >
                    Update Team
                </h1>
                <div className='flex sm:flex-row flex-col justify-around items-around h-full w-full sm:gap-5 gap-2'>
                    <div >
                        <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
                            Team Name
                        </Typography>
                        <Input
                            className="  focus:border-t-gray-900 rounded-lg text-xl w-full p-2"
                            type="text"
                            defaultValue={team?.teamName}
                            value={newteamName}
                            onChange={(e) => { setTeamName(e.target.value) }}
                            size="xl" name="task-title"
                            containerProps={{
                                className: "min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                    <div>
                        <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
                            Team Level
                        </Typography>
                        <select className=" border border-gray-600 text-xl rounded-2xl  p-2 " value={level} onChange={(e) => setLevel(e.target.value)}>
                            <option value={team?.level}>{team?.level}</option>
                            <option value="level 1">Level 1</option>
                            <option value="level 2">Level 2</option>
                            <option value="level 3">Level 3 </option>
                        </select>
                    </div>
                </div>

                <Typography variant="xl" className="my-2 text-left font-medium !text-gray-900" >
                    Team Description
                </Typography>
                <Textarea
                    className="focus:border-t-gray-900  text-xl rounded-lg w-full p-2"
                    required={true}
                    rows={4} color="gray"
                    defaultValue={team?.description}
                    value={desc}
                    onChange={(e) => { setDesc(e.target.value) }}
                    name="message"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }}
                />

                <div className="p-5 my-5 text-2xl rounded-lg border w-full">
                    <h2 className="text-lg font-semibold mb-3">Select Team Members</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                <button className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-3 py-2 my-2 rounded-lg text-xl" type="submit">Update Team</button>
            </form>
        </div>

    )
}

export default page

