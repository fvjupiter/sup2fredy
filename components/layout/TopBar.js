import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  isFullscreenState,
  isInfoState,
  totalCountState,
  isShowMenuState,
  slugListState,
} from "../../lib/states";
import { useRecoilState, useRecoilValue } from "recoil";
import Link from "next/link";
import { Icon } from "../../lib/icons";

export default function TopBar({ handleFullscreen }) {
  const router = useRouter();
  const pathname = router.pathname;
  const asPath = router.asPath;
  const goBackPath = asPath.split("/").slice(0, -1).join("/");
  const param1 = asPath.split("/")[1];
  const param2 = asPath.split("/")[2];
  const param3 = asPath.split("/")[3];

  const isShowMenu = useRecoilValue(isShowMenuState);
  const [isFullscreen, setisFullscreen] = useRecoilState(isFullscreenState);
  const toggleFullscreen = () => {
    if (!isFullscreen) handleFullscreen.enter();
    else handleFullscreen.exit();
    setisFullscreen(!isFullscreen);
  };
  const isInfo = useRecoilValue(isInfoState);
  const slugList = useRecoilValue(slugListState);

  const goBack = (icon, icon2) => {
    const indexSlug = slugList[param2].indexOf(param3);
    const randomPath = `${
      slugList[param2][Math.floor(Math.random() * slugList[param2].length)]
    }`;
    return [
      [goBackPath, icon, `all ${param2}`, "", true],
      [
        `/${param1}/${param2}/${
          indexSlug > 0
            ? slugList[param2][indexSlug - 1]
            : slugList[param2][slugList[param2].length - 1]
        }`,
        <Icon key={"0"} id={"arrowLeft"} size={24} classN="mt-0.5" />,
        "previous",
        "",
        true,
      ],
      [randomPath, icon2, "random", "", true],
      [
        `/${param1}/${param2}/${
          indexSlug < slugList[param2].length - 1
            ? slugList[param2][indexSlug + 1]
            : slugList[param2][0]
        }`,
        <Icon key={"1"} id={"arrowRight"} size={24} classN="mt-0.5" />,
        "next",
        "",
        true,
      ],
    ];
  };
  const getNavItems = () => {
    switch (param1) {
      case "writings":
        return !param3
          ? [
              [
                "/writings",
                <Icon key={"2"} id={"writings"} size={28} />,
                "all writings",
                "text-lime-400",
                true,
              ],
              ["/writings/poems", "Poems", "", "bg-lime-400 text-gray-900"],
              ["/writings/notes", "Notes", "", "bg-emerald-400 text-gray-900"],
              [
                "/writings/stories",
                "Stories",
                "",
                "bg-green-400 text-gray-900",
              ],
            ]
          : goBack(
              <Icon key={"3"} id={"writings"} size={28} />,
              <Icon key={"3"} id={"dice"} size={30} />
            );
      case "software":
        return !param2
          ? [
              // ['/software', '', '', 'bg-pink-400 text-gray-900']
            ]
          : [
              [
                goBackPath,
                <Icon key={"4"} id={"software"} size={28} />,
                "all software",
                "",
                true,
              ],
            ];

      default:
        null;
    }
  };

  return (
    <div
      className={`${param1 == "writings" ? "flex" : "hidden"} z-20 fixed ${
        isShowMenu || isInfo ? "top-0" : "top-[-65px]"
      } transition-all duration-500 ease-in-out delay-200 left-0 w-screen justify-center`}
    >
      <div
        className={`ring-gray-600 h-11 ring-2 rounded-lg sm:rounded-full
                            flex items-center justify-between mx-2 mt-3 
                            backdrop bg-opacity-30 bg-black  transition-all duration-300 max-w-full`}
      >
        {/* <Link href={'/'}>
                    <div className={`group flex items-center justify-center textShadow text-2xl font-bold px-3 py-0.5 cursor-pointer text-white ${(param1 == 'writings' || param1 == 'shop') && 'border-r-2'} sm:border-r-0 border-gray-600`}>
                        <div className={`sidebar-tooltip group-hover:scale-100 bottom-[-48px] origin-top`}>
                            Home
                        </div>
                        <span className='font-cursive'>S2F</span>
                    </div>
                </Link>
                <div className='hidden sm:flex border-r-2 border-l-2 border-gray-600 items-center justify-center px-1 mr-2'>
                    <Toggle icon={isFullscreen ? <Icon id={'fullscreenExit'} size={24}/> : <Icon id={'fullscreen'} size={24}/>} tooltipTitle={`${isFullscreen ? 'exit' : ''} Fullscreen`} clickHandle={toggleFullscreen}/>
                </div> */}
        <div className="flex overflow-x-scroll">
          {getNavItems() &&
            getNavItems().map((item, index) => (
              <NavItem
                key={index}
                index={index}
                href={item[0]}
                title={item[1]}
                tooltipTitle={item[2]}
                border={item[0] == asPath && item[3]}
                isIcon={item[4]}
                lastItem={index == getNavItems().length - 1}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

const NavItem = ({
  index,
  title,
  href,
  border,
  isIcon,
  tooltipTitle,
  lastItem,
}) => {
  return (
    <Link href={href}>
      <div
        className={`group ${
          !isIcon
            ? `px-3.5 py-1.5 ${lastItem && "mr-1"}`
            : `${index == 0 && "ml-4"} mx-2`
        } flex items-center justify-center cursor-pointer text-center rounded-lg sm:rounded-full whitespace-nowrap
                ${border ? border : "button-hover-white"}`}
      >
        {isIcon && (
          <div
            className={`sidebar-tooltip group-hover:scale-100 bottom-[-48px] origin-top`}
          >
            {tooltipTitle}
          </div>
        )}
        {title}
      </div>
    </Link>
  );
};

const Toggle = ({ icon, tooltipTitle, clickHandle }) => (
  <div
    onClick={clickHandle}
    className="group rounded-full h-full my-1 button-hover-white mx-1 flex items-center justify-center cursor-pointer transition-all duration-200"
  >
    <div
      className={`sidebar-tooltip group-hover:scale-100 bottom-[-48px] origin-top`}
    >
      {tooltipTitle}
    </div>
    {icon}
  </div>
);
