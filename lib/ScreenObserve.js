import React, { useRef, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { screenState } from './states'

export default function ScreenObserve() {
    const screenRef = useRef()
    const setscreen = useSetRecoilState(screenState)
    useEffect(() => {
        const observer = new ResizeObserver(entries => {
            setscreen({ width: entries[0].contentRect.width, height: entries[0].contentRect.height })
        })
        observer.observe(screenRef.current)
        return () => screenRef.current && observer.unobserve(screenRef.current)
    }, [])
  return <div className='h-screen w-screen fixed z-[-50]' ref={screenRef}/>
}
