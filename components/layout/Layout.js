import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import { useRecoilState, useSetRecoilState } from 'recoil';
import { continueAtStates, isLandingPageState, isShowMenuState, scrollTopState, isInfoState } from '../../lib/states'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import ScrollToTop from '../../lib/ScrollToTop';
import ScreenObserve from '../../lib/ScreenObserve';
import HeadMeta from '../../lib/HeadMeta';
import Background from '../../lib/Background';

import BottomBar from './BottomBar';
import TopBar from './TopBar';
import Footer from '../footer/Footer'

export default function Layout({ children }) {
    const router = useRouter()
    const asPath = router.asPath
    const goBackPath = asPath.split('/').slice(0, -1).join('/')

    const handleFullscreen = useFullScreenHandle()

    const [continueAt, setcontinueAt] = useRecoilState(continueAtStates)
    const [isLandingPage, setisLandingPage] = useRecoilState(isLandingPageState)
    const [isShowMenu, setisShowMenu] = useRecoilState(isShowMenuState)

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
            <TopBar handleFullscreen={handleFullscreen}/>
            <Page>{children}</Page>
            <Background />
            <BottomBar/>
        </FullScreen>
    </>
}

const Page = ({ children }) => {
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
        <div ref={top} onScroll={setScrollTop} 
            className={`fixed top-0 left-0 right-0 bottom-0 
                overflow-scroll z-10`}
            >
            <ScrollToTop />
            <div className='min-h-screen pt-[58px]'>{children}</div>
            <Footer />
        </div>
    )
}
