import React, { useState, useEffect } from 'react'
import { createClient } from 'contentful'
import Fredy from '../../public/img/fredy.jpeg'
import RainbowFractal from '../../public/img/rainbowFractal.jpg'
import Image from 'next/image'
import { screenState, scrollTopState } from '../../lib/states'
import { useRecoilState, useRecoilValue } from 'recoil'
import Fade from '../../components/Fade'
import PageTitle from '../../components/PageTitle'
import Link from 'next/link'
import { INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Footer from '../../components/footer/Footer'


export default function About({ aboutData }) {

    const richText_Options = {
        renderNode: {
            [INLINES.HYPERLINK]: (node, children) => <Link href={node.data.uri}><a>{children}</a></Link>
            // <a target='_blank' rel="noreferrer" href={node.data.uri}>{children}</a>,
        },
    }

    const [isBigImg, setisBigImg] = useState(false)
    useEffect(() => {
        setisBigImg(true)
    }, [])
    const scrollTop = useRecoilValue(scrollTopState)
    const screen = useRecoilValue(screenState)
    
    return <>
        <div className={`${scrollTop > (screen.height - 260) ? 'opacity-0' : 'opacity-100'} fixed w-screen text-center z-40 duration-1000`}>
            <PageTitle title={'About'} classN={``}/>
        </div>
        <div className={`${isBigImg ? 'scale-100 rotate-0 ml-0' : 'ml-[440px] sm:ml-0 sm:scale-0 sm:rotate-[540deg]'}
            fixed -mt-12 h-screen w-screen bg-black duration-[7s]`}> 
                <Image priority
                    src={Fredy}
                    placeholder="blur"
                    layout='fill' 
                    objectFit='contain'
                    objectPosition='center'
                />
        </div>
        <div className={`h-screen absolute w-screen z-40`}>
            <div style={{ marginTop: screen.height - 175 }}
            className={`w-screen text-white z-10 mb-20 px-1.5`}>
                <div className={`whitespace-pre-line lg:w-[1010px] mx-auto sm:w-[620px] md:w-[748px]
                    text-justify text-sm sm:text-base md:text-lg px-4 py-2 sm:px-7 sm:py-5 md:px-8 md:py-6 lg:py-8 lg:px-12
                    bg-black shadow-preview rounded-2xl bg-opacity-80 ring-2 ring-purple-400 border-4 border-white`}>
                    <Fade duratio={3} scale={[0.95, 1]} classN={'font-light'}>
                        {documentToReactComponents(aboutData.fields.content, richText_Options)}
                    </Fade>
                </div>
            </div>
            <Footer />
        </div>

        <div style={{ opacity: screen.width < 768 ? scrollTop/700 : null }}
            className={`${scrollTop > 0 ? 'md:opacity-100' : 'md:opacity-0'} left-0 right-0 bottom-0 top-0 w-screen h-screen fixed noselect z-30 md:duration-[7s]`}>
            <Image 
                src={RainbowFractal}
                placeholder="blur"
                layout='fill' 
                objectFit='cover'
                objectPosition='center'
            />
            {/* {screen.width >= 768 && <div className={`top-0 left-0 right-0 bottom-0 absolute z-10 bg-gradient-to-r from-black/70 via-black/0 to-black/70`}/>} */}
        </div>
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: 'appContent', 'fields.slug': 'about', })

    return {
        props: {
            aboutData: res.items[0],
        }
    }
}