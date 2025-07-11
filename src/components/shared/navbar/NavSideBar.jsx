import React from 'react';

const NavSideBar = ({links,menuOpen}) => {
    return (
        <div className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transition-all duration-300 ease-in-out transform ${
          !menuOpen && '-translate-x-full'
        }  md:translate-x-0`}>
            <ul className='flex flex-col gap-3'>{ links}</ul>
        </div>
    );
};

export default NavSideBar;