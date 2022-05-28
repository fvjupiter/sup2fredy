import React, { useState, useEffect } from 'react'
import PageTitle from '../../components/PageTitle'
import MenuCards from '../../components/cards/MenuCards'
import { bg_shop, bg_placeholderImg } from '../../lib/bg'

export default function Shop() {
    return <>
        <PageTitle title={'Shop'}/>
        <MenuCards data={data} />
    </>
}

const data = [
    {
        href: '/shop/web-service',
        title: 'web-service',
        img: bg_shop.web,
        ringHover: 'hover:ring-cyan-400',
        childrenLi: <>
            <li><span className='font-bold'>Templates</span> for your next <span className='font-bold'>Web-App</span> (Website / Blog / Portfolio / ...)</li>
            <li>Easy-to-use <span className='font-bold'>Editor</span> to create your own design</li>
            <li><span className='font-bold'>Individual Solutions</span> for different purposes</li>
            <li><span className='font-bold'>Pricing</span></li>
        </>
    },
    {
        href: '/shop/art',
        title: 'art',
        img: bg_shop.art,
        ringHover: 'hover:ring-cyan-400',
        childrenLi: <>
            <li><span className='font-bold'>Poems</span> on plates &amp; posters with original artwork by <a>@Imke</a></li>
            <li><span className='font-bold'>E-Books</span></li>
            <li><span className='font-bold'>Music</span> (MP3&apos;s / CD&apos;s / LP&apos;s)</li>
            {/* <li><span className='font-bold'>Commissioned Work</span></li> */}
        </>
    },
    {
        href: '/shop/nft',
        title: 'nft-shop',
        img: bg_shop.nft,
        ringHover: 'hover:ring-cyan-400',
        childrenLi: <>
            <li>Unique digital <span className='font-bold'>Art</span></li>
        </>
    },
    {
        href: '/shop/merch',
        title: 'merch',
        img: bg_shop.merch,
        ringHover: 'hover:ring-cyan-400',
        childrenLi: <>
            <li><span className='font-bold'>T-Shirts</span></li>
            <li><span className='font-bold'>Hoodies</span></li>
            <li><span className='font-bold'>Frisbees</span> (official size / weight)</li>
        </>
    }
]