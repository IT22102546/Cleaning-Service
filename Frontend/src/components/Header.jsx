import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { HiUser, HiViewList } from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../redux/user/userSlice";


export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const handleSignOut = async () => {
    try {
      await fetch("/api/user/signout");
      dispatch(signOut());
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className="border-b-2 relative z-50 bg-transparent">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 ">
   
        <div className="flex items-center">
          <NavLink to="/" className="self-center whitespace-nowrap text-3xl font-semibold font-tangerine ml-0 md:ml-16">
            Logo
          </NavLink>
        </div>
        
    
        <div className="flex space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-yellow-300" : "text-black"
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/category" 
            className={({ isActive }) => 
              isActive ? "text-yellow-300" : "text-black"
            }
          >
            Categories
          </NavLink>
         
          <NavLink 
            to="/service-page" 
            className={({ isActive }) => 
              isActive ? "text-yellow-300" : "text-black"
            }
          >
            Services
          </NavLink>
          
          <NavLink 
            to="/blogs" 
            className={({ isActive }) => 
              isActive ?"text-yellow-300" : "text-black"
            }
          >
            Blogs
          </NavLink>
        </div>
        
        <div className="flex space-x-8 items-center">

       
          
        {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={
                      <Avatar alt="user" img={currentUser.profilePicture} rounded className="h-10 w-10" />
                    }>
                        <DropdownHeader>
                            <span className="block text-sm">{currentUser.username}</span>
                            <span className="block text-sm font-medium truncate">{currentUser.email}</span>
                        </DropdownHeader>
                        <Link to={'/dashboard?tab=profile'}>
                            <DropdownItem>Profile</DropdownItem>
                        </Link>
                        <DropdownDivider/>
                        <DropdownItem onClick={handleSignOut}>Sign Out</DropdownItem>
                    </Dropdown>
                ) : (
                    <Link to='/sign-in' className="text-white flex items-center mt-4 md:mt-0">
                        <HiUser className="mr-1" style={{ fontSize: '24px' }} />
                        Login/SignUp
                    </Link>
                )}

                {currentUser && (
                    <Link to="/wishlist">
                    <div className="flex relative">
                    <HiViewList className="mr-1" style={{ fontSize: '24px' }} />
                        
                    </div>
                    </Link>
                )}
          
        </div>
      </div>
    </Navbar>
  );
}
