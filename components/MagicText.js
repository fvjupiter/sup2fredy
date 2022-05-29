import React, {useState, useEffect } from 'react'
import styles from '../styles/MagicText.module.css'

export default function MagicText({ lineArr, children }) {
    const [showChildren, setshowChildren] = useState(false)
    const [isAni, setisAni] = useState(true)
    useEffect(() => {
      setshowChildren(true)
      const timeO = setTimeout(() => setisAni(false) , lineArr.length * 1500)
      return () => clearTimeout(timeO)
    }, [])

    const Line = ({ line, delay }) => {
      const charArr = line.split('')
      let letterDelay = 0
      const spanArr = charArr.map(char => {
          const spanSty = {
              color: 'white',
              top: isAni ?  random(-1000, 1000) : 0,
              left: isAni ?  random(-1000, 1000) : 0,
              animationDelay: delay+letterDelay+'ms',
          }
          letterDelay += 20
          return <span 
            key={char + random(0,10000)} 
            style={spanSty} 
            className={`h-fit w-fit min-w-[10px] flex top-0 left-0 m-0 p-0 relative ${isAni && styles.ani}
              font-cursive text-xl sm:text-2xl md:text-3xl lg:text-4xl`}
              >{char}
          </span>
      })
      return <div className='flex'>{spanArr}</div>
    }

    const getLines = (lineArr) => lineArr.map((line, index) => (
      <div key={index} className='flex justify-center my-1 sm:my-2 md:my-3 xl:my-4'>
        <Line index={index} line={line} delay={index* 750} />
      </div>
    ))

    return <>
      <div className={`whitespace-pre-wrap z-10`}>
        {getLines(lineArr)}
        {children && <div 
          className={`${showChildren ? 'opacity-100 w-56 scale-100' : 'opacity-0'} 
            duration-[5000ms] ease-in-out mx-auto hover:opacity-100`}
          >{children}
        </div>}
      </div>
    </>
}

const random = (min, max) => (Math.floor(Math.random() * (max-min))) + min
