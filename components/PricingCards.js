import React from 'react'
import PricingCard from './PricingCard'

export default function PricingCards(p) {
    return <>
        <div className={`flex flex-wrap justify-center`}>
            {p.data.map((card, index) => <PricingCard key={index} {...p} index={index} data={card}/>)}
        </div>
    </>
}
