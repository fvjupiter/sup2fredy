import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { continueAtStates, isLandingPageState, isShowMenuState, scrollTopState, isInfoState, allowScrollState, trackListState, displayMagicState } from '../../lib/states'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import ScrollToTop from '../../lib/ScrollToTop';
import ScreenObserve from '../../lib/ScreenObserve';
import HeadMeta from '../../lib/HeadMeta';
import Background from '../../lib/Background';

import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Footer from '../footer/Footer'
import MusicPlayer from '../MusicPlayer';
import Imprint from './Imprint';

export default function Layout({ children }) {
    // const displayMagic = useRecoilValue(displayMagicState)
    const router = useRouter()
    const asPath = router.asPath
    const goBackPath = asPath.split('/').slice(0, -1).join('/')
    const param1 = asPath.split('/')[1]

    const [showInstaAlert, setshowInstaAlert] = useState(true)
    useEffect(() => {
        if(showInstaAlert && navigator.userAgent.includes("Instagram")) {
            setshowInstaAlert(false)
            alert('Dear Instagram-User, please open the app in an external browser at\nsup2fredy.vercel.app\n💖\nSincerely, Fredy')
        }
    }, [asPath])

    const handleFullscreen = useFullScreenHandle()

    const [continueAt, setcontinueAt] = useRecoilState(continueAtStates)
    const [isLandingPage, setisLandingPage] = useRecoilState(isLandingPageState)
    const [isShowMenu, setisShowMenu] = useRecoilState(isShowMenuState)
    const trackList = useRecoilValue(trackListState)
    const [isImprint, setisImprint] = useState(false)

    useEffect(() => setisLandingPage(true), [])

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
        <HeadMeta />
        <FullScreen handle={handleFullscreen}>
            <ScreenObserve />
            <Imprint isImprint={isImprint} setisImprint={setisImprint}/>
            <TopBar handleFullscreen={handleFullscreen}/>
            <Page isLandingPage={isLandingPage} setisImprint={setisImprint}>
                {children}
                {trackList && <div className={`${param1 == 'music' ? 'visible' : 'hidden'}`}><MusicPlayer trackList={trackList} /></div>}
            </Page>
            <Background />
            <BottomBar handleFullscreen={handleFullscreen}/>
        </FullScreen>
    </>
}

const Page = ({ isLandingPage, setisImprint, children }) => {
    const router = useRouter()
    const asPath = router.asPath
    const param1 = asPath.split('/')[1]

    const top = useRef(null)
    const [scrollTop, setscrollTop] = useRecoilState(scrollTopState)
    const setisInfo = useSetRecoilState(isInfoState)
    const setisShowMenu = useSetRecoilState(isShowMenuState)
    const setScrollTop = () => {
        const newScrollTop = top.current.scrollTop
        const isScrollDown = newScrollTop > scrollTop
        setisShowMenu(scrollTop > 0 && isScrollDown ? false : true)
        setscrollTop(newScrollTop)
        setisInfo(false)
    }
    return (
        <div ref={top} onScroll={setScrollTop} className={`fixed top-0 left-0 right-0 bottom-0 ${!isLandingPage ? 'overflow-scroll' : 'overflow-hidden'} z-10`}>
            <ScrollToTop />
            <div className={`min-h-screen ${(param1 == 'writings') && 'pt-[58px]'}`}>
                {children}
            </div>
            {param1 != 'about' && <Footer setisImprint={setisImprint}/>}
        </div>
    )
}
