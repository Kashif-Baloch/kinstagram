import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useGlobalContext } from '../context/context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useGlobalContext();
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const changeHandle = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const submitHandle = async (e) => {
        e.preventDefault();
        const response = await login(credentials.email, credentials.password);
        if (response.success) {
            localStorage.setItem('auth_token', response.token);
            navigate("/");
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
            <h1 className='my-20 -mt-11 font-bold text-4xl text-center'>Login To Continue</h1>
            <form onSubmit={submitHandle} className="w-[90%] md:w-[40%] lg:w-[30%]">
                <div className="relative z-0 w-full mb-10 group">
                    <input value={credentials.email} onChange={changeHandle} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={credentials.password} onChange={changeHandle} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                </div>
                <div className='flex flex-col justify-center items-center hover:text-indigo-500'>
                    <NavLink className={'my-3'} to={'/signup'}>Don't Have An Account</NavLink>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>

        </div >
    )
}

export default Login