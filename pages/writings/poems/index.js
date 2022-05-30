import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { slugListState } from '../../../lib/states'
import { createClient } from 'contentful'
import PreviewCards from '../../../components/cards/PreviewCards'

export default function Poems({ poems, poemSlugList }) {
    const [slugList, setslugList] = useRecoilState(slugListState)
    useEffect(() => setslugList({
        ...slugList,
        poems: poemSlugList
    }), [])

    return <>
        <PreviewCards 
            isRandom
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

    const poemSlugList = []
    for (let i = 0; i < res.items.length; i++) {
        poemSlugList.push(res.items[i].fields.slug)
    }

    return {
        props: {
            poems: res.items,
            poemSlugList: poemSlugList
        }
    }
}
