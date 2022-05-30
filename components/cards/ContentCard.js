import React from 'react'
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
// var showdown  = require('showdown'),
//     converter = new showdown.Converter()

export default function ContentCard({ title, date, intro, markdownContent, ringColor, bgColor, textOrientation }) {
    // const text = markdownContent && converter.makeHtml(markdownContent)

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

    return <>
        <div className='mx-auto whitespace-pre-line min-w-[318px] sm:w-[490px] md:min-w-[620px] md:max-w-[800px] max-w-[490px] text-sm sm:text-base md:text-lg mb-20'>
            <h1 className='textShadow text-2xl md:text-4xl m-4 font-cursive text-white text-center'>{title}</h1>
            <div className={`p-5 mx-auto ${textOrientation} hadow bg-opacity-60 ${bgColor ? bgColor : 'bg-black'} ring-2 ${ringColor ? ringColor : 'ring-white'} border-4 border-white
            text-white rounded-2xl`}
                >
                {(date || intro) && <div className='mb-3 text-base md:text-lg font-cursive'>
                    {date && <p>{date}</p>}
                    {intro && <p>{intro}</p>}
                </div>}
                {/* {text && <div dangerouslySetInnerHTML={{ __html: text }} />} */}
                {documentToReactComponents(markdownContent, richText_Options)}
            </div>
        </div>
    </>
}
