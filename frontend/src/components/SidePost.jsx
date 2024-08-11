import React, { useState } from 'react'
import { useGlobalContext } from '../context/context'
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const SidePost = () => {
    const [usersData, setUsersData] = useState({ allusr: [], oneuser: {} })
    let navigate = useNavigate();
    const { getUser, getUsers } = useGlobalContext();

    const fetchUsers = async () => {
        const user = await getUser()
        const users = await getUsers()
        const userExist = await users.data.filter(elem => { return elem.email !== user.data.email })
        setUsersData({ allusr: userExist, oneuser: user })
    }

    const logoutHandler = () => {
        localStorage.clear()
        // window.location.reload()
        navigate('/login')
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    return (
        <div>
            <div className='py-4'>
                {usersData.oneuser.success ? <div><div className='flex items-center'>
                    <div className="h-14 w-14 border rounded-full overflow-hidden mr-4">
                        <img alt="Alt" src={usersData.oneuser.data.image} />
                    </div>
                    <div>
                        <p className='text-[14px] p-0 text-[#737373]'>{usersData.oneuser.data.name}</p>
                        <p className='text-[14px] text-[#000000ce] font-semibold p-0'>{usersData.oneuser.data.email}</p>
                    </div>
                </div>
                    <div>
                        <button onClick={logoutHandler} className='my-4 border px-4 py-1 rounded-lg hover:bg-indigo-300 hover:text-white'>Logout</button>
                    </div>
                </div> : <h1>No User Exist</h1>}
                <h1 className='my-6 text-[#737373]'>Suggested For You</h1>
                {usersData.allusr.length <= 0 ? <h1 className='text-gray-500'>Empty</h1> :
                    usersData.allusr.map((elem, index) => {
                        return (
                            <div key={index}>{index > 8 ? null : <div className='pt-10 text-[#737373] font-semibold text-[14px]'>
                                <div className='flex items-center py-3'>
                                    <div className="h-14 w-14 border rounded-full overflow-hidden mr-4">
                                        <img alt="Alt" src={elem.image} />
                                    </div>
                                    <div>
                                        <p className='text-[14px] p-0 text-[#737373]'>{elem.name}</p>
                                        <p className='text-[14px] text-[#000000ce] font-semibold p-0'>{elem.email}</p>
                                    </div>
                                </div>
                            </div>}</div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default SidePost