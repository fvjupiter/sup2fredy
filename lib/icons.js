import { BsCheck2, BsDash, BsGlobe, BsInfoCircle, BsX, BsFullscreen, BsFullscreenExit, BsMoon, BsSun, BsShop, BsWrench } from "react-icons/bs";
import { GiAllSeeingEye,GiSelfLove,GiSpellBook, GiGuitarBassHead, GiDiceTwentyFacesOne, GiAmplitude, GiAtSea,GiBowenKnot,GiBurningBook,GiCaduceus, GiComputing,GiGuitarHead,GiPickOfDestiny,GiSaloon,GiVortex, GiWireframeGlobe, GiDungeonGate, GiBrain } from "react-icons/gi";
import { BiLeftArrow, BiRightArrow, BiPause, BiPlay, BiSkipPrevious, BiSkipNext, BiShuffle } from "react-icons/bi";
import { IoRepeatOutline } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";

export const Icon = ({ id, size, classN }) => {
    let cN = classN ? classN : ''
    const iconObj = {
        writings: <GiSpellBook size={size} className={cN}/>,
        music: <GiGuitarBassHead size={size} className={cN}/>,
        software: <BsGlobe size={size} className={cN}/>,
        about: <GiSelfLove size={size} className={cN}/>,
        shop: <GiAllSeeingEye size={size} className={cN}/>,
        arrowLeft: <BiLeftArrow size={size} className={cN}/>,
        arrowRight: <BiRightArrow size={size} className={cN}/>,
        play: <BiPlay size={size} className={cN}/>,
        pause: <BiPause size={size} className={cN}/>,
        shuffle: <BiShuffle size={size} className={cN}/>,
        replay: <IoRepeatOutline size={size} className={cN}/>,
        previousTrack: <BiSkipPrevious size={size} className={cN}/>,
        nextTrack: <BiSkipNext size={size} className={cN}/>,
        info: <BsInfoCircle size={size} className={cN}/>,
        check: <BsCheck2 size={size} className={cN}/>,
        close: <BsX size={size} className={cN}/>,
        dash: <BsDash size={size} className={cN}/>,
        fullscreen: <BsFullscreen size={size} className={cN}/>,
        fullscreenExit: <BsFullscreenExit size={size} className={cN}/>,
        dice: <GiDiceTwentyFacesOne size={size} className={cN}/>,
        menu: <FiMenu size={size} className={cN}/>,
    }
    return iconObj[id]
}
