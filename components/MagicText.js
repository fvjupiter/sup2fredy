import React, {useState, useEffect, useContext } from 'react'
import styles from '../styles/MagicText.module.css'

export default function MagicText({ lineArr, children }) {
    // const { isDark, homePageLoads } = useContext(ColorContext)
    const [isAni, setisAni] = useState(true)
    useEffect(() => {
      const timeO = setTimeout(() => setisAni(false) , lineArr.length * 1500)
      return () => clearTimeout(timeO)
    }, [])

    const Line = ({ index, line, delay }) => {
        const charArr = line.split('')
        let letterDelay = 0
        const spanArr = charArr.map(element => {
            const spanSty = {
                color: 'white',
                top: isAni ?  random(-1000, 1000) : 0,
                left: isAni ?  random(-1000, 1000) : 0,
                animationDelay: delay+letterDelay+'ms',
            }
            letterDelay += 20
            return (
                <span 
                    key={element + random(0,10000)} 
                    style={spanSty} 
                    className={`font-cursive ${styles.char} ${isAni ? styles.ani : ''}`} 
                >{element}</span>
            )
        });
        return <div style={{display: 'flex'}}>{spanArr}</div>
    }
    const getLines = (lineArr) => lineArr.map((line, index) => <div key={index} className='flex justify-center'>
      <Line index={index} line={line} delay={index* 750} />
    </div>)
    
    const getLinesWithoutAni = (lineArr) => {
      return lineArr.map((line, index) => <span key={index} 
          style={{color: 'white', margin: 'auto'}} 
          className={`serif ${styles.char}`}>{line}
        </span> 
      )
    }
    return (<>
      <div className={styles.wrapper}>
        {
        // homePageLoads > 1 ? getLinesWithoutAni(lineArr) : 
        getLines(lineArr)}
        {children && <div className={`${!isAni ? 'opacity-100 w-56 scale-100' : 'opacity-0 w-full scale-0'} duration-1000 ease-in-out mx-auto hover:opacity-100`}>{children}</div>}
      </div>
    </>)
}
function random(min, max){
    return (Math.floor(Math.random() * (max-min))) + min;
  }
