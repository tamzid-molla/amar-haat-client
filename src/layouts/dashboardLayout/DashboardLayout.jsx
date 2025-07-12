import { useState } from "react";
import Header from "../../components/dashboard/header/Header";
import Sidebar from "../../components/dashboard/sidebar/Sidebar";
import { Outlet } from "react-router";


const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex flex-col">
      <Header toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto ml-0 md:ml-64">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
