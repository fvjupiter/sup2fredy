import React from 'react'
import Social from './Social'

export default function Footer({ setisImprint }) {
  return (
    <div className='center h-80 w-screen relative pb-10 z-10 text-white bg-black'>
        <div className='sm:text-lg text-gray-400 text-center'>
            <Social />
            <div className='font-medium'>© 2022 All Rights Reserved.</div>
            <div className='font-medium'>Powered by &nbsp;
              <a className='cursor-pointer font-medium synesthesigns' 
                href="https://synesthesigns.com/" 
                rel="noreferrer" 
                target='_blank'>
                  Synesthesigns
              </a>.
            </div>
            <div onClick={() => setisImprint(true)} className={`hover:text-gray-300 cursor-pointer font-medium`}>Imprint</div>
        </div>
    </div>
  )
}
