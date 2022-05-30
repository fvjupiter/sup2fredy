import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { createClient } from 'contentful'
import PageTitle from '../../components/PageTitle'
import ReactPlayer01 from '../../components/ReactPlayer01'
import { screenState } from '../../lib/states'

export default function Music({ soundcloudTracks, singles }) {
    
    const screen = useRecoilValue(screenState)
    const [urls, seturls] = useState(null)
    useEffect(() => {
        let urlArr = []
        for (let i = 0; i < soundcloudTracks.length; i++) {
            urlArr.push({ title: soundcloudTracks[i].fields.title, url: soundcloudTracks[i].fields.url })
        }
        seturls(urlArr)
    }, [])
    
    return <>
        <PageTitle title={'Music'}/>
        {urls && 
        <ReactPlayer01 
            urls={urls} 
            width={screen.width < 700 ? screen.width : 700-12} 
            height={screen.width < 700 ? screen.width / 1.5 : (700-12) / 1.5}
        />}
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: 'soundcloudTrack', order: 'fields.indexFloat' })

    // const res2 = await client.getEntries({ content_type: 'single', order: 'fields.indexFloat' })

    return {
        props: {
            soundcloudTracks: res.items,
            // singles: res2.items
        }
    }
}
