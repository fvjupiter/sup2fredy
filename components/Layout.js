import React, { useState, useEffect, useRef } from 'react'
import Head from "next/head";
import { useRouter } from 'next/router'
import { screenState, continueAtStates, isLandingPageState, isShowMenuState, scrollTopState, isInfoState } from '../lib/states'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Image from 'next/image'
import { useRecoilState, useSetRecoilState } from 'recoil';
import ScrollToTop from './ScrollToTop';
import { bg_home, bg_writings, bg_music, bg_software, bg_about, bg_shop, bg_placeholderImg } from '../lib/bg'


export default function Layout({ children }) {
    const screenRef = useRef()
    const [screen, setscreen] = useRecoilState(screenState)
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setscreen({ width: entries[0].contentRect.width, height: entries[0].contentRect.height })
        })
        observer.observe(screenRef.current)
        return () => screenRef.current && observer.unobserve(screenRef.current)
    }, [])
    const router = useRouter()
    const pathname = router.pathname
    const asPath = router.asPath
    const goBackPath = asPath.split('/').slice(0, -1).join('/')

    const handleFullscreen = useFullScreenHandle()

    const [bgImg, setbgImg] = useState(bg_home.menu)
    const [continueAt, setcontinueAt] = useRecoilState(continueAtStates)
    const [isLandingPage, setisLandingPage] = useRecoilState(isLandingPageState)
    const [isShowMenu, setisShowMenu] = useRecoilState(isShowMenuState)

    useEffect(() => setisLandingPage(true), [])

    useEffect(() => {
        switch (pathname.split('/')[1]) {
            case '': setbgImg(bg_home.menu); break;
            case 'writings': setbgImg(
                    pathname.includes('poems') ? bg_writings.poems
                    : pathname.includes('notes') ? bg_writings.notes 
                    : pathname.includes('stories') ? bg_writings.stories 
                    : bg_writings.menu
                ); break;
            case 'music': setbgImg(bg_music.menu); break;
            case 'software': setbgImg(bg_software.menu); break;
            case 'about': setbgImg(bg_about.menu); break;
            case 'shop': setbgImg(
                pathname.includes('web-service') ? bg_shop.web 
                    : pathname.includes('art') ? bg_shop.art
                    : pathname.includes('nft') ? bg_shop.nft 
                    : pathname.includes('merch') ? bg_shop.merch  
                    : bg_shop.menu
                ); break;
            default: setbgImg(bg_home.menu); break;
        }
    }, [pathname])

    useEffect(() => {
        setcontinueAt({
            ...continueAt,
            [`${asPath.split('/')[1] === '' ? 'home' : asPath.split('/')[1]}`]: asPath
        })
        if(!isShowMenu){
            if(asPath.split('/')[1] === '' && isLandingPage){
                setisShowMenu(false)
            } else setisShowMenu(true)
        }
        if(asPath.split('/')[1] != '') setisLandingPage(false)
    }, [router])

    return <>
        <Head>
            <title>SUP2FREDY</title>
            <meta name="SUP2FREDY" content="" />
            <link rel="icon" type="image/png" href="/img/pinkSpiral.jpg" />
            <link
                rel="preload"
                href="/fonts/CinzelDecorative-Regular.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/CinzelDecorative-Bold.ttf"
                as="font"
                crossOrigin=""
            />
            <link
                rel="preload"
                href="/fonts/CinzelDecorative-Black.ttf"
                as="font"
                crossOrigin=""
            />
        </Head>
        <FullScreen handle={handleFullscreen}>
            <div className='h-screen w-screen fixed z-[-10]' ref={screenRef}/>
            <TopBar handleFullscreen={handleFullscreen}/>
            <Page>{children}</Page>
            <div className='top-0 left-0 right-0 bottom-0 absolute z-0 bg-black'>
                {bgImg && <Image 
                    src={bgImg}
                    placeholder="blur"
                    blurDataURL={bg_placeholderImg}
                    layout='fill' 
                    objectFit={'cover'}
                    objectPosition='center'
                />}
            </div>
            <BottomBar/>
        </FullScreen>
    </>
}

const Page = ({ children }) => {
    const top = useRef(null)
    const [scrollTop, setscrollTop] = useRecoilState(scrollTopState)
    const [isInfo, setisInfo] = useRecoilState(isInfoState)
    // const screen = useRecoilValue(screenState)
    const setisShowMenu = useSetRecoilState(isShowMenuState)
    const setScrollTop = () => {
        const newScrollTop = top.current.scrollTop
        const isScrollDown = newScrollTop > scrollTop
        setisShowMenu(scrollTop > 0 && isScrollDown ? false : true)
        setscrollTop(newScrollTop)
        setisInfo()
    }
    return <div ref={top} onScroll={setScrollTop} className='fixed top-0 left-0 right-0 bottom-0 pt-[58px] pb-[500px] overflow-scroll z-10 '>
        <ScrollToTop />
        {children}
    </div>
}
