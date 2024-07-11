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
import PostProduct from "./pages/PostServices";
import ProductPage from "./pages/ServicePage";
import UpdateProducts from "./pages/UpdateServices";
import AddProducts from "./pages/Addservices";

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
    <Route path="/product/:productSlug" element={<PostProduct />} />
    <Route path="/product-page" element={<ProductPage/>}/>
    

    <Route element={<PrivateRoute/>}/>
          <Route path="/dashboard" element={<DashBoard/>}/> 
          <Route path="/add-services" element={<AddProducts/>}/>
          <Route path="/update-product/:productId" element={<UpdateProducts/>}/>
     <Route/>     
    </Routes>
    <Footer/>
   </BrowserRouter>

  )
}
