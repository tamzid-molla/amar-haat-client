import React from 'react';
import logo from "../../../assets/logo.png";

const Logo = () => {
    return (
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-10 h-10 p-[2px] bg-accent object-contain rounded-full" />
          <span className="text-2xl font-bold text-accent">AmarHaat</span>
        </div>
    );
};

export default Logo;