import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { bg_home, bg_writings, bg_music, bg_software, bg_about, bg_shop } from './bg'

export default function Background() {
    const router = useRouter()
    const pathname = router.pathname
    const [bgImg, setbgImg] = useState(bg_home.menu)
    
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
  return (
    <div className='top-0 left-0 right-0 bottom-0 absolute z-0 bg-black'>
        {bgImg && <Image
            src={bgImg}
            placeholder="blur"
            layout='fill' 
            objectFit={'cover'}
            objectPosition='center'
        />}
    </div>
  )
}
