import { useState } from "react";
import Header from "../../components/dashboard/header/Header";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import { Outlet } from "react-router";
import DashboardFooter from "../../components/dashboard/footer/DashboardFooter";
import useAuth from "../../hooks/firebase/useAuth";
import PageLoader from "../../components/shared/pageLoader/PageLoader";


const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const { loading } = useAuth();

  if (loading) {
    return <PageLoader></PageLoader>
  }

  return (
    <div className="h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto ml-0">
          <Outlet></Outlet>
        </main>
      </div>
      <DashboardFooter></DashboardFooter>
    </div>
  );
};

export default DashboardLayout;
