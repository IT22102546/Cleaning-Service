import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiUser, HiViewList, HiMenu } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import "./Header.css"; // Assuming you are importing the CSS file here

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [headerClass, setHeaderClass] = useState(
    "bg-transparent font-semibold"
  );

  useEffect(() => {
    const handleScroll = () => {
      const heroSectionHeight =
        document.querySelector(".hero-section").offsetHeight;
      if (window.scrollY > heroSectionHeight) {
        setHeaderClass("bg-white shadow-md text-black");
      } else {
        setHeaderClass(`bg-transparent border-none text-black`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar className={`border-b-2 z-50 fixed w-full ${headerClass} blur-0`}>
      <div className="container mx-auto flex flex-wrap items-center justify-between py-5 font-sans">
        <div className="flex items-center">
          <NavLink
            to="/"
            className="self-center whitespace-nowrap text-3xl font-semibold font-tangerine ml-0 md:ml-16"
          >
            <div className="inline-block">
              <span className="text-3xl font-bold text-black">
                <span className="text-secondary">G</span>CC
              </span>
            </div><br />
            <span className="hidden md:block text-sm font-sans absolute top-16">General Commercial Cleaning</span>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-black focus:outline-none"
          >
            <HiMenu className="w-8 h-8" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className={`md:flex ${menuOpen ? "block" : "hidden"} space-x-8`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-item nav-item-active text-primary font-semibold"
                : "nav-item text-black"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/category"
            className={({ isActive }) =>
              isActive
                ? "nav-item nav-item-active text-primary font-semibold"
                : "nav-item text-black"
            }
          >
            Categories
          </NavLink>
          <NavLink
            to="/product-page"
            className={({ isActive }) =>
              isActive
                ? "nav-item nav-item-active text-primary font-semibold"
                : "nav-item text-black"
            }
          >
            Services
          </NavLink>
        </div>

        {/* Profile and Wishlist */}
        <div className="flex space-x-8 items-center">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="user"
                  img={currentUser.profilePicture}
                  rounded
                  className="h-10 w-10"
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">{currentUser.username}</span>
                <span className="block text-sm font-medium truncate">
                  {currentUser.email}
                </span>
              </DropdownHeader>
              <Link to={"/dashboard?tab=profile"}>
                <DropdownItem>Profile</DropdownItem>
              </Link>
              <DropdownDivider />
              <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
            </Dropdown>
          ) : (
            <Link
              to="/sign-in"
              className="text-black flex items-center mt-4 md:mt-0"
            >
              <HiUser className="mr-1" style={{ fontSize: "24px" }} />
              Login/SignUp
            </Link>
          )}

         
        </div>
      </div>
      
      {/* Mobile Menu Links */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} py-2`}>
        <NavLink
          to="/"
          className="block py-2 px-4 text-black hover:bg-gray-100"
        >
          Home
        </NavLink>
        <NavLink
          to="/category"
          className="block py-2 px-4 text-black hover:bg-gray-100"
        >
          Categories
        </NavLink>
        <NavLink
          to="/product-page"
          className="block py-2 px-4 text-black hover:bg-gray-100"
        >
          Services
        </NavLink>
      </div>
    </Navbar>
  );
}
