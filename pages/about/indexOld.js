import React, { useState, useEffect } from 'react'
import Fredy from '../../public/img/fredy.jpeg'
import RainbowFractal from '../../public/img/rainbowFractal.jpg'
import Image from 'next/image'
import MagicText from '../../components/MagicText'
import { scrollTopState } from '../../lib/states'
import { useRecoilState } from 'recoil'
import Fade from '../../components/Fade'
import PageTitle from '../../components/PageTitle'
import Slide from "../../components/slide"


export default function About() {
    const [isBigImg, setisBigImg] = useState(false)
    const [isRead, setisRead] = useState(false)
    useEffect(() => setisBigImg(true), [])
    const [scrollTop, setscrollTop] = useRecoilState(scrollTopState)
    return <>
        {/* <div style={{
            transform: `scale(${scrollTop/750}) rotate(${scrollTop}deg)`,
        }} className='fixed h-96 w-96 top-72 left-1/2 -ml-48'>
            <Image 
                src={Fredy}
                placeholder="blur"
                layout='fill' 
                objectFit='contain'
                objectPosition='center'
            />
        </div>
        <div className={`w-screen bg-black h-[20000px] bg-gradient-to-b from-black to-white z-30`}>
        
        </div> */}
        <div className='absolute z-10'><PageTitle title={'About'}/></div>
        <div 
            className={`-mt-12 h-screen w-screen bg-black
            ${isBigImg ? 'scale-100 rotate-0 ml-0' : 'ml-[440px] sm:ml-0 sm:scale-0 sm:rotate-[540deg]'} 
            duration-[7s]`}> 
                <Image 
                    src={Fredy}
                    placeholder="blur"
                    layout='fill' 
                    objectFit='contain'
                    objectPosition='center'
                />
        </div>

        <div className='fixed z-50 bg-white'>
        <Slide boxList={[0,1,2,3]}
            currentBoxId={1}
            boxIdHandler={() => {}}
            height={400}
            width={400}
            borderRadius={20}
        />
        </div>






        <div className='text-2xl text-white top-20 absolute -mt-10 z-40' onClick={() => { setisRead(!isRead) }}>click me to rread</div>
        <div className={`h-screen ${isRead ? '' : ''} fixed bottom-0 w-screen overflow-scroll duration-[4s] z-30`}>
            <div className={`w-screen bottom-0 ${isRead ? 'mt-[150px] scale-100 opacity-100' : 'scale-[20] opacity-0'} duration-[4s] text-white z-10 text-justify text-lg sm:text-2xl font-extralight`}>
                <div className='w-screen sm:w-[700px] mx-auto px-4 py-2 bg-black rounded-2xl bg-opacity-80 border-2 border-white'>
                    <Fade duratio={5} scale={[0.95, 1]}>
                        <p>Hi! It is a pleasure to meet you here <a>@sup2fredy.com</a>, which actually stands for 'Whats up to Fredy?'.</p>
                        <p>My name is Frederik Schoof, I'm born in Hamburg in August 1997 and currently based in Bremen.</p><br/>
                        <p>Since 2017 I'm writing down poems, stories and thoughts that come to my mind.
                            You'll find some of them under the <a>Writings</a> category.
                        </p><br/>
                        <p>I play the guitar since my childhood and started composing and recording <a>Music</a> in 2021. 
                            I mostly create the lyrics and guitar-parts as well as the programmed parts myself. 
                            In a lot of tracks <a>Imke</a> is singing and takes credebility for the beats too. 
                            She also created the single-covers as well as the fresh profile picture above.
                            I can only recommend her if you need nice, creative digital artwork for your projects.
                        </p><br/>
                        <p>In 2019 I decided to quit my cultural science &amp; philosophy studies @Universität Bremen to work
                            as a software developer especially for the web. If you need a 
                            secure progressive Web-App / -Site hit me up at <a>schoof.frederik@gmail.com</a>! I'm working with mordern
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
 
        <div className={`left-0 right-0 bottom-0 top-0 w-screen h-screen fixed ${isRead ? 'scale-100 opacity-100' : 'scale-[20] opacity-0'} duration-[7s] mx-auto`}>
            <Image 
                src={RainbowFractal}
                placeholder="blur"
                layout='fill' 
                objectFit='cover'
                objectPosition='center'
            />
        </div>
        {/* <div className={`relative w-full sm:w-[1200px] h-[1500px] ${isBigImg ? '-mt-32 sm:-mt-40' : 'mt-0'} duration-[4s] mx-auto`}>
            <Image 
                src={Fredy}
                placeholder="blur"
                layout='fill' 
                objectFit='cover'
                objectPosition='center'
            />
        </div> */}
    </>
}
const lineArr = [
    'Hi my name is Frederik Schoof.',

]