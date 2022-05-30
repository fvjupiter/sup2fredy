import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { slugListState } from '../../../lib/states'
import { createClient } from 'contentful'
import PreviewCards from '../../../components/cards/PreviewCards'

export default function Stories({ stories, storySlugList }) {
    const [slugList, setslugList] = useRecoilState(slugListState)
    useEffect(() => setslugList({
        ...slugList,
        stories: storySlugList
    }), [])

    return <>
        <PreviewCards
            isRandom
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

    const storySlugList = []
    for (let i = 0; i < res.items.length; i++) {
        storySlugList.push(res.items[i].fields.slug)
    }

    return {
        props: {
            stories: res.items,
            storySlugList: storySlugList
        }
    }
}
