import HomeMenuTiles from '../components/cards/HomeMenuCards'
import React, { useState, useEffect, useRef } from 'react'
import MagicText from '../components/MagicText'
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil'
import { displayMagicState, isLandingPageState, isShowMenuState, screenState } from '../lib/states'

export default function Home() {
  const setisShowMenu = useSetRecoilState(isShowMenuState)
  const [displayMagic, setdisplayMagic] = useRecoilState(displayMagicState)
  const [isLandingPage, setisLandingPage] = useRecoilState(isLandingPageState)
  const screen = useRecoilValue(screenState)
  useEffect(() => setisShowMenu(isLandingPage ? false : true), [isLandingPage])
  
  const introText = screen.width <= 640 ? 
    [`Hi Stranger & welcome to`,
      `SUP2FREDY!`,
      `My name is, well ...`,
      `Fredy & I'm the creator`,
      `of this Web-App.`,
      `You will find a lot`, 
      `of different selfmade`,
      `content in here`,
      `so turn on,`,
      `tune in`,
      `&`,
      `enjoy ;-)`
    ] : screen.width <= 1280 ? [
      `Hi Stranger & welcome to`,
      `SUP2FREDY!`, 
      `My name is, well ...`,
      `Fredy & I'm the creator of this Web-App.`,
      `You will find a lot of different,`,
      `selfmade content in here`, 
      `so turn on, tune in & enjoy ;-)`
    ]
    : [
    `Hi Stranger & welcome to SUP2FREDY!`, 
    `My name is, well ... Fredy & I'm the creator of this Web-App.`,
    `You will find a lot of different selfmade content in here`, 
    `so turn on, tune in & enjoy ;-)`
  ]
  const top1 = useRef(null)
  return <><div ref={top1} className='absolute top-0'/>
    {displayMagic && screen.width > 110 && <div className={`fixed top-0 z-90 flex justify-center items-center bg-black w-full ${isLandingPage ? 'opacity-100 h-full' : 'opacity-0 h-0'}`}>
      <div className=''>
        <MagicText lineArr={introText}>
          <div onClick={() => { 
              setTimeout(() => setdisplayMagic(false), 1000)
              setisLandingPage(false)
              top1.current.scrollIntoView() 
            }}
            className={`
              text-xl inset-x-1/2 absolute -ml-20 z-40 
              rounded-3xl h-12 w-40 duration-300
              hover:mb-1 active:mb-0 mb-0 pb-0.5 -bottom-20 hover:text-white text-gray-700
              hover:border-white font-serif textShadow hover:bg-opacity-0 bg-black 
              bg-opacity-90 border-4 border-gray-700 flex items-center justify-center 
              cursor-pointer`}>
                  <div>continue</div>
          </div>
        </MagicText>
      </div>
    </div>}
    <div className={`w-full md:w-10/12 max-w-4xl mx-auto px-1 transition-opacity duration-1000 ${!isLandingPage ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
      <h1 className='text-4xl sm:text-6xl xl:text-7xl font-cursive textShadow-lg text-white font-extrabold mx-auto w-max my-3 sm:mb-6 sm:mt-8 xl:mb-10 xl:mt-12'>SUP2FREDY</h1>
      <HomeMenuTiles />
      <div className='mb-20 center px-4'>
        <div className='text-white text-sm backdrop bg-opacity-60 bg-black w-fit p-1'>You can click &apos;add to Homescreen&apos; in your Web-Browser to install this Blog as an App (PWA) on your phone.</div>
      </div>
      {/* <ul className='font-extralight text-white text-sm backdrop bg-opacity-60 bg-black my-4 mx-auto w-full sm:w-11/12 p-2 px-3 rounded-xl ring-2 ring-gray-600'>
        <li>All content as well as the Website itself is made by Frederik Schoof.</li>
        <li>Background-Images are licence-free from <a href='https://pixabay.com/' target='_blank'>@pixabay</a></li>
        <li>Icons are licence-free from <a href='https://react-icons.github.io/react-icons' target='_blank'>@react-icons</a></li>
      </ul> */}
      {/* <div onClick={() => { setdisplayMagic(true); setisLandingPage(true) }} className='text-white'>showMaagic</div> */}
    </div>
  </>
}
