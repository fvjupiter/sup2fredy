import React from 'react'
import { createClient } from 'contentful'
import PreviewCards from '../../../components/cards/PreviewCards'

export default function Stories({ stories }) {
    return <>
        <PreviewCards
            title='stories'
            data={stories}
            folder={'stories'}
            ringColor={'ring-green-400'}
        />
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: 'story', order: 'fields.indexFloat' })

    return {
        props: {
            stories: res.items,
        }
    }
}
