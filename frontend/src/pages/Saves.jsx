import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/context';
import { decodeToken } from "react-jwt";
import { FaHeart } from "react-icons/fa";
import ShowComments from '../components/ShowComments';

const Saves = () => {
    const { getSaved, savePost, addLike } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    var [dataState, setDataState] = useState([])
    const [total, setTotal] = useState('')
    const myDecodedToken = localStorage.getItem('auth_token') ? decodeToken(localStorage.getItem('auth_token')) : { email: "Huh" }
    const [page, setPage] = useState(1);

    const fetchMoreMount = async () => {
        dataState.length == total ? null : setIsLoading(true);
        if (dataState.length == 0) {
            const requestData = await getSaved(`http://localhost:8000/routes/files/getsaved?skip=${page}&limit=${5}`);
            setDataState(prev => [...prev, ...requestData.data]);
            setTotal(requestData.totalPosts);
            setIsLoading(false);
        }

        else if (dataState.length == total) {
            setIsEnd(true)
        }

        else if (dataState.length >= 0) {
            const requestData = await getSaved(`http://localhost:8000/routes/files/getsaved?skip=${page}&limit=${5}`);
            setDataState(prev => [...prev, ...requestData.data]);
            setTotal(requestData.totalPosts);
            setIsLoading(false);
        }
    }

    const postSaver = async (id) => {
        await savePost(id);
        const filterData = dataState.filter(elem => {
            return elem._id !== id
        })
        setDataState(filterData);
    }

    const addLikes = async (id) => {
        await addLike(id)
        const filterData = dataState.filter(elem => {
            if (elem._id == id) {
                if (elem.userslikes.indexOf(myDecodedToken.email) === -1) {
                    elem.userslikes.push(myDecodedToken.email);
                    return elem
                } else {
                    elem.userslikes.splice(elem.userslikes.indexOf(myDecodedToken.email), 1);
                    return elem
                }
            } else {
                return elem
            }
        })
        setDataState(filterData);
    }

    useEffect(() => {
        fetchMoreMount();
    }, [page])

    const handleScrollFinite = async () => {
        try {
            if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
                setPage((prev) => prev + 1)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScrollFinite)
        return () => {
            document.removeEventListener('scroll', handleScrollFinite)
        }
    }, [])
    return (
        <div className='md:px-28 flex flex-col justify-center items-center px-2 py-5 w-full'>
            <div className='ml-[5rem] md:ml-24 w-[60%] md:w-[50%] flex-col flex justify-between'>
                {dataState.length <= 0 ? <h1 className='font-bold text-center text-3xl'>No Post Exists</h1> : dataState.map((elem, index) => {
                    return (
                        <div key={index} className={`feed-item border ${index <= 0 ? 'mt-0' : 'mt-28'} shadow-xl border-gray-400 rounded bg-white`}>
                            <div className="header border-b p-4 flex justify-between items-center">
                                <div className="left flex flex-row items-center">
                                    <div className="user-img w-10 border rounded-full overflow-hidden mr-4">
                                        <img alt="Alt" className="_6q-tv" data-testid="user-avatar" draggable="false" src={elem.user.image} />
                                    </div>
                                    <div className="user-name-and-place flex flex-col">
                                        <span className="text-sm font-bold">{elem.user.name}</span>
                                        <span className="text-xs font-light text-gray-900">{elem.user.city}</span>
                                    </div>
                                </div>
                                <div className="right relative">
                                    <div>
                                        <div className="group relative cursor-pointer">
                                            <div className="flex items-center">
                                                <span>
                                                    <svg onClick={() => { setDelta(!delta) }} aria-label="More options" className="_8-yf5 " fill="#262626" height="16" viewBox="0 0 48 48" width="16">
                                                        <circle clipRule="evenodd" cx="8" cy="24" fillRule="evenodd" r="4.5"></circle>
                                                        <circle clipRule="evenodd" cx="24" cy="24" fillRule="evenodd" r="4.5"></circle>
                                                        <circle clipRule="evenodd" cx="40" cy="24" fillRule="evenodd" r="4.5"></circle>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div
                                                className="invisible absolute -right-4 z-50 flex w-[10rem] flex-col bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
                                                {<a onClick={() => { postSaver(elem._id) }} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                                                    Unsave
                                                </a>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="feed-img flex items-center justify-center">
                                {elem.category == 'image' ? <img className='max-h-[44rem] w-full' onDoubleClick={() => { addLikes(elem._id) }} src={elem.fileType} alt="" /> : <video className='object-top max-h-[44rem] w-full outline-none object-cover' controls src={elem.fileType}></video>}
                            </div>
                            <div className="card-footer p-4">
                                <div className="top">
                                    <div className="icons flex flex-row justify-between items-center">
                                        <div className="left flex flex-row">
                                            <div className="like mr-4 cursor-pointer">
                                                {elem.userslikes.indexOf(myDecodedToken.email) === -1 ? <svg onClick={() => { addLikes(elem._id) }} aria-label="Like" className="_8-yf5 before:bg-red-600 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                                    <path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                                                </svg> : <FaHeart onClick={() => { addLikes(elem._id) }} className='text-red-600' size={24} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="likes mt-1">
                                        <span className="font-bold text-sm">
                                            {elem.userslikes.length} likes
                                        </span>
                                    </div>
                                    <div className="caption text-sm mt-3">
                                        <b>{elem.user.name} </b>
                                        {elem.desc}✨
                                    </div>
                                    <div className="post-date mt-1">
                                        <ShowComments elemCom={elem.userscomments} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                {isLoading && <h1 className='font-bold py-6 text-2xl text-indigo-500 text-center'>Loading...</h1>}
                {isEnd && <h1 className='font-bold py-6 text-2xl text-indigo-500 text-center'>No More Posts To Show</h1>}
            </div>
        </div>
    )
}

export default Saves