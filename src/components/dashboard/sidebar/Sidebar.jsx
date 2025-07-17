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
  FaChartBar,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import NavLinks from "../../shared/navLinks/NavLinks";
import useAuth from "../../../hooks/firebase/useAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logOutUser, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
           logOutUser();
          navigate("/");
          toast.success("You have been logged out successfully.");
        } catch (error) {
          toast.error(error.message || "An error occurred during logout.");
        }
      }
    });
  };
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
            {role === "user" && (
              <>
                <NavLinks path={"/dashboard/priceTrends"} name={"Price Trends"} icon={FaChartLine} />
                <NavLinks path={"/dashboard/watchList"} name={"Watchlist"} icon={FaClipboardList} />
                <NavLinks path={"/dashboard/myOrders"} name={"My Order"} icon={FaShoppingCart} />
              </>
            )}
            {role === "vendor" && (
              <>
                <NavLinks path="/dashboard/myProducts" name="My Products" icon={FaBoxOpen} />
                <NavLinks path={"/dashboard/addProducts"} name={"Add Product"} icon={FaPlusCircle} />
                <NavLinks path="/dashboard/addAdvertisement" name="Add Advertisement" icon={FaBullhorn} />
                <NavLinks path="/dashboard/myAdvertisements" name="My Advertisements" icon={FaChartBar} />
              </>
            )}
            {role === "admin" && (
              <>
                <NavLinks path="/dashboard/allUsers" name="All Users" icon={FaClipboardList} />
                <NavLinks path="/dashboard/allProducts" name="All Product" icon={FaBoxOpen} />
                <NavLinks path="/dashboard/allAdvertisements" name="All Advertisement" icon={FaBullhorn} />
                <NavLinks path="/dashboard/allOrders" name="All Order" icon={FaShoppingCart} />
              </>
            )}
          </ul>
          <ul className="border-t pt-2 space-y-2">
            <NavLinks path={"/"} name={"Back Home"} icon={FaHome} />
            <NavLinks path={"/dashboard/profile"} name={"Profile"} icon={FaUserCircle} />
            <button onClick={handleLogout} className="flex items-center gap-1 cursor-pointer text-textSecondary">
              <FaSignOutAlt /> Logout
            </button>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
