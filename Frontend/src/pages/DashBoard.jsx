import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashUsers from "../components/DashUsers";
import DashSideBar from "../components/DashSideBar";
import DashProduct from "../components/DashServices";
import AddProducts from "./Addservices";
import DashBookingRequests from "../components/DashBookingRequests";
import DashConfirmedBookings from "../components/DashConfirmedBookings";

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row"
      // style={{
      //   backgroundImage: tab === 'profile'
      //     ? `url('https://inkforall.com/wp-content/uploads/2022/07/cfcdda89-b020-9459-3944-108d2d8fe549-714x476.jpeg')`
      //     : 'none',
      //   backgroundSize: tab === 'profile' ? 'cover' : 'initial',
      //   backgroundPosition: tab === 'profile' ? 'center' : 'initial',
      //   backgroundRepeat: tab === 'profile' ? 'no-repeat' : 'initial',
      // }}
    >
      <div className="md:w-56">
        <DashSideBar />
      </div>

      {tab === 'profile' && <DashProfile />}
      {tab === 'users' && <DashUsers />}
      {tab === 'services' && <DashProduct/>}
      {tab === 'bookings' && <DashBookingRequests/>}
      {tab === 'confirmbookings' && <DashConfirmedBookings/>}
    </div>
  );
}
