import {
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaUserCircle,
  FaChartLine,
  FaClipboardList,
  FaShoppingCart,
  FaBoxOpen,
  FaBullhorn,
  FaChartBar
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import NavLinks from "../../shared/navLinks/NavLinks";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <aside
      className={`bg-bgSecondary p-4 w-64 h-full overflow-y-auto fixed md:static top-0 left-0 z-40 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out`}>
      <div className="flex flex-col gap-4 h-full">
        <button className="md:hidden self-end mb-4 text-xl" onClick={toggleSidebar}>
          ✖
        </button>
        <div className="flex flex-col justify-between h-full">
          <ul className="space-y-2">
            <NavLinks path={"/dashboard"} name={"Dashboard"} icon={MdSpaceDashboard} />
            <NavLinks path={"/dashboard/addProducts"} name={"Add Product"} icon={FaPlusCircle} />
            <NavLinks path={"/dashboard/priceTrends"} name={"Price Trends"} icon={FaChartLine} />
            <NavLinks path={"/dashboard/watchList"} name={"Watchlist"} icon={FaClipboardList} />
            <NavLinks path={"/dashboard/myOrders"} name={"My Order"} icon={FaShoppingCart} />
            <NavLinks path="/dashboard/myProducts" name="My Products" icon={FaBoxOpen} />
            <NavLinks path="/dashboard/addAdvertisement" name="Add Advertisement" icon={FaBullhorn} />
            <NavLinks path="/dashboard/myAdvertisements" name="My Advertisements" icon={FaChartBar} />
          </ul>
          <ul className="border-t pt-2 space-y-2">
            <NavLinks path={"/profile"} name={"Profile"} icon={FaUserCircle} />
            <NavLinks path={"/"} name={"Back Home"} icon={FaHome} />
            <NavLinks path={"/"} name={"Logout"} icon={FaSignOutAlt} />
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
