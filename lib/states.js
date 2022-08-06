import { atom } from 'recoil'

export const displayMagicState = atom({
    key: 'displayMagicState', 
    default: true 
})

export const isLandingPageState = atom({
    key: 'isLandingPageState', 
    default: true 
})

export const screenState = atom({
    key: 'screenState', 
    default: { width: 100, height: 100 } 
})

export const isInfoState = atom({
    key: 'isInfoState', 
    default: false 
})

export const isShowMenuState = atom({
    key: 'isShowMenuState', 
    default: false
})

export const scrollTopState = atom({
    key: 'scrollTopState', 
    default: 0 
})

export const totalCountState = atom({
    key: 'totalCountState', 
    default: 0 //amount of poems / ... 
})

export const slugListState = atom({
    key: 'slugListState', 
    default: {
        poems: [],
        notes: [],
        stories: []
    } //amount of poems / ... 
})

export const commentListState = atom({
    key: 'commentListState', 
    default: {
        poems: {},
        notes: {},
        stories: {}
    } //amount of poems / ... 
})

export const continueAtStates = atom({
    key: 'continueAtStates', 
    default: {
        home: '/',
        writings: '/writings',
        music: '/music',
        software: '/software',
        about: '/about',
        shop: '/shop',
    }, 
})

export const isFullscreenState = atom({
    key:'isFullscreenState',
    default: false
})

export const trackListState = atom({
    key:'trackListState',
    default: null
})

export const mathgameStates = atom({
    key:'mathgameStates',
    default: {
        player: [['Player', 0]], // List of Players: name, score
        difficulty: 1, //Level
        timePressure: 13,
        calculatedTimePressure: 17,
        mode: 'time',
        playtime: 60 //sec
    }
})
