import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { commentListState, slugListState } from '../../../lib/states'
import { createClient } from 'contentful'
import ContentCard from '../../../components/cards/ContentCard'
import { getComments, writeComment } from '../../../firebase/action'
import CommentCard from '../../../components/cards/CommentCard'
import Comments from '../../../components/Comments'

export default function Poem({ poem, poemSlugList }) {

    const [slugList, setslugList] = useRecoilState(slugListState)
    useEffect(() => setslugList({
        ...slugList,
        poems: poemSlugList
    }), [])

    return <div className='mb-20'>
        <ContentCard 
            title={poem.fields.title} 
            date={poem.fields.dateTitle} 
            intro={poem.fields.intro} 
            markdownContent={poem.fields.content} 
            borderColor={'border-lime-400 ring-black/50'} 
            bgColor={'bg-black'}
            textOrientation='text-center'
        />

        {/* <Comments border={`border-lime-400`} bg_success={`bg-lime-400`} bg_success_hover={`hover:bg-lime-200`} ring={`ring-lime-200`}/> */}

    </div>
} 

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths(){

    const res = await client.getEntries({ content_type: 'poem' })

    const paths = res.items.map(item => {
        return {
            params: { slug: item.fields.slug }
        }
    })

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {

    const { items } = await client.getEntries({ 
        content_type: 'poem',
        'fields.slug': params.slug,
    
    })

    const res2 = await client.getEntries({ content_type: 'poem', order: 'fields.indexFloat' })

    const poemSlugList = []
    for (let i = 0; i < res2.items.length; i++) {
        poemSlugList.push(res2.items[i].fields.slug)
    }

    return {
        props: {
            poem: items[0],
            poemSlugList: poemSlugList
        }
    }
}
