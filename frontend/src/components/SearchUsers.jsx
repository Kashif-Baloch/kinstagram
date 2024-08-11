import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io';
import { useGlobalContext } from '../context/context'

const SearchUsers = ({ setSearchBar }) => {
    const [data, setData] = useState([])
    const [dataMap, setDataMap] = useState([])
    const [query, setQuery] = useState('')
    const { getUsers } = useGlobalContext();

    const fetchData = async () => {
        const users = await getUsers();
        setData(users.data);
    }

    const search = () => {
        const agData = data.filter(elem => {
            return elem.name.toLowerCase().includes(query.toLowerCase()) || elem.email.toLowerCase().includes(query.toLowerCase())
        })

        query == '' ? setDataMap([]) : setDataMap(agData)
    }

    useEffect(() => {
        search()
    }, [query])

    useEffect(() => {
        fetchData();
    }, [])



    return (
        <div className='fixed bg-[#00000059] top-0 left-0 w-full h-full z-50 flex items-center justify-center'>
            <IoMdClose onClick={() => { setSearchBar(false) }} size={40} className='absolute text-white top-8 right-8' />
            <div className='rounded-lg w-[95%] md:w-[30%] bg-white p-3'>
                <div>
                    <input onChange={(e) => setQuery(e.target.value)} type="text" className="h-14 w-full pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything..." />
                    <div className="absolute top-4 right-3">
                        <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                    </div>
                </div>
                <div className='my-3 px-3 overflow-y-auto'>
                    {dataMap.map((elem, index) => {
                        return (
                            <div className='my-4 border p-2 gap-3 flex' key={index}>
                                <figure>
                                    <img className='w-14 rounded-full h-14' src={elem.image} alt="Logo" />
                                </figure>
                                <div>
                                    <h2 className='text-base overflow-hidden text-ellipsis font-semibold text-gray-700 dark:text-gray-2'>
                                        {elem.name}
                                    </h2>
                                    <p title={elem.email} className='font-medium w-12 lg:w-36 overflow-hidden text-ellipsis text-gray-500 dark:text-gray-400'>{elem.email}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default SearchUsers