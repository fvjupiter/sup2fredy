import React, { useEffect, useState, useRef } from 'react';
import { BiPause, BiPlay, BiSkipPrevious, BiSkipNext, BiShuffle } from "react-icons/bi";
import { IoRepeatOutline } from "react-icons/io5";
import ReactPlayer from 'react-player'

export default function AudioPlayer({ urls, width, height }) {
    const playerRef = useRef(null)
    const [id, setid] = useState(0)
    const [isPlaying, setisPlaying] = useState(false)
    const togglePlay = () => setisPlaying(!isPlaying)
    const [isReload, setisReload] = useState(true)
    const [isReplay, setisReplay] = useState(false)
    const toggleReplay = () => setisReplay(!isReplay)
    const replay = () => playerRef.current.seekTo(0)
    const [isShuffle, setisShuffle] = useState(false)
    const toggleShuffle = () => setisShuffle(!isShuffle)
    const next = () => {
        const getRand = () => Math.floor(Math.random() * urls.length)
        let randomId = getRand()
        while(randomId == id) {
            randomId = getRand()
        } 
        let newId = isShuffle ? randomId 
            : id < urls.length -1 ? id+1 : 0
            console.log(newId)
        setid(newId)
    }
    const previous = () => {
        if(isReload && isPlaying){
            setisReload(false)
            setTimeout(() => setisReload(true), 1200)
            replay()
        } else setid(id > 0 ? id -1 : urls.length -1)
    }

    const Button = ({ handle, classN, icon }) => (
        <button onClick={handle} className={classN}>{icon}</button>
    )

  return <div className='mx-auto max-w-max mt-4 bg-black rounded-2xl overflow-hidden bigShadow'>
        <ReactPlayer
            ref={playerRef}
             
            width={width}
            height={height}
            url={urls[id].url} 
            playing={isPlaying}
            onPlay={() => setisPlaying(true)}
            onPause={() => setisPlaying(false)}
            onEnded={() => {
                if(isReplay){
                    replay()
                    setisPlaying(false)
                    setTimeout(() => setisPlaying(true), 1)
                } else next()
            }}
        />
        <div className='flex items-center justify-center ml-4'>
            <Button handle={toggleShuffle} classN={`mr-2 ${isShuffle ? 'text-cyan-300' : 'button-hover-white'}`} icon={<BiShuffle size={28}/>} />
            <Button handle={previous} classN={`button-hover-white`} icon={<BiSkipPrevious size={68}/>} />
            <Button handle={togglePlay} classN={`button-hover-white`} icon={isPlaying ? <BiPause size={80}/> : <BiPlay size={80}/>} />
            <Button handle={next} classN={`button-hover-white`} icon={<BiSkipNext size={68}/>} />
            <Button handle={toggleReplay} classN={`mr-2 ${isReplay ? 'text-cyan-300' : 'button-hover-white'}`} icon={<IoRepeatOutline size={32}/>} />
        </div>
        <div className='text-white'>
            {urls.map((url, index) => <div key={index} onClick={() => { setid(index); setisPlaying(true) }} className={`px-4 py-1 ${index == urls.length-1 && 'pb-2'} ${index == id ? 'bg-orange-500 text-white' : 'hover:bg-blueGray-800 button-hover-white'} cursor-pointer`}>{url.title}</div>)}
        </div>
  </div>
}
