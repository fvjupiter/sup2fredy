import React, { useEffect, useState } from 'react'
import PreviewCard from '../../components/cards/PreviewCard'
import PreviewCards from '../../components/cards/PreviewCards'
import PageTitle from '../../components/PageTitle'

export default function Games() {
    const apps = [
        {
            slug: 'mathgame',
            fields: {
                title: 'Mathgame',
                slug: 'mathgame',
            }
        },
        {
            slug: 'undercover',
            fields: {
                title: 'Undercover',
                slug: 'undercover',
            }
        },
    ]
    return (<>

    {/* // <PreviewCards 
    //     title='Software'
    //     data={apps}
    //     folder={'software'}
    //     ringColor={'ring-pink-400'}
    // /> */}
    <PageTitle title={'Software'} />
    <div className='flex flex-wrap justify-center w-screen pr-4'>
        <div>
            <PreviewCard
                key={1} 
                href={`software/mathgame`}
                title={'Mathgame'}
                date={''}
                ringColor={'ring-pink-400'}
            />
        </div>
        <a 
            href='http://undercover.sup2fredy.com/' 
            rel="noreferrer" 
            target='_blank'
            >
            <PreviewCard
                key={2} 
                title={'Undercover'}
                date={''}
                ringColor={'ring-pink-400'}
            />
        </a>
    </div>
    </>)
}
