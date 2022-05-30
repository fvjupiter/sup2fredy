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
    return <div className=''>
        {/* <PageTitle title={story.fields.title}/>
        <div
            className={`lg:w-[1010px] mx-auto sm:w-[620px] md:w-[748px] 
                px-4 py-2 sm:px-7 sm:py-5 md:px-8 md:py-6 lg:py-8 lg:px-12 mb-20
                text-sm sm:text-base md:text-lg text-justify lg:leading-10
                mt-4 whitespace-pre-line font-light
                bg-black bg-opacity-70 text-white rounded-3xl
                sm:border-4 border border-green-400 ring-4
            `}>
                {documentToReactComponents(story.fields.content, richText_Options)}
        </div> */}
        <ContentCard 
            title={story.fields.title} 
            date={story.fields.dateTitle} 
            intro={story.fields.intro} 
            markdownContent={story.fields.content} 
            borderColor={'border-green-400'} 
            lgWidth={`lg:w-[1000px]`}
            bgColor={'bg-black'}
            textOrientation='text-justify'
        />
    </div>
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
