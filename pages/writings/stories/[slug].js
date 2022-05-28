import React, { useState, useEffect, useRef } from 'react'
// import Slide from '../../../components/Slide'
import PageTitle from '../../../components/PageTitle'
import { useRecoilState } from 'recoil'
import { slugListState } from '../../../lib/states'
import { createClient } from 'contentful'
import ContentCard from '../../../components/cards/ContentCard'
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export default function Story({ story,storySlugList }) {
    const [slugList, setslugList] = useRecoilState(slugListState)
    useEffect(() => setslugList({
        ...slugList,
        stories: storySlugList
    }), [])

    // OPTIONS FOR RICHTEXT RENDERER
    const richText_Options = {
        // renderMark: {
        //     [MARKS.BOLD]: text => <>{text}</>,
        // },
        renderNode: {
            [INLINES.HYPERLINK]: (node, children) => <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
        },
        // renderText: text => text.replace('!', '?'),
    };

    // dangerouslySetInnerHTML={{ __html: content.split('\n').join('\n\n') }} 
    return <>
        <PageTitle title={story.fields.title}/>
        <div
            className={`mx-auto w-[1100px] mt-4 whitespace-pre-line 
                text-justify leading-10 bg-black bg-opacity-70 text-white text-lg py-12 px-20 rounded-3xl
                border-4 border-white ring-2 ring-green-400 
            `}>
                {documentToReactComponents(story.fields.content, richText_Options)}
        </div>
    </>
}

const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
})

export async function getStaticPaths(){

    const res = await client.getEntries({ content_type: 'story' })

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
        content_type: 'story',
        'fields.slug': params.slug,
    
    })

    const res2 = await client.getEntries({ content_type: 'story', order: 'fields.indexFloat' })

    const storySlugList = []
    for (let i = 0; i < res2.items.length; i++) {
        storySlugList.push(res2.items[i].fields.slug)
    }

    return {
        props: {
            story: items[0],
            storySlugList: storySlugList
        }
    }
}