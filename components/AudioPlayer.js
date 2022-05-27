import React, { useEffect, useState } from 'react';
import { BiPause, BiPlay, BiSkipPrevious, BiSkipNext, BiShuffle } from "react-icons/bi";

export default function AudioPlayer({ styles, urlArr }) {
    const [isPlaying, setisPlaying] = useState(false)
    const [index, setindex] = useState(0)
    const [audioArr, setaudioArr] = useState([])
    const [isReload, setisReload] = useState(true)
    const [isShuffle, setisShuffle] = useState(false)
    const toggleShuffle = () => setisShuffle(!isShuffle)
    const togglePlay = () => {
        if(!isPlaying) audioArr[index].play()
        else audioArr[index].pause()
        setisPlaying(!isPlaying)
    }
    const next = () => {
        audioArr[index].pause()
        let newIndex =  isShuffle ? 
                            Math.floor(Math.random() * urlArr.length) 
                        : index < urlArr.length -1 ? index+1 : 0
        setindex(newIndex)
        audioArr[newIndex].load()
        if(isPlaying){
            audioArr[newIndex].play()
        }
    }
    const previous = () => {
        if(isReload){
            setisReload(false)
            setTimeout(() => {
                setisReload(true)
            }, 1000)
            audioArr[index].load()
            if(isPlaying){
                audioArr[index].play()
            }
        } else {
            audioArr[index].pause()
            let newIndex = index > 0 ? index -1 : urlArr.length -1
            setindex(newIndex)
            audioArr[newIndex].load()
            if(isPlaying){
                audioArr[newIndex].play()
            }
        }
    }
    
    useEffect(() => {
        let audArr = urlArr.map(url => new Audio(url))
        setaudioArr(audArr)
    }, [])

  return <div className={styles}>
        <button onClick={toggleShuffle} className={`mr-2 ${isShuffle ? 'text-cyan-200' : 'button-hover-white'}`}><BiShuffle size={20}/></button>
        <button onClick={previous} className={`button-hover-white`}><BiSkipPrevious size={32}/></button>
        <button onClick={togglePlay} className={`button-hover-white`}>{isPlaying ? <BiPause size={44}/> : <BiPlay size={44}/>}</button>
        <button onClick={next} className={`button-hover-white`}><BiSkipNext size={32}/></button>
  </div>
}
