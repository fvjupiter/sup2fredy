import React from 'react'
import { createClient } from 'contentful'
import PreviewCards from '../../../components/cards/PreviewCards'

export default function Poems({ poems }) {

    return <>
        <PreviewCards 
            title='Poems'
            data={poems}
            folder={'poems'}
            ringColor={'ring-lime-400'}
        />
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: 'poem', order: 'fields.indexFloat' })

    return {
        props: {
            poems: res.items,
        }
    }
}
