import { useState } from "react";
import Button from "../buttons/Button";
import NavLinks from "../navLinks/NavLinks";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import NavSideBar from "./NavSideBar";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../hooks/firebase/useAuth";
import Swal from "sweetalert2";
import Logo from "../logo/Logo";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();
  console.log(user);

  //Logout user
  const handleLogout = async () => {
    try {
      await logOutUser();
      Swal.fire({
        icon: "success",
        title: "Logged out!",
        text: "You have been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message || "An error occurred during logout.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };
  const links = (
    <>
      <NavLinks path={"/"} name={"Home"}></NavLinks>
      <NavLinks path={"/allProducts"} name={"All Products"}></NavLinks>
      {
        user && <>
      <NavLinks path={"/dashboard"} name={"Dashboard"}></NavLinks>
        </>
      }
    </>
  );

  return (
    <nav className="bg-bgPrimary border-b">
      <div className="w-11/12 mx-auto flex justify-between items-center h-16">
        {/* Logo and name */}
        <Logo></Logo>
        {/* NavLinks  */}
        <ul className="hidden md:flex space-x-6">{links}</ul>
        {/* Auth related */}
        <div className="flex gap-5 items-center">
          <div className="flex items-center space-x-2">
            {user?.photoURL ? (
              <img
                src={user?.photoURL}
                alt="Profile Photo"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://i.ibb.co/9kW3szMD/vector-flat-illustration-grayscale-avatar-600nw-2264922221.webp";
                }}
                className="w-10 h-10 bg-accent p-[2px] rounded-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-3xl text-accent" />
            )}
          </div>
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Button name={"Logout"} onClick={handleLogout}></Button>
          ) : (
            <Link to="/login">
              <Button name={"Login / Register"}></Button>
            </Link>
          )}
        </div>
        {/* Hamburger for Mobile */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes className="text-2xl text-gray-700" /> : <FaBars className="text-2xl text-gray-700" />}
          </button>
        </div>
          </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <NavSideBar menuOpen={menuOpen} links={links} handleLogout={handleLogout} user={user}></NavSideBar>
      </div>
    </nav>
  );
};

export default Navbar;
