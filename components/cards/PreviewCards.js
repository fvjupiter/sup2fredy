import React from 'react';
import PageTitle from '../PageTitle';
import PreviewCard from './PreviewCard';

export default function PreviewCards({ title, data, folder, ringColor }) {

    return <>
        <PageTitle title={title} />
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
