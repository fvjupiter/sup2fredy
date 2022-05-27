import React from 'react'
import { createClient } from 'contentful'
import PreviewCards from '../../../components/PreviewCards'

export default function Notes({ notes }) {
    return <>
        <PreviewCards
            title='Notes'
            data={notes}
            folder={'notes'}
            ringColor={'ring-emerald-400'}
        />
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: 'note', order: 'fields.indexFloat' })

    return {
        props: {
            notes: res.items,
        }
    }
}