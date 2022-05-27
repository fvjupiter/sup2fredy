import React, { useEffect, useState } from 'react'
import PreviewCards from '../../components/PreviewCards'

export default function Games() {
    const apps = [
        {
            slug: 'mathgame',
            fields: {
                title: 'Mathgame',
                slug: 'mathgame',
            }
        }
    ]
    return <PreviewCards 
        title='Software'
        data={apps}
        folder={'software'}
        ringColor={'ring-pink-400'}
    />
}
