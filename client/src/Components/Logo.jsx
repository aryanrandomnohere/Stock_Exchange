import React from 'react';
import { ImRocket } from "react-icons/im";
import { NavLink } from "react-router-dom";

const LogoComponent = () => {
  return (
    <NavLink to="/" className='flex justify-center items-center gap-1 mb-4 mt-2'>
      <ImRocket size={30} className='rounded-full bg-black text-white p-1.5'/>
      <span className="self-center whitespace-nowrap font-semibold text-2xl dark:text-white">TradoFly</span>
    </NavLink>
  );
}

export default LogoComponent;
