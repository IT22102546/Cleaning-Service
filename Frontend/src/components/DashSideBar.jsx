import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight, HiBookmarkAlt, HiBriefcase, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";


export default function DashSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sidebar className="w-full md:w-56 mt-20" style={{height:'300px'}}>
        
        <Sidebar.Items >
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile' key="profile">
            <Sidebar.Item 
              active={tab === 'profile'} 
              icon={HiUser} 
              label={currentUser?.isAdmin ? 'Admin' : 'User'} 
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser?.isAdmin && (
            <>
              <Link to='/dashboard?tab=users' key="users">
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>

              

              <Link to='/dashboard?tab=services' key="services">
                <Sidebar.Item
                  active={tab === 'services'}
                  icon={HiBriefcase}
                  as='div'
                >
                  Services
                </Sidebar.Item>
              </Link>

              <Link to='/dashboard?tab=bookings' key="bookings">
                <Sidebar.Item
                  active={tab === 'bookings'}
                  icon={HiBookmarkAlt}
                  as='div'
                >
                  Booking Requests
                </Sidebar.Item>
              </Link>
             
            </>
          )}

          <Sidebar.Item 
            icon={HiArrowSmRight} 
            className="cursor-pointer" 
            onClick={handleSignOut}
            key="signout"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
   
      
    </Sidebar>
  );
}
