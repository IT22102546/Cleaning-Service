import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import DashBoard from "./pages/DashBoard";
import ForgetPassword from "./pages/ForgerPassword";
import ResetPassword from "./pages/ResetPassword";
import Footer from "./components/Footer";
import Services from "./pages/Services";
import Categories from "./pages/Categories";
import Blogs from "./pages/Blogs";
import BookingForm from "./pages/BookingForm";

export default function App() {
  return (
   <BrowserRouter>
       <Header/>
    <Routes>
   
    <Route path="/" element={<Home/>}/>
    <Route path="/sign-up" element={<SignUp/>}/>
    <Route path="/sign-in" element={<SignIn/>}/>
    <Route path="/forgetPassword" element={<ForgetPassword/>}/>
    <Route path="/resetpassword/:id/:token" element={<ResetPassword/>} />

    <Route element={<PrivateRoute/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/>
          <Route path="/book-service" element={<BookingForm/>}/>
    <Route/>
    <Route path="/service-page" element={<Services/>}/>
    <Route path="/category" element={<Categories/>}/>
    <Route path="/blogs" element={<Blogs/>}/>     
    </Routes>
    <Footer/>
   </BrowserRouter>

  )
}
