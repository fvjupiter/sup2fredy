import React from 'react'

export default function PageTitle({ title, classN }) {
    return <h1 className={`${classN} duration-300 textShadow text-4xl sm:text-5xl mx-auto text-center text-white font-cursive pt-4 sm:pt-6 px-2`}>{title}</h1>
}
