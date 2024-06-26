import React from "react";
import { Sidebar } from "flowbite-react";
import { sidebarTheme } from "../theme";
import { AiOutlineAppstore } from "react-icons/ai";
import {
  IoNewspaperOutline,
  IoSettingsOutline,
  IoCallOutline,
  IoBarChartOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { GrGroup } from "react-icons/gr";
import WalletComponent from "./Wallet";
import LogoComponent from "./Logo";
import { NavLink } from "react-router-dom";

const SidebarComponent = () => {
  return (
    <Sidebar
      aria-label="Sidebar with content separator example"
      theme={sidebarTheme}
    >
      <Sidebar.Items>
        <LogoComponent />
        <WalletComponent />
        <Sidebar.ItemGroup>
          <Sidebar.Item as={NavLink} to="/" icon={IoHomeOutline}>
            Home
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/dashboard" icon={AiOutlineAppstore}>
            Dashboard
          </Sidebar.Item>

          <Sidebar.Collapse
            icon={HiOutlinePresentationChartLine}
            label="Stock & Fund"
          >
            <Sidebar.Item as={NavLink} to="/stock/^NSEI">
              Stocks
            </Sidebar.Item>
            <Sidebar.Item as={NavLink} to="/stock/AAPL">
              Mutual Funds
            </Sidebar.Item>
            <Sidebar.Item as={NavLink} to="/stock/^NSEI">
              CryptoCurrency
            </Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Item as={NavLink} to="/news" icon={IoNewspaperOutline}>
            News
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Sidebar.Item as={NavLink} to="/community" icon={GrGroup}>
            Community
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/settings" icon={IoSettingsOutline}>
            Settings
          </Sidebar.Item>
          <Sidebar.Item as={NavLink} to="/contact" icon={IoCallOutline}>
            Contact Us
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SidebarComponent;
