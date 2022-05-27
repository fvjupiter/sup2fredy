import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
// var showdown  = require('showdown'),
//     converter = new showdown.Converter()

export default function Slide({ boxList, currentBoxId, boxIdHandler, isBox_chosen, isBoxChosenHandler, height, width, isDirectScroll, borderRadius_click, borderRadius_norm, directScroll_scale, scale_norm, isShadow }){
    const treshold = width / 8
    const borderRadiusNorm = borderRadius_norm ? borderRadius_norm : 0 // 0 if backdrop!
    const borderRadiusClick = borderRadius_click ? borderRadius_click : 24
    const directScrollScale = directScroll_scale ? directScroll_scale : 0.93
    const scaleNorm = scale_norm
    const scaleHover = isDirectScroll ? directScrollScale : 0.97
    const scaleClick = isDirectScroll ? directScrollScale : 0.93
    const isScaleOnSwipe = !isDirectScroll
    const duration = 0.35
    const stiffnessClick = 175
    const dragElastic = 0.175
    const backgroundWrapStyles = {} // will be passed to styles
    const barStyles = {}
    const boxStyles = {}
    const endless = false // may delete

    //controls 
    const controlsWrap = useAnimation()
    const controlsBar = useAnimation()
    const controlsBox = useAnimation()

    //states
    const [boxId, setboxId] = useState(0)
    const setBoxId = newId => {
        setboxId(newId)
        boxIdHandler(newId)
    }

    useEffect(() => {
        if(isBox_chosen){
            setBarPosition(currentBoxId * -width)
            setisBoxChosen(isBox_chosen)
        }
    }, [isBox_chosen])

    useEffect(() => {
        setBarPosition(currentBoxId * -width)
        setboxId(currentBoxId)
        setIsBoxChosen(true)
    }, [currentBoxId])

    useEffect(() => {
        scaleBoxNorm()
        setisScroll(isDirectScroll ? true : false)
        setBarPosition(boxId * -width)
    }, [boxId])

    const [isScroll, setisScroll] = useState(isDirectScroll ? true : false)
    const [isBarMove, setisBarMove] = useState(false)
    const [isGrabbing, setisGrabbing] = useState(false)

    const [barPosition, setbarPosition] = useState(0)
    const setBarPosition = newPos => { 
        controlsBar.start({ x: newPos })
        setbarPosition(newPos)
    }

    const [isBoxChosen, setisBoxChosen] = useState(true)
    const setIsBoxChosen = bool => {
        setisBoxChosen(bool)
        isBoxChosenHandler(bool)
    }

    const scaleBoxNorm  = () => controlsBox.start({ scale: isDirectScroll ? directScrollScale : scaleNorm, borderRadius: borderRadiusNorm })
    const scaleBoxHover = () => controlsBox.start({ scale: scaleHover,  borderRadius: borderRadiusClick })
    const scaleBoxClick = () => controlsBox.start({ 
        scale: scaleClick, 
        borderRadius: borderRadiusClick,
        transition: { type: 'spring', stiffness: stiffnessClick,  mass: 0.1, }
    }) 

    //gesture-trigger functions
    const panEndBar = (event, info) => {
        setTimeout(() => setisBarMove(false), 1)
        const offX = info.offset.x
        const hitTreshold = offX > treshold || offX < -treshold
        const moveNext = offX < 0
        const isFirst = boxId == 0
        const isLast = boxId == boxList.length-1
        const nextIsFirst = isLast && endless && moveNext
        const previousIsLast = isFirst && endless && !moveNext
        const newBarPos = nextIsFirst ? 0
                    : previousIsLast ? (boxList.length-1) * -width
                    : moveNext ? barPosition - width 
                    : barPosition + width
        const forbidden = !endless && !isScroll
                    && (isFirst && !moveNext) 
                    || (isLast && moveNext)

        if(!isScroll && hitTreshold && !forbidden){
            scaleBoxNorm()
            setBarPosition(newBarPos)
            setBoxId(
                nextIsFirst ? 0
                : previousIsLast ? boxList.length-1
                : moveNext ? boxId + 1 : boxId - 1
            )
            setisScroll(false)
        } else if(!isScroll) { 
            scaleBoxNorm()
            setBarPosition(barPosition)
            setBoxId(boxId)
            setisScroll(false)
        }
    }

    //styles
    const sty = {
        backgroundWrap: { 
            height: height, 
            width: width,
            borderRadius: borderRadiusNorm,
            position: 'absolute',
            // overflow: isDirectScroll ? 'visible' : 'hidden',
            overflow: 'visible',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            // backgroundColor: 'white',
            touchAction: 'none',
            ...backgroundWrapStyles,
        },
        bar: { 
            height: height,
            width: isScroll ? width * (boxList.length) : width * 3,  
            marginLeft: isScroll ? 0 : -width + (-barPosition), 
            justifyContent: isScroll ? 'center' 
                : boxId == 0 ? 'flex-end' 
                : boxId == boxList.length-1 ? 'flex-start' 
                : 'center',
                top: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            touchAction: 'none',
            // background: 'white',
            ...barStyles
        },
        box: {
            position: 'relative',
            height: height, 
            width: width,
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            overflow: 'hidden',
            boxShadow: !isDirectScroll && isShadow && '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)', //makes flow worse
            // boxShadow: isDirectScroll ? '0 62.5px 125px -25px rgba(0, 0, 0, 1), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.8)'
            // : '0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6)',
            // boxShadow: '0 8px 7px -2px rgba(0, 0, 0, 1), 0 3px 5px -2px rgba(0, 0, 0, 1)',
            touchAction: 'none',
            transition: 'border 0.2s, outline 0.2s, backgroundColor 0.2s',
            ...boxStyles
        }
    }
    
    //components (function which returns elements to not always render again...)
    const getBox = ({ val, index }) => <div key={index} style={{ transition: '0.3s' }}>
        <div 
            style={{ 
                zIndex: 2, 
                height: height, 
                width: width, 
                position: 'absolute',
                cursor: isGrabbing ? 'grabbing' : 'grab',
            }} 
            onMouseDown={() => setisGrabbing(true)}
            onMouseUp={() => setisGrabbing(false)}
            onMouseOut={() => setisGrabbing(false)}
            onClick={() => { if(isScroll && !isBarMove) {
                setIsBoxChosen(true)
                setBoxId(index) 
                scaleBoxNorm()
                setBarPosition(index * -width)
                if(!isDirectScroll) setisScroll(false)

            } else if(!isBarMove) { if(!isDirectScroll) setisScroll(true); scaleBoxClick() }
        }}/>
        <motion.div 
            animate={controlsBox} 
            transition={{ duration: duration }}
            style={{...sty.box,
                display: !isScroll 
                    && (index > boxId + 1 || index < boxId - 1) ? 'none' : 'block',
                zIndex: index == boxId && 1,
                border: isDirectScroll && boxId == index && isBoxChosen && '4px solid white'
            }}
            className={`${isDirectScroll && boxId == index && isBoxChosen && 'ring-2 ring-cyan-400 shadow-inner-xl'}`} //only with TailwindCSS
            // className={`bg-black bg-opacity-90 text-white py-2 px-4 whitespace-pre-line text-justify text-lg sm:text-2xl font-extralight`}
            >
                {/* <div dangerouslySetInnerHTML={{ __html: val }} /> */}
                {val}
        </motion.div>
    </div>

    return <>
        <div 
            style={sty.backgroundWrap}
            animate={controlsWrap}
            transition={{ duration: duration }}
            >
            <motion.section 
                style={sty.bar}
                animate={controlsBar}
                transition={{ duration: duration }}
                dragDirectionLock
                drag='x'
                dragConstraints={{ 
                    left: isScroll ? -width * (boxList.length-1) : -width + -width * boxId, 
                    right: isScroll ? 0 : width + (-width * boxId),
                    top: 0, 
                    bottom: 0 
                }} 
                dragElastic={dragElastic}
                onPanStart={() => { 
                    setisBarMove(true); if(isScaleOnSwipe) scaleBoxClick()
                }}
                onDragStart={() => setIsBoxChosen(false)}
                onPanEnd={panEndBar}
                onHoverStart={!isScroll && scaleBoxHover}
                onHoverEnd={!isScroll && scaleBoxNorm}
                >
                    {!isScroll && endless && getBox({ val:'go to last', index: -1 })}
                    {boxList.map((val, index) => getBox({ val, index }))}
                    {!isScroll && endless && getBox({ val:'go to first', index: boxList.length })}
            </motion.section>
        </div>
    </>
}
