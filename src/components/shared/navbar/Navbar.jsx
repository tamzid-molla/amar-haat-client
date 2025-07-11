import { useState } from "react";
import logo from "../../../assets/logo.png";
import Button from "../buttons/Button";
import NavLinks from "../navLinks/NavLinks";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import NavSideBar from "./NavSideBar";
import { Link } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = "ase"; //
  const links = (
    <>
      <NavLinks path={"/"} name={"Home"}></NavLinks>
      <NavLinks path={"/allProducts"} name={"All Products"}></NavLinks>
      <NavLinks path={"/dashboard"} name={"Dashboard"}></NavLinks>
    </>
  );
  return (
    <nav className="bg-bgPrimary border-b">
      <div className="w-11/12 mx-auto flex justify-between items-center h-16">
        {/* Logo and name */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="logo"
            className="w-8 h-8 object-contain rounded-full"
          />
          <span className="text-2xl font-bold text-accent">AmarHaat</span>
        </div>

        {/* NavLinks  */}
        <ul className="hidden md:flex space-x-6">{links}</ul>

        {/* Auth related  */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaUserCircle className="text-2xl text-accent" />
            <span className="text-textSecondary font-medium">Profile</span>
                  </div>
                  <Link to="/login">
          <Button name={"Login / Register"}></Button>
                  </Link>
        </div>

        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <FaTimes className="text-2xl text-gray-700" />
            ) : (
              <FaBars className="text-2xl text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && <NavSideBar menuOpen={menuOpen} links={links}></NavSideBar>}
    </nav>
  );
};

export default Navbar;
