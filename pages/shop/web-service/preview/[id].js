import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
// import Preview from '../../../../components/templates/Preview'
import { Icon } from '../../../../lib/icons'
import { isShowMenuState, screenState } from '../../../../lib/states'

export default function Preview() {
    const screen = useRecoilValue(screenState)
    const [isShowMenu, setisShowMenu] = useRecoilState(isShowMenuState)
    useEffect(() => {
        setisShowMenu(false)
    }, [])
    useEffect(() => isShowMenu && setisShowMenu(false), [isShowMenu])
    
  return <>
    <div className={`z-50 top-0 fixed h-screen w-screen bg-white`}>
        <Link href={'/shop/web-service'}>
            <div className={`backdrop flex items-center bg-black rounded-bl-xl border-2 hover:border-white border-gray-400 duration-300 bg-opacity-60 justify-center h-16 w-16 cursor-pointer fixed top-0 right-0 z-100`}><Icon id={'close'} classN={`text-gray-400 hover:text-white duration-300`} size={70}/></div>
        </Link>
        <iframe src="http://localhost:3000/" height={screen.height} width={screen.width} title="description"></iframe>
    </div>
</>
}
