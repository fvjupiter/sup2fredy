import React, { useEffect } from 'react';
import PreviewCard from '../../../components/PreviewCard'
import PageTitle from '../../../components/PageTitle'

export default function Singles({ singles }) { 
  console.log('singles: ', singles)
console.log('audioURL: ', singles[0].attributes.audio.data[0].attributes.url)

  let audio
  const start = () => audio.play()
  const stop = () => audio.pause()
  useEffect(() => {
    audio = new Audio(`http://localhost:1337${singles[0].attributes.audio.data[0].attributes.url}`)
  }, [])
  return <>
  <PageTitle title='Singles'/>
  <button onClick={start}>Playyyyy</button><br/>
  <button onClick={stop}>stop</button>
    <div className='w-screen text-center flex justify-center'>
        <div className='flex flex-wrap justify-center '>
            {singles.map(single => (
                <PreviewCard
                    key={single.id} 
                    href={`singles/${single.id}`}
                    title={single.attributes.title}
                    // date={single.attributes.date}
                    borderColor='ring-orange-400'
                />
            ))}
        </div>
    </div>
  </>
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:1337/api/singles?populate=audio") //ideally should be env.var
  const { data } = await res.json()
  console.log('singlesData ',data)
  return{
    props: { singles: data }
  }
}
