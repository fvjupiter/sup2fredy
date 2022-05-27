import React, { useState, useEffect, useRef } from 'react'
import Fredy from '../../public/img/fredy.jpeg'
import Fredy_nobg from '../../public/img/fredy_nobg.png'
import BlueGoldSpiral2 from '../../public/img/blueGoldSpiral2.jpg'
import RainbowFractal from '../../public/img/rainbowFractal.jpg'
import Image from 'next/image'
import MagicText from '../../components/MagicText'
import { scrollTopState } from '../../lib/states'
import { useRecoilState } from 'recoil'
import Fade from '../../components/Fade'
import PageTitle from '../../components/PageTitle'
import Slide from "../../components/slide"
var showdown  = require('showdown'),
    converter = new showdown.Converter()

export default function About({ aboutData }) {
    const screenRef = useRef()
    const [screenWidth, setscreenWidth] = useState(1)
    const [screenHeight, setscreenHeight] = useState(1)
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setscreenWidth(entries[0].contentRect.width)
            setscreenHeight(entries[0].contentRect.height)
            console.log(entries[0].contentRect.height)
        })
        observer.observe(screenRef.current)
        return () => screenRef.current && observer.unobserve(screenRef.current)
    }, [])

    const [isBigImg, setisBigImg] = useState(false)
    const [isRead, setisRead] = useState(false)
    useEffect(() => {
        setisBigImg(true)
        setboxList([
            converter.makeHtml(aboutData.attributes.firstSlide),
            converter.makeHtml(aboutData.attributes.secondSlide)
        ])
    }, [])
    const [boxList, setboxList] = useState([])

    const [scrollTop, setscrollTop] = useRecoilState(scrollTopState)
    useEffect(() => {
      console.log(scrollTop/1000)
    }, [scrollTop])
    
    return <>
        <div className='h-screen w-screen fixed' ref={screenRef}/>
        <div className='absolute z-20'><PageTitle title={'About'}/></div>
        <div className={`${isBigImg ? 'scale-100 rotate-0 ml-0' : 'ml-[440px] sm:ml-0 sm:scale-0 sm:rotate-[540deg]'}
            absolute -mt-12 h-screen w-screen bg-black duration-[7s]`}> 
                <Image 
                    src={Fredy}
                    placeholder="blur"
                    layout='fill' 
                    objectFit='contain'
                    objectPosition='center'
                />
        </div>
        <div style={{
            marginLeft: -1*  (screenWidth > 508 ? 254 : screenWidth / 2),
            width: screenWidth > 508 ? 508 : screenWidth,
            height: screenHeight > 958 ? 658 : screenHeight-250,
            top: isRead ? 60 : screenHeight
        }}
        className={`${isRead ? 'scale-100 opacity-100 bottom-32' : 'scale-[1] opacity-0'} duration-[4s]
            absolute z-10 bg-transparent inset-x-1/2 max-w-fit mt-20 sm:mt-[90px] rounded-3xl overflow-hidden border-4 border-white bigShadow`}>
                {/* <Image className='z-0'
                    src={RainbowFractal}
                    placeholder="blur"
                    layout='fill' 
                    objectFit='cover'
                    objectPosition='center'
            /> */}
            <Image className='scale-[1.3] drop-shadow-2xl'
                    src={Fredy_nobg}
                    placeholder="blur"
                    layout='fill' 
                    objectFit='cover'
                    objectPosition='center'
            />
            <Slide boxList={boxList}
                currentBoxId={0}
                boxIdHandler={() => { console.log('handler') }}
                height={screenHeight > 958 ? 650 : screenHeight-258}
                width={screenWidth > 508 ? 500 : screenWidth-8}
                borderRadius={30}
            />
        </div>


        <div className={`${isRead ? 'scale-100 opacity-100' : 'scale-[20] opacity-0'}
            left-0 right-0 bottom-0 top-0 w-screen h-screen fixed duration-[5s] noselect`}>
            <Image 
                src={RainbowFractal}
                placeholder="blur"
                layout='fill' 
                objectFit='cover'
                objectPosition='center'
            />
        </div>



        <div className={`${isRead ? 'opacity-100 h-10 w-10 -ml-5 pb-1 bottom-[85px] border-2' 
            : 'opacity-100 h-16 w-48 -ml-24 font-serif bottom-24 border-2'} 
            text-2xl inset-x-1/2 absolute z-40 
            rounded-3xl duration-300
            hover:mb-1 hover:text-white text-gray-500
            hover:border-white hover:bg-opacity-0 bg-black backdrop
            bg-opacity-60 border-gray-600 flex items-center justify-center 
            cursor-pointer`} onClick={() => { setisRead(!isRead) }}>
                <div>{!isRead ? 'continue' : 'x'}</div>
        </div>

    </>
}
const boxList = [
    `So, now I've told you what I do in context of projects but to really get to know a person, you need to understand their
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
    and connect people.`,
    2,
    3,
    4

]
export async function getStaticProps() {
    const res = await fetch("http://localhost:1337/api/about") //ideally shoukd be env.var
    const { data } = await res.json()
    return{
      props: { aboutData: data }
    }
}
