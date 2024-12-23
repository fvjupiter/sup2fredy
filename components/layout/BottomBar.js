import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  continueAtStates,
  isFullscreenState,
  isInfoState,
  isShowMenuState,
  screenState,
} from "../../lib/states";
import { useRecoilState, useRecoilValue } from "recoil";
import Link from "next/link";
import { Icon } from "../../lib/icons";

export default function BottomBar({ handleFullscreen }) {
  const router = useRouter();
  const pathname = router.pathname;
  const asPath = router.asPath;
  const goBackPath = asPath.split("/").slice(0, -1).join("/");
  const isHome = pathname.split("/")[1] == "";
  const param1 = asPath.split("/")[1];
  const param2 = asPath.split("/")[2];
  const param3 = asPath.split("/")[3];

  const [isInfo, setisInfo] = useRecoilState(isInfoState);
  const [infoWasOpened, setinfoWasOpened] = useState(false);
  useEffect(() => {
    if (isInfo) setinfoWasOpened(true);
  }, [isInfo]);
  const screen = useRecoilValue(screenState);
  const isShowMenu = useRecoilValue(isShowMenuState);
  const [isDelay, setisDelay] = useState(true);
  useEffect(() => {
    setisDelay(false);
    setTimeout(() => setisDelay(true), 300);
  }, [isInfo]);

  const [isFullscreen, setisFullscreen] = useRecoilState(isFullscreenState);
  const toggleFullscreen = () => {
    if (!isFullscreen) handleFullscreen.enter();
    else handleFullscreen.exit();
    setisFullscreen(!isFullscreen);
  };

  const shareHandle = () => {
    setTimeout(() => alert("Link copied to clipboard."), 10);
    return navigator.clipboard.writeText(
      `https://${window.location.hostname}${asPath}`
    );
  };

  const isSmall = infoWasOpened && !isInfo && screen.width < 768;
  // const isSmall = false

  const continueAt = useRecoilValue(continueAtStates);

  const iconClassName = `${
    !isSmall ? "scale-100" : "scale-0"
  } transition-transform duration-300`;
  const navItems = [
    [
      "/",
      "Home",
      <Icon key={"4"} id="shop" classN={iconClassName} size={70} />,
      "hover:bg-cyan-400 border-cyan-400",
      "bg-cyan-400 hover:shadow-inner-none shadow-none text-white",
      "text-cyan-400",
    ],
    [
      continueAt.writings,
      "Writings",
      <Icon key={"0"} id="writings" classN={iconClassName} size={70} />,
      "hover:bg-lime-400 border-lime-400",
      "bg-lime-400 hover:shadow-inner-none shadow-none text-white",
      "text-lime-400",
    ],
    [
      continueAt.music,
      "Music",
      <Icon key={"1"} id="music" classN={iconClassName} size={70} />,
      "hover:bg-orange-400 border-orange-400",
      "bg-orange-400 hover:shadow-inner-none shadow-none text-white",
      "text-orange-400",
    ],
    // [continueAt.software, 'Software', <Icon key={'2'} id='software' classN={iconClassName} size={70}/>, 'hover:bg-pink-400 border-pink-400', 'bg-pink-400 hover:shadow-inner-none shadow-none text-white', 'text-pink-400'],
    [
      continueAt.about,
      "About",
      <Icon key={"3"} id="about" classN={iconClassName} size={70} />,
      "hover:bg-purple-400 border-purple-400",
      "bg-purple-400 hover:shadow-inner-none shadow-none text-white",
      "text-purple-400",
    ],
  ];

  return (
    <>
      <div
        className={`z-20 fixed ${
          isShowMenu || isInfo ? "bottom-0" : "bottom-[-93px]"
        } ${
          isDelay && "transition-all duration-500 ease-in-out delay-200"
        } w-min inset-x-2/4 ${
          !isInfo ? "ml-[-144px]" : "ml-[-170px]"
        } flex justify-center transition-all duration-300`}
      >
        <div
          onClick={shareHandle}
          className={`group p-2 absolute cursor-pointer ${
            isInfo && "opacity-0 scale-0"
          } ${
            !isSmall
              ? "left-[-38px] sm:left-[-44px] bottom-8 sm:bottom-7"
              : "left-[-38px] bottom-[13px]"
          } hover:text-white text-gray-200 transition-all duration-200`}
        >
          <div className="ring-gray-600 rounded-md backdrop bg-black bg-opacity-30 h-6 w-6 translate-y-0.5 sm:translate-y-0 sm:h-7 sm:w-7 center">
            <Icon id="share" size={22} />
          </div>
          <div
            className={`absolute center left-0 p-2 my-2 min-w-max bottom-[58px] 
                        rounded-xl shadow-lg text-white bg-gray-900
                        text-xs font-bold origin-bottom
                        transition-all duration-300 scale-0 group-hover:scale-100
                    `}
          >
            share
          </div>
        </div>
        <div
          className={`${
            isInfo
              ? "h-[132px] w-[340px] ring-white shadow-4xl p-2"
              : isSmall
              ? "h-6 w-72 p-0"
              : "h-16 w-72 p-1"
          }
                            mb-5 transition-all duration-300
                            rounded-2xl flex items-end justify-between 
                            ring-2 ring-gray-600 backdrop bg-opacity-30 bg-black`}
        >
          <div
            onClick={() => setTimeout(() => setisInfo(false), 300)}
            className={`${
              !isInfo && "opacity-0 scale-0"
            } absolute top-[3px] left-2 textShadow font-cursive text-xl font-bold px-2 py-1
                         text-white transition-all duration-300 flex justify-between`}
          >
            <Link href={"/"}>
              <span className="text-white cursor-pointer">SUP2FREDY</span>
            </Link>
            <Toggle
              icon={
                isFullscreen ? (
                  <Icon id={"fullscreenExit"} size={18} />
                ) : (
                  <Icon id={"fullscreen"} size={18} />
                )
              }
              tooltipTitle={`${isFullscreen ? "exit" : ""} Fullscreen`}
              clickHandle={toggleFullscreen}
            />
            {/* <div className='center'>
                            <div onClick={previous} className={`button-hover-white`}><BiSkipPrevious size={68}/></div>
                            <div onClick={togglePlay} className={`button-hover-white`}>{isPlaying ? <BiPause size={80}/> : <BiPlay size={80}/>}</div>
                            <div onClick={next} className={`button-hover-white`}><BiSkipNext size={68}/></div>
                        </div> */}
          </div>
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              index={index}
              href={
                item[0] == asPath && param1
                  ? `${item[0].split("/").slice(0, -1).join("/")}` //goBack one
                  : item[0] //dont go back
              }
              title={item[1]}
              icon={item[2]}
              colors={item[3]}
              ifClicked={
                item[0] == asPath || item[0] == goBackPath
                  ? item[4]
                  : "bg-opacity-70 bg-black hover:shadow-none " + item[5]
              }
              infoWasOpened={infoWasOpened}
            />
          ))}
        </div>
        <div
          onClick={() => setisInfo(true)}
          className={`group p-2 absolute cursor-pointer ${
            isInfo && "opacity-0 scale-0"
          } ${
            !isSmall
              ? "right-[-38px] sm:right-[-44px] bottom-8 sm:bottom-7"
              : "right-[-38px] bottom-[13px]"
          } hover:text-white text-gray-200 transition-all duration-200`}
        >
          <div className="ring-gray-600 rounded-md backdrop bg-black bg-opacity-30 h-5 w-6 sm:h-7 sm:w-7 center">
            <Icon id="menu" size={22} />
          </div>
          <div
            className={`absolute center right-0 p-2 my-2 min-w-max bottom-[58px] 
                        rounded-xl shadow-lg text-white bg-gray-900
                        text-xs font-bold origin-bottom
                        transition-all duration-300 scale-0 group-hover:scale-100
                    `}
          >
            menu
          </div>
        </div>
        <div
          onClick={() => setisInfo(false)}
          className={`p-2 absolute cursor-pointer ${
            !isInfo && "opacity-0 scale-0"
          } ${
            !isSmall ? "right-[0px] top-0" : "right-[-40px] bottom-[3px]"
          } hover:text-white text-gray-300 transition-all duration-200`}
        >
          <Icon id="close" size={22} />
        </div>
      </div>
    </>
  );
}

const NavItem = ({
  index,
  href,
  title,
  icon,
  colors,
  ifClicked,
  infoWasOpened,
}) => {
  const router = useRouter();
  const [isInfo, setisInfo] = useRecoilState(isInfoState);
  const param2 = router.asPath.split("/")[2];
  const param3 = router.asPath.split("/")[3];
  const isHome = router.pathname.split("/")[1] == "";
  const screen = useRecoilValue(screenState);
  const isSmall = infoWasOpened && !isInfo && screen.width < 768;
  // const isSmall = false

  return (
    <Link key={index} href={href}>
      <div className="p-1">
        <div
          onClick={() => setTimeout(() => setisInfo(false), 300)}
          className={`sidebar-icon group ${colors} border-2 ${ifClicked} ${
            isInfo
              ? "h-12 w-12 p-1.5"
              : isSmall
              ? "h-4 w-12 p-0"
              : "h-12 w-12 p-1.5"
          }`}
        >
          <div className="group-active:shadow-inner-xl duration-300 absolute h-full w-full rounded-xl center">
            <div
              className={`sidebar-tooltip group-hover:scale-100 ${
                isSmall && "bottom-4"
              } ${
                isInfo &&
                "scale-100 bg-transparent shadow-none bottom-12 duration-300"
              }`}
            >
              {title}
            </div>
          </div>
          {icon}
        </div>
      </div>
    </Link>
  );
};

const Toggle = ({ icon, tooltipTitle, clickHandle }) => (
  <div
    onClick={clickHandle}
    className="group scale-0 sm:scale-100 rounded-full h-full my-1 button-hover-white ml-5 center cursor-pointer transition-all duration-200"
  >
    <div
      className={`sidebar-tooltip group-hover:scale-100 bottom-[32px] origin-top font-sans`}
    >
      {tooltipTitle}
    </div>
    {icon}
  </div>
);
