import React, { useState, useEffect, useRef } from 'react'
import { createClient } from 'contentful'
import Fredy from '../../public/img/fredy.jpeg'
import Fredy_nobg from '../../public/img/fredy_nobg.png'
import BlueGoldSpiral2 from '../../public/img/blueGoldSpiral2.jpg'
import RainbowFractal from '../../public/img/rainbowFractal.jpg'
import Image from 'next/image'
import MagicText from '../../components/MagicText'
import { screenState, scrollTopState } from '../../lib/states'
import { useRecoilState, useRecoilValue } from 'recoil'
import Fade from '../../components/Fade'
import PageTitle from '../../components/PageTitle'
import Slide from "../../components/slide"
import Link from 'next/link'


export default function About({ aboutData }) {
    const [isBigImg, setisBigImg] = useState(false)
    useEffect(() => {
        setisBigImg(true)
    }, [])
    const [scrollTop, setscrollTop] = useRecoilState(scrollTopState)
    const screen = useRecoilValue(screenState)
    
    return <>
        <div className={`${scrollTop > (screen.height - 260) ? 'opacity-0' : 'opacity-100'} fixed w-screen text-center z-40 duration-1000`}>
            <PageTitle title={'About'} classN={``}/>
        </div>
        <div className={`${isBigImg ? 'scale-100 rotate-0 ml-0' : 'ml-[440px] sm:ml-0 sm:scale-0 sm:rotate-[540deg]'}
            fixed -mt-12 h-screen w-screen bg-black duration-[7s]`}> 
                <Image 
                    src={Fredy}
                    placeholder="blur"
                    layout='fill' 
                    objectFit='contain'
                    objectPosition='center'
                />
        </div>
        <div className={`h-screen absolute w-screen z-40`}>
            <div style={{ marginTop: screen.height - 175 }}
            className={`w-screen text-white z-10 text-justify text-lg sm:text-xl px-4 pb-96`}>
                <div className='w-full sm:w-[700px] mx-auto px-4 py-2 bg-black shadow-preview leading-10 rounded-2xl bg-opacity-80 ring-2 ring-purple-400 border-4 border-white'>
                    <Fade duratio={3} scale={[0.95, 1]}>
                        {/* <div dangerouslySetInnerHTML={{ __html: converter.makeHtml(aboutData.attributes.aboutData) }} /> */}
                        <p>Hi! It is a pleasure to meet you here <Link href={'/'}><a>@sup2fredy.com</a></Link>, which actually stands for 'Whats up to Fredy?'.</p>
                        <p>My name is Frederik Schoof, I'm born in Hamburg in August 1997 and currently based in Bremen.</p><br/>
                        <p>Since 2017 I'm writing down poems, stories and thoughts that come to my mind.
                            You'll find some of them under the <Link href={'/writings/poems'}><a>Writings</a></Link> category.
                        </p><br/>
                        <p>I play the guitar since my childhood and started composing and recording <Link href={'/music'}><a>Music</a></Link> in 2021. 
                            I mostly create the lyrics and guitar-parts as well as the programmed parts myself. 
                            In a lot of tracks <a>Imke</a> is singing and takes credebility for the beats too. 
                            She also created the single-covers as well as the fresh profile picture above.
                            I can only recommend her if you need nice, creative digital artwork for your projects.
                        </p><br/>
                        <p>In 2019 I decided to quit my cultural science &amp; philosophy studies @Universität Bremen to work
                            as a software developer especially for the web. If you need a 
                            secure progressive Web-App / -Site hit me up at <a href= "mailto:schoof.frederik@gmail.com">schoof.frederik@gmail.com</a>! I'm working with mordern
                            industry-leading technologies like React / Next.js &amp; Tailwind.css for the front-end as well as Strapi, Contentful &amp; Firestore
                            for backend-purposes. The main advantages over things like wordpress are security and speed. If you want to know more just write
                            me an e-mail.
                        </p><br/>
                        <p>So, now I've told you what I do in context of projects but to really get to know a person, you need to understand their
                            believes.
                            My purpose here is to develop consciousness of who we are and give tools to the people to open their minds.
                            I'm not into religions, social conventions, moral standards or political stuff.
                            The reason for a great change won't be a new political system or technology but the altering of the human consciousness.
                            Act out of love not out of fear and overcome your fears by re-programming your mind.
                            It's always the mind before the matter.
                            Just to get me right: It's not about digital artificial brain assets
                            I do believe that everybody comes to the same result of what is true or false by getting aware of what is not what if.
                            For taking action you need to use your fantasy and ask yourself what is imaginable to come true and then do it.
                            If you see a chance, an impulse trust in who we are and ride the wave on-live. 
                            Everybody needs to do what they can do best and thrive towards excellence and unity.
                            One for all and all for one.
                            We do play the game of life always in the present moment and need to understand that life is pretty serious but always a fun game to play. 
                            and connect people.
                        </p>
                    </Fade>
                </div>
            </div>
        </div>


        <div style={{ opacity: scrollTop/700 }}
            className={`left-0 right-0 bottom-0 top-0 w-screen h-screen fixed noselect z-30 duration-100`}>
            <Image 
                src={RainbowFractal}
                placeholder="blur"
                layout='fill' 
                objectFit='cover'
                objectPosition='center'
            />
        </div>
    </>
}

export async function getStaticProps() {

    const client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    })
  
    const res = await client.getEntries({ content_type: 'appContent' })

    return {
        props: {
            appContent: res.items,
        }
    }
}