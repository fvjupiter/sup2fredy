import React, { useState, useEffect } from 'react'
import MenuCard from './MenuCard'


export default function MenuCards({ data }) {
    const [id, setid] = useState(-1)
    useEffect(() => setid(-1), [])

    return <div className='px-2 sm:px-4 mb-20'>
            {data.map((card, index) => (
                <div key={index} onClick={() => setid(index)} onMouseLeave={() => setid(-1)} className={`lg:w-10/12 xl:w-8/12 w-full mx-auto bg-white`}>
                    <MenuCard index={index} href={card.href} isClicked={id == index} title={card.title} img={card.img} ringHover={card.ringHover}>
                        <ul style={{ listStyleType: 'circle'}} className='text-white'>
                            {card.childrenLi}
                        </ul>
                    </MenuCard>
                </div>
            ))}
    </div>
}
