import React from 'react'
import Link from 'next/link'

export default function PreviewCard({ href, title, date, ringColor }) {
    return <Link href={href}>
        <div className={`group w-full sm:w-full md:w-5/12 lg:w-5/12 2xl:w-3/12 min-w-[316px] lg:min-w-[400px] 2xl:min-w-[500px] h-36 sm:h-40 lg:h-48 p-3 m-2 sm:m-5 rounded-2xl hover:shadow-3xl cursor-pointer
                        bg-opacity-60 hover:bg-opacity-30 bg-black ring-2 ${ringColor} border-4 border-transparent hover:border-white  text-white flex items-center justify-center
                        transition-all duration-300
            `}>
            <div>
                <div className='transform group-hover:scale-90 transition-all duration-300'>
                    <h1 className='textShadow text-lg sm:text-xl xl:text-2xl font-cursive'>{title}</h1>
                    <h1 className='font-sans textShadow font-extralight text-md sm:text-lg'>{date}</h1>
                </div>
            </div>
        </div>
    </Link>
}
