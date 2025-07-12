import { FaBars } from "react-icons/fa";
import Logo from "../../shared/logo/Logo";

const Header = ({ toggleSidebar }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-bgSecondary shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Logo></Logo>
      </div>

      <h2 className="hidden md:block text-2xl font-semibold">Dashboard</h2>

      <button
        onClick={toggleSidebar}
        className="md:hidden text-2xl text-textPrimary"
      >
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
