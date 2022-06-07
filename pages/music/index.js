import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { createClient } from 'contentful'
import PageTitle from '../../components/PageTitle'
import ReactPlayer01 from '../../components/ReactPlayer01'
import ReactPlayer02 from '../../components/ReactPlayer02'
import { screenState } from '../../lib/states'

export default function Music({ soundcloudTracks, singles }) {
console.log(singles)
    const screen = useRecoilValue(screenState)
    const [trackList, settrackList] = useState(null)
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
        settrackList(arr)
    }, [])

    // const [urls, seturls] = useState(null)
    // useEffect(() => {
    //     let arr = []
    //     for (let i = 0; i < soundcloudTracks.length; i++) {
    //         arr.push({ title: soundcloudTracks[i].fields.title, url: soundcloudTracks[i].fields.url })
    //     }
    //     seturls(arr)
    // }, [])
    
    return <>
        <PageTitle title={'Music'}/>
        {trackList && 
        <ReactPlayer02
            trackList={trackList}
            width={screen.width < 700 ? screen.width : 700-12} 
            height={screen.width < 700 ? screen.width / 1.5 : (700-12) / 1.5}
        />}
        {/* {urls && 
        <ReactPlayer01 
            urls={urls} 
            width={screen.width < 700 ? screen.width : 700-12} 
            height={screen.width < 700 ? screen.width / 1.5 : (700-12) / 1.5}
        />} */}
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: 'soundcloudTrack', order: 'fields.indexFloat' })

    const res2 = await client.getEntries({ content_type: 'single', order: 'fields.indexFloat' })

    return {
        props: {
            soundcloudTracks: res.items,
            singles: res2.items
        }
    }
}
