import React, { useState } from 'react'

const Comments = () => {
    const [cred, setCred] = useState({ fileType: '' });

    const handleChange = async (e) => {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            setCred({ ...cred, [e.target.name]: reader.result })
        }
        reader.onerror = (err) => {
            console.log(err);
        }
    }

    const handleBit = (e) => {
        e.preventDefault();
        addItems()
    }

    const addItems = async () => {
        const requestData = await fetch(`http://localhost:8000/routes/files/filesZip`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ fileType: cred.fileType })
        });

        const response = await requestData.json();
        console.log(response);
    }

    return (
        <div className='flex flex-col items-center justify-center fixed top-0 left-0 w-full h-full p-6'>
            <form onSubmit={handleBit} className="w-[50%] flex flex-col items-center justify-center border gap-11 rounded-xl bg-white p-6 mx-auto">
                <div className="mb-5">
                    <input onChange={handleChange} type="file" name='fileType' className='border-indigo-500 border rounded-lg' id="fileType" />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>
    )
}

export default Comments