import React, { useState, useEffect } from 'react'
import { createClient } from 'contentful'
import PageTitle from '../../components/PageTitle'
import MusicPlayer from '../../components/MusicPlayer'
import { useSetRecoilState } from 'recoil'
import { trackListState } from '../../lib/states'

export default function Music({ singles }) {
    const [trackList, settrackList] = useState(null)
    const setTrackList = useSetRecoilState(trackListState)
    useEffect(() => {
        let arr = []
        for (let i = 0; i < singles.length; i++) {
            arr.push({ 
                title: singles[i].fields.title, 
                url: singles[i].fields.audioFile.fields.file.url,
                image: singles[i].fields.image.fields.file.url,
                lyrics: singles[i].fields.lyrics
            })
        }
        setTrackList(arr)
    }, [])

    return <>
        <PageTitle title={'Music'}/>
        {/* {trackList && <MusicPlayer trackList={trackList}/>} */}
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })

    const res = await client.getEntries({ content_type: 'single', order: 'fields.indexFloat' })

    return {
        props: {
            singles: res.items
        }
    }
}
