import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { continueAtStates } from '../../lib/states'
import Image from 'next/image'
import { bg_writings, bg_music, bg_software, bg_shop } from '../../lib/bg'
import Fredy from '../../public/img/fredyCrop.jpeg'
import Hacker from '../../public/img/hacker.jpg'
import { useRecoilValue } from 'recoil';
import Link from 'next/link'
import { Icon } from '../../lib/icons'

export default function HomeMenuTiles() {
    const router = useRouter()
    const asPath = router.asPath
    const goBackPath = asPath.split('/').slice(0, -1).join('/')

    const [isClicked, setisClicked] = useState(-1)
    useEffect(() => setisClicked(-1), [])
    const continueAt = useRecoilValue(continueAtStates)

    const navItems = [
        [continueAt.writings, 'Writings', <Icon key={'0'} id={'writings'} size={70}/>, 'border-lime-400', 'text-lime-400', 
            continueAt.writings.includes('poems') ? bg_writings.poems 
            : continueAt.writings.includes('notes') ? bg_writings.notes 
            : continueAt.writings.includes('stories') ? bg_writings.stories 
            : bg_writings.menu, 
        'Poems, Notes & Stories'],
        [continueAt.music, 'Music', <Icon key={'1'} id={'music'} size={70}/>, 'border-orange-400', 'text-orange-400', bg_music.menu, 'Stream'],
        [continueAt.software, 'Software', <Icon key={'2'} id={'software'} size={70}/>, 'border-pink-400', 'text-pink-400', bg_software.menu, 'Click-Games'],
        [continueAt.about, 'About Me', <Icon key={'3'} id={'about'} size={70}/>, 'border-purple-400', 'text-purple-400', Fredy, 'Background'],
        // [continueAt.shop, 'Shop', <Icon key={'4'} id={'shop'} size={70}/>, 'border-cyan-400', 'text-cyan-400', 
        //     continueAt.shop.includes('web-service') ? bg_shop.web 
        //     : continueAt.shop.includes('art') ? bg_shop.art  
        //     : continueAt.shop.includes('nft') ? bg_shop.nft  
        //     : continueAt.shop.includes('merch') ? bg_shop.merch  
        //     : bg_shop.menu ,
        //  "Web-Service, ..."],

    ]
    
    return <>
        <div className="relative w-full">
                {navItems.map((item, index) => (
                    <NavItem key={index} index={index} 
                        href={item[0]} 
                        title={item[1]} 
                        content={item[6]}
                        icon={item[2]}
                        border={item[3]} 
                        text={item[4]}
                        bgImg={item[5]}
                        ifClickedOpacity={index == isClicked && 'opacity-0'}
                        ifClickedScale={index == isClicked ? 'scale-[2]' : 'scale-[1.08] group-hover:scale-[1]'}
                        setisClicked={setisClicked}
                    />
                ))}
            <a href="https://synesthesigns.com/" 
                rel="noreferrer" 
                target='_blank'>
                <div onClick={() => { setisClicked(4); setTimeout(() => setisClicked(-1), 1000) }}
                    className='relative group w-full mx-auto py-2 mb-4 items-center flex justify-between
                                    transition-all duration-300
                                    ring-2 ring-gray-600 border-2 border-black hover:border-white cursor-pointer
                                    overflow-hidden
                                    '> 
                    <Image className={`opacity-50 group-hover:opacity-100 transform group-active:scale-[2] ${4 == isClicked ? 'scale-[2]' : 'scale-[1.08] group-hover:scale-[1]'} transition-all duration-300`}
                            src={Hacker}
                            placeholder="blur"
                            layout='fill' 
                            objectFit='cover'
                            objectPosition='center'
                        />
                    <div className={`absolute w-full mr-2 border-t-2 border-cyan-400 ${4 == isClicked && 'opacity-0'} group-active:opacity-0 transition-all duration-100 z-10 backdrop bg-opacity-60 bg-black px-3 py-1 flex items-center justify-between`}>
                        <div className='text-xs sm:text-lg font-bold synesthesigns'>Synesthesigns</div><div className='text-sm sm:text-lg font-extralight textShadow text-white'>Web-Service</div>
                    </div>
                    <div
                        className={`left-[106px] sm:left-32 md:left-40 z-20 bigMenu-icon group border-cyan-400 ${4 == isClicked && 'opacity-0'} text-cyan-400 shadow-4xl group-active:opacity-0 duration-100 border-2 backdrop bg-opacity-60 bg-black`}>
                        <Icon key={'4'} id={'code'} size={77} classN='group-hover:animate-spin-slow' />
                    </div>
                </div>
            </a>
        </div>
    </>
}

const NavItem = ({ index, href, title, content, icon, border, text, bgImg, ifClickedOpacity, ifClickedScale, setisClicked }) => {
    return <Link href={href}>
        <div onClick={() => { setisClicked(index) }}
             className='relative group w-full mx-auto py-2 mb-4 items-center flex justify-between
                             transition-all duration-300
                            ring-2 ring-gray-600 border-2 border-black hover:border-white cursor-pointer
                            overflow-hidden
                            '> 
            <Image className={`opacity-50 group-hover:opacity-100 transform group-active:scale-[2] ${ifClickedScale} transition-all duration-300`}
                    src={bgImg}
                    placeholder="blur"
                    layout='fill' 
                    objectFit='cover'
                    objectPosition='center'
                />
            <div className={`absolute w-full mr-2 border-t-2 ${border} ${ifClickedOpacity} group-active:opacity-0 textShadow text-white transition-all duration-100 z-10 backdrop bg-opacity-60 bg-black px-3 py-1 flex items-center justify-between`}>
                <div className='text-md sm:text-lg font-extralight'>{title}</div><div className='text-sm sm:text-lg font-extralight'>{content}</div>
            </div>
            <div
                className={`left-[106px] sm:left-32 md:left-40 z-20 bigMenu-icon group ${border} ${ifClickedOpacity} ${text} shadow-4xl group-active:opacity-0 duration-100 border-2 backdrop bg-opacity-60 bg-black`}>
                {icon}
            </div>
        </div>
    </Link>
}
