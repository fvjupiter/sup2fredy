import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { slugListState } from '../../../lib/states'
import { createClient } from 'contentful'
import PreviewCards from '../../../components/cards/PreviewCards'

export default function Notes({ notes, noteSlugList }) {
    const [slugList, setslugList] = useRecoilState(slugListState)
    useEffect(() => setslugList({
        ...slugList,
        notes: noteSlugList
    }), [])

    return <>
        <PreviewCards
            isRandom
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

    const noteSlugList = []
    for (let i = 0; i < res.items.length; i++) {
        noteSlugList.push(res.items[i].fields.slug)
    }

    return {
        props: {
            notes: res.items,
            noteSlugList: noteSlugList
        }
    }
}