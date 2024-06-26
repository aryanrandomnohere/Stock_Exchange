import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SearchComponent from "./Search";
import { navbarTheme } from "../theme";
import { signoutSuccess } from "../redux/user/userSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/signout", {
        method: "POST",
      });

      await res.json();
      dispatch(signoutSuccess());
      toast.success("User Signed Out");
    } catch (error) {
      toast.error("Failed to sign out. Please try again.");
    }
  };
  

  return (
    <Navbar fluid theme={navbarTheme}>
      <SearchComponent />
      <div className="flex mr-4">
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="flex gap-2 justify-center items-center">
                <Avatar
                  alt="User settings"
                  img={
                    currentUser.user.profilePicture
                  }
                  rounded
                />
                <span className="font-bold text-sm">{currentUser.user.username}</span>
                <MdOutlineKeyboardArrowDown />
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block truncate text-sm font-medium">
                {currentUser.user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="flex gap-4">
            <Link to="/sign-in">
              <Button
                color="light"
                pill
                className="text-lg font-bold border button border-black focus:ring-4 focus:ring-gray-300"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button color="dark" pill className="text-lg font-bold focus:ring-4 focus:ring-gray-300">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
