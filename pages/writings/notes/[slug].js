import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { createClient } from 'contentful'
import ContentCard from '../../../components/cards/ContentCard'
import { slugListState } from '../../../lib/states'
import Comments from '../../../components/Comments'

export default function Note({ note, noteSlugList }) {
    const [slugList, setslugList] = useRecoilState(slugListState)
    useEffect(() => setslugList({
        ...slugList,
        notes: noteSlugList
    }), [])
    
    return <>
        <ContentCard 
            title={note.fields.title} 
            date={note.fields.dateTitle} 
            intro={note.fields.intro} 
            markdownContent={note.fields.content} 
            borderColor={'border-emerald-400'} 
            bgColor={'bg-black'}
            textOrientation='text-justify'
        />

        <Comments border={`border-emerald-400`} bg_success={`bg-emerald-400`} bg_success_hover={`hover:bg-emerald-200`} ring={`ring-emerald-200`}/>
    </>
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths(){

    const res = await client.getEntries({ content_type: 'note' })

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
        content_type: 'note',
        'fields.slug': params.slug
    })

    const res2 = await client.getEntries({ content_type: 'note', order: 'fields.indexFloat' })

    const noteSlugList = []
    for (let i = 0; i < res2.items.length; i++) {
        noteSlugList.push(res2.items[i].fields.slug)
    }

    return {
        props: {
            note: items[0],
            noteSlugList: noteSlugList
        },
        // revalidate: 10,
    }
}
