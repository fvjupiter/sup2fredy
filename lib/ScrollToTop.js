import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

export default function ScrollTop() {
    const router = useRouter()
    const top = useRef(null)
    useEffect(() => top.current.scrollIntoView(), [router])
  return <div ref={top} className='absolute top-0'/>
}
