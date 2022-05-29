import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { screenState } from '../../lib/states'
import { useRecoilValue } from 'recoil'

export default function DirectLinkCard({ index, href, isClicked, title, img, ringHover, children }) {
  const screen = useRecoilValue(screenState)

  const getBoxTitle = () => <div className={`h-20 sm:h-full w-full sm:w-5/12 flex items-center justify-center overflow-hidden`}>
    <div className={`textShadow font-bold text-3xl pt-0.5 sm:pt-0 lg:text-4xl sm:text-2xl text-center text-white font-cursive`}>{title}</div>
  </div>
  const getBoxDes = border => <div className={`${border} ${isClicked && 'opacity-0'} h-48 sm:h-full w-full sm:w-7/12 px-6 py-3 md:px-10 md:py-5 md:pb-6 flex items-center text-white xl:text-lg md:text-base sm:text-sm font-extralight border-white group-active:opacity-0 duration-300 bg-black`}>
    {children}
  </div>

  return <a className='cursor-pointer' 
    href={href} 
    rel="noreferrer" 
    target='_blank'
    >
    <div className={`relative sm:flex h-68 sm:h-44 lg:h-56 w-full group cursor-pointer mx-auto overflow-hidden border-4 hover:border-white border-black ring-2 ${ringHover} ring-gray-600 hover:shadow-preview mt-4 duration-300`}>
        <Image className={`${isClicked ? 'scale-[2]' : 'scale-[1.08] group-hover:scale-[1]'} opacity-100 transform group-active:scale-[2] duration-300`}
          src={img}
          placeholder="blur"
          layout='fill' 
          objectFit='cover'
          objectPosition='center'
        /> 
        <div className={`w-full h-full relative sm:flex bg-black bg-opacity-60 group-hover:bg-opacity-0 z-10 duration-300`}>
          {index % 2 == 0 || screen.width < 640 ?
          <>
            {getBoxTitle()}
            {getBoxDes('border-t-4 sm:border-t-0 sm:border-l-4')}
          </>
          :
          <>
            {getBoxDes('sm:border-r-4')}
            {getBoxTitle()}
          </>
          }
        </div>
    </div>
  </a>
}
