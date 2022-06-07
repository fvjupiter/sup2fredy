import React, { useState, useRef } from 'react';
import { BiPause, BiPlay, BiSkipPrevious, BiSkipNext, BiShuffle } from "react-icons/bi";
import { IoRepeatOutline } from "react-icons/io5";
import ReactPlayer from 'react-player'

export default function MusicPlayer({ trackList, width, height }) {
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
        const getRand = () => Math.floor(Math.random() * trackList.length)
        let randomId = getRand()
        while(randomId == id) {
            randomId = getRand()
        } 
        let newId = isShuffle ? randomId 
            : id < trackList.length -1 ? id+1 : 0
        setid(newId)
        setisPlaying(true)
    }
    const previous = () => {
        if(isReload && isPlaying){
            setisReload(false)
            setTimeout(() => setisReload(true), 1200)
            replay()
        } else setid(id > 0 ? id -1 : trackList.length -1)
    }

    const Button = ({ handle, classN, icon }) => (
        <button onClick={handle} className={classN}>{icon}</button>
    )

  return <div className='mx-auto max-w-max mt-4 bg-black rounded-2xl overflow-hidden bigShadow mb-20'>
        <ReactPlayer
            ref={playerRef}
            width={0}
            height={0}
            url={trackList[id].url} 
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
        <img src={`https:${trackList[id].image}`} className={`object-cover h-80 w-80 sm:h-96 sm:w-96 md:w-[500px] md:h-[500px]`}/>
        <div className='flex items-center justify-center ml-4'>
            <Button handle={toggleShuffle} classN={`mr-2 ${isShuffle ? 'text-cyan-300' : 'button-hover-white'}`} icon={<BiShuffle size={28}/>} />
            <Button handle={previous} classN={`button-hover-white`} icon={<BiSkipPrevious size={68}/>} />
            <Button handle={togglePlay} classN={`button-hover-white`} icon={isPlaying ? <BiPause size={80}/> : <BiPlay size={80}/>} />
            <Button handle={next} classN={`button-hover-white`} icon={<BiSkipNext size={68}/>} />
            <Button handle={toggleReplay} classN={`mr-2 ${isReplay ? 'text-cyan-300' : 'button-hover-white'}`} icon={<IoRepeatOutline size={32}/>} />
        </div>
        <div className='text-white'>
            {trackList.map((url, index) => (
                <div key={index} 
                    onClick={() => { setid(index); setisPlaying(true) }} 
                    className={`px-4 py-1 
                        ${index == trackList.length-1 && 'pb-2'} 
                        ${index == id ? 'bg-orange-500 text-white' : 'hover:bg-blueGray-800 button-hover-white'} 
                        cursor-pointer`}
                    >
                        {url.title}
                    </div>
            ))}
        </div>
  </div>
}
