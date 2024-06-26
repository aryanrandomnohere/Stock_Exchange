import React from "react";
import SidebarComponent from "../Components/Sidebar";
import NavbarComponent from "../Components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="app flex">
      <SidebarComponent />
      <div className="w-full">
        <NavbarComponent />
        <div className="p-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
