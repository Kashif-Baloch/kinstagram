import React, { useEffect, useState } from 'react'
import { decodeToken } from "react-jwt";
import { useGlobalContext } from '../context/context';
import { IoMdClose } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import ShowComments from '../components/ShowComments';
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";

const Video = () => {
    const myDecodedToken = localStorage.getItem('auth_token') ? decodeToken(localStorage.getItem('auth_token')) : { email: "Huh" }
    const { addComment, getItems, deleteUser, addLike, savePost } = useGlobalContext();
    const [delta, setDelta] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [cadd, setCadd] = useState(false);
    const [cshow, setCshow] = useState(false);
    const [cValue, setCvalue] = useState({ comment: '', dataId: '' });
    var [dataState, setDataState] = useState([])
    const [total, setTotal] = useState('')
    const [page, setPage] = useState(1);

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

    const handleDelete = async (ciId) => {
        deleteUser(ciId);
        const filterData = dataState.filter(elem => {
            return elem._id !== ciId
        })
        setDataState(filterData);
    }

    const handleshowC = (id) => {
        setCadd(!cadd)
        setCvalue({ ...cValue, dataId: id })
        scrollBarF()
    }

    const scrollBarF = () => {
        if (document.body.style.overflow == '' || document.body.style.overflow == 'auto') {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'auto';
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        await addComment(cValue.comment, cValue.dataId);
        scrollBarF()
        setCvalue({ comment: '' })
        setCadd(!cadd)
        setCshow(!cshow)
        const filterData = dataState.filter(elem => {
            if (elem._id == cValue.dataId) {
                elem.userscomments.push({
                    name: myDecodedToken.name,
                    image: `http://localhost:8000/imgs/${myDecodedToken.email}.png`,
                    comments: cValue.comment,
                    dateTi: new Date().toLocaleString()
                })
                return elem
            } else {
                return elem
            }
        })
        setDataState(filterData);

    }

    const handleChange = (e) => {
        setCvalue({ ...cValue, [e.target.name]: e.target.value })
    }

    const postSaver = async (id) => {
        await savePost(id);
        const filterData = dataState.filter(elem => {
            if (elem._id == id) {
                if (elem.usersaves.indexOf(myDecodedToken.email) === -1) {
                    elem.usersaves.push(myDecodedToken.email);
                    return elem
                } else {
                    elem.usersaves.splice(elem.usersaves.indexOf(myDecodedToken.email), 1);
                    return elem
                }
            } else {
                return elem
            }
        })
        setDataState(filterData);
    }

    const fetchMoreMount = async () => {
        dataState.length == total ? null : setIsLoading(true);
        if (dataState.length == 0) {
            const requestData = await getItems(`http://localhost:8000/routes/files/getVideos?skip=${page}&limit=${5}`);
            setDataState(prev => [...prev, ...requestData.data]);
            setTotal(requestData.totalPosts);
            setIsLoading(false);
        }

        else if (dataState.length == total) {
            setIsEnd(true)
        }

        else if (dataState.length >= 0) {
            const requestData = await getItems(`http://localhost:8000/routes/files/getVideos?skip=${page}&limit=${5}`);
            setDataState(prev => [...prev, ...requestData.data]);
            setTotal(requestData.totalPosts);
            setIsLoading(false);
        }
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
            {cadd && <div className='fixed top-0 left-0 w-full z-50 h-full flex items-center justify-center bg-[#00000044]'>
                <IoMdClose onClick={() => { scrollBarF(); setCadd(!cadd) }} size={40} className='absolute text-white top-8 right-8' />
                <form onSubmit={handleSubmit} className="max-w-2xl w-[50%] bg-white rounded-lg border p-2 mx-auto mt-20">
                    <div className="px-3 mb-2 mt-2">
                        <textarea onChange={handleChange} placeholder="Post A Comment Here ..." name='comment' className="w-full bg-gray-100 rounded border border-gray-400 leading-normal resize-none h-[20rem] py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"></textarea>
                    </div>
                    <div className="flex justify-end px-4">
                        <input type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value="Comment" />
                    </div>
                </form>
            </div>}
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
                                                {elem.user.email === myDecodedToken.email ? <a onClick={() => { handleDelete(elem._id) }} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                                                    Delete
                                                </a> : <a onClick={() => { postSaver(elem._id) }} className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-black md:mx-2">
                                                    Save
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
                                            <div className="comment relative mr-4 cursor-pointer">
                                                <svg onClick={() => { handleshowC(elem._id) }} aria-label="Comment" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                                    <path clipRule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fillRule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <div className="share cursor-pointer">
                                                <svg aria-label="Share Post" className="_8-yf5 " fill="#262626" height="24" viewBox="0 0 48 48" width="24">
                                                    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="right cursor-pointer">
                                            <div className="save">
                                                {elem.usersaves.indexOf(myDecodedToken.email) === -1 ? <FaRegBookmark onClick={() => { postSaver(elem._id) }} size={25} /> :
                                                    <FaBookmark onClick={() => { postSaver(elem._id) }} size={25} />}
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

export default Video