import React, { useEffect, useState } from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegCompass, FaRegBookmark } from "react-icons/fa";
import { BsCameraVideo } from "react-icons/bs";
import { FaRegSquarePlus } from "react-icons/fa6";
import Adddata from './Adddata';
import { useGlobalContext } from '../context/context';
import { NavLink } from 'react-router-dom'
import SearchUsers from './SearchUsers';


const SideBar = () => {
    const [add, setAdd] = useState(false)
    const { addItems } = useGlobalContext();
    const [searchBar, setSearchBar] = useState(false)

    const changeAdd = (s) => {
        s == 'se' ? setSearchBar(!searchBar) : setAdd(!add)
    }

    const handleSubmit = async (cred) => {
        await addItems(cred.category, cred.fileType, cred.desc);
        changeAdd()
    }

    return (
        <>
            {add && <Adddata handleSubmit={handleSubmit} changeAdd={changeAdd} />}
            {searchBar && <SearchUsers setSearchBar={setSearchBar} />}
            <div className='fixed  w-[4rem] md:w-24 h-full p-6 border-r-[1px] flex flex-col gap-10 items-center'>
                <NavLink to={'/'} className='hover:bg-[rgba(0,0,0,0.2)] rounded-lg p-2 cursor-pointer'>
                    <MdHomeFilled size={30} />
                </NavLink>
                <div onClick={() => { changeAdd('se') }} className='hover:bg-[rgba(0,0,0,0.2)] rounded-lg p-2 cursor-pointer'>
                    <IoSearch size={30} />
                </div>
                <NavLink to={'/images'} className='hover:bg-[rgba(0,0,0,0.2)] rounded-lg p-2 cursor-pointer'>
                    <FaRegCompass size={30} />
                </NavLink>
                <NavLink to={'/videos'} className='hover:bg-[rgba(0,0,0,0.2)] rounded-lg p-2 cursor-pointer'>
                    <BsCameraVideo size={30} />
                </NavLink>
                <NavLink to={'/saves'} className='hover:bg-[rgba(0,0,0,0.2)] rounded-lg p-2 cursor-pointer'>
                    <FaRegBookmark size={30} />
                </NavLink>
                <div onClick={changeAdd} className='hover:bg-[rgba(0,0,0,0.2)] rounded-lg p-2 cursor-pointer'>
                    <FaRegSquarePlus size={30} />
                </div>
            </div >
        </>
    )
}

export default SideBar