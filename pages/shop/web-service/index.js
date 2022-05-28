import React from 'react'
import PreviewSlide from '../../../components/PreviewSlide'
import Image from 'next/image'
import Link from 'next/link'
import { bg_home, bg_writings, bg_music, bg_software, bg_about, bg_shop, bg_placeholderImg } from '../../../lib/bg'
import Diamond from '../../../public/img/diamond.jpg'
import PageTitle from '../../../components/PageTitle'
import { screenState } from '../../../lib/states'
import { useRecoilValue } from 'recoil'
import Pricing from '../../../components/Pricing'

export default function Webservice() {
  const screen = useRecoilValue(screenState)
  return <>
    <div className='h-screen'><PreviewSlide data={templateData} /></div>
    <div className='h-screen'><Pricing data={pricingData} boxId={0}/></div>
      
  </>
}
const pricingData = [
  {
    title: 'Step-by-Step',
    types: ['(Homepages, Portfolios, Blogs)'],
    included: ['Step-By-Step Tutorial', 'Fully customizable'],
    extras: [['CMS-Setup & Upload Support', 50], ['Install-Function', 100], ['Individual Logo', 100]],
    sections: ['Pages', '∞', 0, 0],
    price: 29,
  },
  // {
  //   title: 'App-Editor',
  //   types: ['(Homepages, Portfolios, Blogs)'],
  //   included: ['1 / 5 Templates (customizable)', 'Step-By-Step Manual', 'Mobile & Desktop Version'],
  //   extras: [['CMS-Setup & Upload Support', 50], ['Install-Function', 100], ['Individual Logo', 100]],
  //   sections: ['Pages', '∞', 0, 0],
  //   price: 29,
  // },
  {
    title: 'Basic',
    types: ['(Homepages, Portfolios, Blogs)'],
    included: ['Individual Design', 'Mobile & Desktop Version', 'Content-Management-System'],
    extras: [['Install-Function', 100], ['Comment-Function', 150], ['Individual Logo', 100]],
    sections: ['Pages', 1, 50],
    price: 399,
  },
  // {
  //   title: 'Game',
  //   types: ['(Click-Games, Text-Adventure)'],
  //   included: ['ALL FROM BASIC', 'Game-Settings', 'Game-Controls'],
  //   extras: [['Install-Function', 150], ['User-Authentication', 400], ['Individual Logo', 100]],
  //   sections: ['Complexity', 1, 200],
  //   price: 449,
  // },
  {
    title: 'Network',
    types: ['(Community, User-Platform)'],
    included: ['ALL FROM BASIC', 'User-Authentication', 'User-Dashboard', 'Save-Posts-Function'],
    extras: [['Install-Function', 150], ['User-Post-Feed-System', 300], ['Like-Comment-System', 300], ['Individual Logo', 100]],
    sections: ['Pages', 1, 150],
    price: 849,
  },
  // {
  //   title: 'E-Commerce',
  //   types: ['(Shops)'],
  //   included: ['ALL FROM BASIC', 'User-Authentication', 'Dashboard'],
  //   extras: [['Rating-Comment-System', 400]],
  //   sections: ['Sections', 1, 150],
  //   price: 499,
  // },
  
]
const templateData = {
    titleArr: ['Portfolio', 'Blog', 'Company', 'Shop', 'Community'],
    boxList: [
      <Image className='z-0'
              key={'0'}
          src={bg_home.menu}
          placeholder="blur"
          blurDataURL={bg_placeholderImg}
          layout='fill' 
          objectFit='cover'
          objectPosition='center'
      />,
      <Image className='z-0'
              key={'1'}
              src={bg_music.menu}
              placeholder="blur"
              blurDataURL={bg_placeholderImg}
              layout='fill' 
              objectFit='cover'
              objectPosition='center'
      />,
      <Image className='z-0'
              key={'2'}
              src={bg_software.menu}
              placeholder="blur"
              blurDataURL={bg_placeholderImg}
              layout='fill' 
              objectFit='cover'
              objectPosition='center'
      />,
      <Image className='z-0'
              key={'3'}
              src={bg_shop.menu}
              placeholder="blur"
              blurDataURL={bg_placeholderImg}
              layout='fill' 
              objectFit='cover'
              objectPosition='center'
      />,
      <Image className='z-0'
              key={'4'}
              src={bg_shop.nft}
              placeholder="blur"
              blurDataURL={bg_placeholderImg}
              layout='fill' 
              objectFit='cover'
              objectPosition='center'
      />,
      <Image className='z-0'
              key={'5'}
              src={Diamond}
              placeholder="blur"
              blurDataURL={bg_placeholderImg}
              layout='fill' 
              objectFit='cover'
              objectPosition='center'
      />
    ]
}