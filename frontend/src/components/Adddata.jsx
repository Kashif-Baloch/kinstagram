import React, { useRef, useState } from 'react'
import { MdClose } from "react-icons/md";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Adddata = ({ changeAdd, handleSubmit }) => {
    const [treds, setTreds] = useState(true)
    const [cred, setCred] = useState({ fileType: '', category: '', desc: '' });
    const filInp = useRef('')
    const [showLoad, setShowLoad] = useState(false)

    const runDev = (t) => {
        setTreds(!treds)
        if (t == 'img') {
            setCred({ ...cred, category: 'image' })
        } else {
            setCred({ ...cred, category: 'video' })
        }
    }

    const handleChange = async (e) => {
        if (e.target.name == "fileType") {
            let mkv = e.target.files[0].name.endsWith('.mkv')
            let mp4 = e.target.files[0].name.endsWith(".mp4")
            let ts = e.target.files[0].name.endsWith('.ts')
            let mov = e.target.files[0].name.endsWith('.mov')
            let MOV = e.target.files[0].name.endsWith(".MOV")
            let mp3 = e.target.files[0].name.endsWith(".mp3")
            let avi = e.target.files[0].name.endsWith(".avi")
            let flv = e.target.files[0].name.endsWith(".flv")
            let png = e.target.files[0].name.endsWith(".png")
            let jpg = e.target.files[0].name.endsWith(".jpg")
            let jpeg = e.target.files[0].name.endsWith(".jpeg")
            let webp = e.target.files[0].name.endsWith(".webp")
            let gif = e.target.files[0].name.endsWith(".gif")
            let svg = e.target.files[0].name.endsWith(".psd")
            let bmp = e.target.files[0].name.endsWith(".bmp")
            let avif = e.target.files[0].name.endsWith(".avif")
            let ico = e.target.files[0].name.endsWith(".ico")
            if ((cred.category == "image") && (mkv || mp4 || ts || mov || MOV || mp3 || avi || flv)) {
                toast.info('🦄 Please Chose Right File!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTreds(!treds)
            }
            else if ((cred.category == "video") && (png || jpg || jpeg || webp || gif || svg || bmp || avif || ico)) {
                toast.info('🦄 Please Chose Right File!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTreds(!treds)
            }
            else {
                let reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    setCred({ ...cred, [e.target.name]: reader.result })
                }
                reader.onerror = (err) => {
                    console.log(err);
                }
            }
        } else {
            setCred({ ...cred, [e.target.name]: e.target.value })
        }
    }

    const handleBit = (e) => {
        e.preventDefault();
        handleSubmit(cred)
        setShowLoad(!showLoad)
    }

    const runHandler = () => {
        changeAdd()
        // setCred({ fileType: '', category: '', desc: '' })
    }

    return (
        <>
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
            {showLoad && <div className='fixed top-0 z-[100] bg-[#000000a7] left-0 w-full h-full flex justify-center items-center'>
                <h1 className='font-bold text-4xl text-white'>Loading...</h1>
            </div>}
            <div className='fixed top-0 left-0 w-full h-full bg-[#00000045] z-50 flex items-center justify-center'>
                <div onClick={runHandler} className="absolute top-5 right-5">
                    <MdClose size={40} />
                </div>
                {treds ? <div className='flex flex-col bg-white rounded-xl pb-0 p-4 gap-6'>
                    <button onClick={() => { runDev('vid') }} className='p-3 bg-indigo-500'>Upload A Video</button>
                    <button onClick={() => { runDev('img') }} className='p-3 bg-indigo-500'>Upload An Image</button>
                    <button></button>
                </div> :
                    <form onSubmit={handleBit} className="w-[50%] rounded-xl bg-white p-6 mx-auto">
                        <div className='flex justify-center flex-col items-center'>
                            <h1 className='font-bold text-center text-3xl'>Attention</h1>
                            <h1 className='font-bold text-center'>{cred.category == 'image' ? 'Carefully Chose Only Images' : 'Carefully Chose Only Video'}</h1>
                        </div>
                        <div onClick={() => { setTreds(!treds) }} className="my-3 flex justify-center items-center">
                            <span className='bg-[#00000049] p-2 rounded-lg'><FaArrowLeftLong size={28} /></span>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="fileType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your File</label>
                            <input onChange={handleChange} ref={filInp} type="file" name='fileType' id="fileType" className="hidden" placeholder="name@flowbite.com" required />
                            <div onClick={() => { filInp.current.click() }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 py-8 flex justify-center items-center">
                                <IoFileTrayFullOutline size={45} />
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <input type="text" onChange={handleChange} value={cred.desc} name='desc' id="desc" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-indigo-400 transition-all rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>}
            </div >
        </>
    )
}

export default Adddata