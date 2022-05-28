import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { continueAtStates, isInfoState, isShowMenuState } from '../../lib/states'
import { useRecoilState, useRecoilValue } from 'recoil';
import Link from 'next/link'
import { Icon } from '../../lib/icons'

export default function BottomBar() {
    const router = useRouter()
    const pathname = router.pathname
    const asPath = router.asPath
    const goBackPath = asPath.split('/').slice(0, -1).join('/')
    const isHome = pathname.split('/')[1] == ''
    const param1 = asPath.split('/')[1]
    const param2 = asPath.split('/')[2]
    const param3 = asPath.split('/')[3]

    const [isInfo, setisInfo] = useRecoilState(isInfoState)
    const isShowMenu = useRecoilValue(isShowMenuState)
    const [isDelay, setisDelay] = useState(true)
    useEffect(() => {
        setisDelay(false)
        setTimeout(() => setisDelay(true), 300);
    }, [isInfo])
    
    const isSmall = !isInfo && (isHome || param2 == 'mathgame')
    const continueAt = useRecoilValue(continueAtStates)

    const iconClassName = `${!isSmall ? 'scale-100' : 'scale-0'} transition-transform duration-300`
    const navItems = [
        [continueAt.writings, 'Writings', <Icon key={'0'} id='writings' classN={iconClassName} size={70}/>, 'hover:bg-lime-400 border-lime-400', 'bg-lime-400 hover:shadow-inner-none shadow-none text-white', 'text-lime-400'],
        [continueAt.music, 'Music', <Icon key={'1'} id='music' classN={iconClassName} size={70}/>, 'hover:bg-orange-400 border-orange-400', 'bg-orange-400 hover:shadow-inner-none shadow-none text-white', 'text-orange-400'],
        [continueAt.software, 'Software', <Icon key={'2'} id='software' classN={iconClassName} size={70}/>, 'hover:bg-pink-400 border-pink-400', 'bg-pink-400 hover:shadow-inner-none shadow-none text-white', 'text-pink-400'],
        [continueAt.about, 'About', <Icon key={'3'} id='about' classN={iconClassName} size={70}/>, 'hover:bg-purple-400 border-purple-400', 'bg-purple-400 hover:shadow-inner-none shadow-none text-white', 'text-purple-400'],
        [continueAt.shop, 'Shop', <Icon key={'4'} id='shop' classN={iconClassName} size={70}/>, 'hover:bg-cyan-400 border-cyan-400', 'bg-cyan-400 hover:shadow-inner-none shadow-none text-white', 'text-cyan-400'],
    ]

    return <>
        <div className={`z-20 fixed ${isShowMenu || isInfo ? 'bottom-0' : 'bottom-[-85px]'} ${isDelay && 'transition-all duration-500 ease-in-out delay-200'} w-min inset-x-2/4 ${!isInfo ? 'ml-[-144px]' : 'ml-[-186px]'} flex justify-center transition-all duration-300`}
            >
            <div className={`${isInfo ? 'h-[132px] w-[370px] ring-white shadow-4xl p-2' 
                            : isSmall ? 'h-5 w-72 p-1' 
                            : 'h-16 w-72 p-2'}
                            mb-3 transition-all duration-300
                            rounded-2xl flex items-end justify-between 
                            ring-2 ring-gray-600 backdrop bg-opacity-30 bg-black`}
                > 
                <Link href={'/'}>
                    <div onClick={() => setTimeout(() => setisInfo(false), 300)}
                        className={`${!isInfo && 'opacity-0 scale-0'} absolute top-[3px] left-0 textShadow font-cursive text-xl font-bold px-2 py-1
                        cursor-pointer text-white transition-all duration-300`}
                        >SUP2FREDY
                    </div>
                </Link>
                {navItems.map((item, index) => (
                    <NavItem 
                        key={index}
                        index={index} 
                        href={
                            item[0] == asPath && param1 ? `${item[0].split('/').slice(0, -1).join('/')}` //goBack one
                            : item[0] //dont go back
                        }
                        title={item[1]} 
                        icon={item[2]}
                        colors={item[3]} 
                        ifClicked={item[0] == asPath || item[0] == goBackPath ? item[4] : 'bg-opacity-70 bg-black hover:shadow-none ' + item[5]} 
                    />
                ))}
            </div>
            <div onClick={() => setisInfo(true)}
                className={`p-2 absolute cursor-pointer ${isInfo && 'opacity-0 scale-0'} ${!isSmall ? 'right-[-40px] bottom-6' : 'right-[-40px] bottom-[3px]'} hover:text-white text-gray-200 transition-all duration-200`}>
                <Icon id='info' classN='ring-gray-600 rounded-full backdrop bg-black bg-opacity-30' size={22}/>
            </div>
            <div onClick={() => setisInfo(false)}
                className={`p-2 absolute cursor-pointer ${!isInfo && 'opacity-0 scale-0'} ${!isSmall ? 'right-[0px] top-0' : 'right-[-40px] bottom-[3px]'} hover:text-white text-gray-300 transition-all duration-200`}>
                <Icon id='close' size={22}/>
            </div>
        </div>
    </>
}

const NavItem = ({ index, href, title, icon, colors, ifClicked, setisClicked }) => {
    const router = useRouter()
    const [isInfo, setisInfo] = useRecoilState(isInfoState)
    const param2 = router.asPath.split('/')[2]
    const param3 = router.asPath.split('/')[3]
    const isHome = router.pathname.split('/')[1] == ''
    const isSmall = !isInfo && (isHome || param2 == 'mathgame')//(router.asPath.split('/')[3] || isHome) && !isInfo
    return <Link key={index} href={href}>
        <div onClick={() => setTimeout(() => setisInfo(false), 300)}
            className={`sidebar-icon group ${colors} active:shadow-inner-xl active:duration-100 border-2 ${ifClicked} ${isInfo ? 'h-12 w-12 p-1.5' : isSmall ? 'h-3 w-12 p-0' : 'h-12 w-12 p-1.5'}`}>
            <div className={`sidebar-tooltip group-hover:scale-100 ${isSmall && 'bottom-3'} ${isInfo && 'scale-100 bg-transparent shadow-none bottom-12 duration-300'}`}>
                {title}
            </div>
            {icon}
        </div>
    </Link>
}
