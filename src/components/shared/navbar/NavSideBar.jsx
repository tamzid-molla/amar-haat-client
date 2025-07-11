import React from 'react';
import { Link } from 'react-router';
import Button from '../buttons/Button';

const NavSideBar = ({ links, menuOpen, handleLogout,user }) => {
    return (
          <div
      className={`z-50 flex flex-col justify-between overflow-x-hidden bg-white shadow-lg w-64 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transition-transform duration-500 ease-in-out transform ${
        menuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
            <ul className='flex flex-col gap-3'>{links}</ul>
            {user ? (
            <Button name={"Logout"} onClick={handleLogout}></Button>
          ) : (
            <Link to="/login">
              <Button name={"Login / Register"} widthFull={true}></Button>
            </Link>
          )}
    </div>
    );
};

export default NavSideBar;