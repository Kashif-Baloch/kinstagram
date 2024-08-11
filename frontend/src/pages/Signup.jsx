import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from '../context/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { IoFileTrayFullOutline } from "react-icons/io5";

const Signup = () => {
    const { signup } = useGlobalContext();
    const filInp = useRef('')
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: '', email: '', password: '', image: '', city: '' })
    const changeHandle = (e) => {
        if (e.target.name == "image") {
            let reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                setCredentials({ ...credentials, [e.target.name]: reader.result })
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    }

    const submitHandle = async (e) => {
        e.preventDefault();
        const response = await signup(credentials.username, credentials.email, credentials.password, credentials.image, credentials.city);
        if (response.success) {
            localStorage.setItem('auth_token', response.token);
            navigate('/')
        } else {
            toast.info('🦄 There Is Problem In Your Details!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <h1 className=' my-10 font-bold text-4xl text-center'>SignUp To Continue</h1>
            <form onSubmit={submitHandle} className="w-[90%] md:w-[40%] lg:w-[30%]">
                <div className="relative z-0 w-full mb-10 group">
                    <input value={credentials.username} onChange={changeHandle} type="text" name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input value={credentials.city} onChange={changeHandle} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                </div>
                <div className="relative z-0 w-full mb-10 group">
                    <input value={credentials.email} onChange={changeHandle} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={credentials.password} onChange={changeHandle} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className="mb-5 flex flex-col justify-center items-center">
                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Image</label>
                    <input onChange={changeHandle} ref={filInp} type="file" name='image' id="image" className="hidden" placeholder="name@flowbite.com" required />
                    <div onClick={() => { filInp.current.click() }} className="bg-[#0000001d] rounded-md hover:bg-indigo-400 border w-[30%] flex justify-center items-center">
                        <IoFileTrayFullOutline size={30} />
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center hover:text-indigo-500'>
                    <NavLink className={'my-3'} to={'/login'}>Already Have An Account</NavLink>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Signup