import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import PageTitle from '../PageTitle';
import PreviewCard from './PreviewCard';
import { useRecoilValue } from 'recoil';
import { slugListState } from '../../lib/states';
import { Icon } from '../../lib/icons';

export default function PreviewCards({ title, data, folder, ringColor, isRandom }) {
    const router = useRouter()
    const asPath = router.asPath
    const param1 = asPath.split('/')[1]
    const param2 = asPath.split('/')[2]

    const slugList = useRecoilValue(slugListState)

    const getRandom = () => router.push(`${param2}/${slugList[param2][Math.floor(Math.random() * slugList[param2].length)]}`)

    return <>
        <PageTitle title={title} />
        {isRandom && <div onClick={getRandom} className={`w-fit mx-auto text-center textShadow opacity-80 hover:opacity-100 text-white duration-300 cursor-pointer text-xl mb-2 sm:mt-3`}>
            <Icon id={'dice'} size={50}/>
        </div>}
        <div className='w-screen text-center flex justify-center mb-20'>
            <div className='flex flex-wrap justify-center w-screen'>
                {data.map((card, index) => (
                    <PreviewCard
                        key={index} 
                        href={`${folder}/${card.fields.slug}`}
                        title={card.fields.title}
                        date={card.fields.dateTitle}
                        ringColor={ringColor ? ringColor : 'ring-white'}
                    />
                ))}
            </div>
        </div>
    </>
}
