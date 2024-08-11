import React from 'react'
import SidePost from '../components/SidePost'
import Content from '../components/Content'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Home = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('auth_token')) {
            navigate('/login');
        }
    }, [])

    return (
        <div className='ml-[5rem] md:ml-24 w-full flex justify-between'>
            <div className='w-[92%] md:w-[60%] relative flex flex-col justify-center items-center'>
                <Content />
            </div>
            <div className='hidden md:block md:w-[40%]'>
                <SidePost />
            </div>
        </div>
    )
}

export default Home