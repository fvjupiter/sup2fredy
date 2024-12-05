import React, { useState } from "react";
import { GoMail } from "react-icons/go";
import { FaTelegramPlane, FaWhatsapp, FaInstagram } from "react-icons/fa";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FiLinkedin } from "react-icons/fi";

export default function Social() {
  const [info, setinfo] = useState("");
  const Item = ({ href, newTab, infoTitle, bg, children }) => (
    <div
      onMouseEnter={() => setinfo(infoTitle)}
      className={`${bg} group p-1 w-10 h-10 center rounded-xl my-2 ring-2 hover:ring-white duration-300 cursor-pointer hover:animate-pulse`}
    >
      <a
        href={href}
        rel={newTab && "noreferrer"}
        target={newTab && "_blank"}
        className="h-full w-full center"
      >
        {children}
      </a>
    </div>
  );
  const size = 35;

  return (
    <>
      <div
        className={`${
          info != "" ? "opacity-100" : "opacity-0"
        } duration-500 text-xs font-normal`}
      >
        click icon to open
      </div>
      <div className="font-light h-7">{info}</div>
      <div className={`center mx-auto w-72 justify-evenly`}>
        <Item
          infoTitle={"schoof.frederik@gmail.com"}
          href={"mailto:schoof.frederik@gmail.com"}
          bg={"bg-gradient-to-tr from-teal-300 to-cyan-500"}
        >
          <GoMail size={size} className="text-white" />
        </Item>
        <Item
          infoTitle={"telegram.me/k3Yk1D"}
          href={"https://telegram.me/k3Yk1D"}
          newTab
          bg={"bg-gradient-to-tr from-slate-800 to-black"}
        >
          <FaTelegramPlane size={size - 4} className="text-white" />
        </Item>
        <Item
          infoTitle={"linkedin.com/..."}
          href={"https://www.linkedin.com/in/frederik-schoof-a38638248/"}
          newTab
          bg={"bg-gradient-to-tr from-slate-800 to-black"}
        >
          <FiLinkedin size={size - 5} className="text-white" />
        </Item>
        <Item
          infoTitle={"github.com/fvjupiter"}
          href={"https://github.com/fvjupiter"}
          newTab
          bg={"bg-gradient-to-tr from-slate-800 to-black"}
        >
          <BsGithub size={size - 5} className="text-white" />
        </Item>
        {/* <Item infoTitle={''} href={'a'} bg={'bg-gradient-to-tr from-fuchsia-600 to-orange-500'}>
            <FaInstagram size={size} className='text-white'/>
        </Item> */}
      </div>
    </>
  );
}
