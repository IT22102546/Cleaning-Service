import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
   <BrowserRouter>
      <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
    </Routes>
      <Footer/>
   </BrowserRouter>
  )
}
