import React from 'react'

const ShowComments = ({ elemCom }) => {
    return (
        <div>
            <div className="mx-auto max-w-lg mt-4">
                <div className="divide-y divide-gray-100">
                    <details className="group">
                        <summary
                            className="flex cursor-pointer list-none items-center justify-between py-4 text-lg font-medium text-secondary-900 group-open:text-primary-500">
                            Show Comments
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="block h-5 w-5 group-open:hidden">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="hidden h-5 w-5 group-open:block">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                                </svg>
                            </div>
                        </summary>
                        <div className={`pb-4 ${elemCom.length === 0 ? 'h-[4rem]' : 'h-[16rem]'} overflow-y-auto text-secondary-500`}>
                            {elemCom.length === 0 ? <div><h1>No Comments</h1></div> : elemCom.map((el, ind) => {
                                return (
                                    <div key={ind} className="flex mt-4">
                                        <div className="w-14 h-14 rounded-full bg-indigo-200/50 flex-shrink-0 flex items-center justify-center">
                                            <img className="h-12 w-12 rounded-full object-cover" src={el.image}
                                                alt="" />
                                        </div>
                                        <div className="ml-3">
                                            <div className="font-medium text-indigo-500">{el.name}</div>
                                            <div className="text-gray-600">Posted on {el.dateTi}</div>
                                            <div className="mt-2 text-indigo-500">{el.comments}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </details>
                </div>
            </div>
        </div>
    )
}

export default ShowComments