import { Link } from "react-router-dom";

export default function BookSuccess() {
  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center mt-20">
          <section className="hero-section"></section>

          <div className="lg:w-2/3 text-center lg:text-left">
            <img src="/images/boook.png" alt="" />
          </div>
          <div className="lg:w-2/3 text-center lg:text-left">
            <h1 className="text-3xl text-secondary font-sans">Booking Submitted Successfully...</h1>
            <p className="text-lg ">
              We will get contact with you as soon as possible for confirmation! 
            </p>
            <h1 className="text-2xl text-secondary pt-5 font-sans">Any thing you need to know about our cleaning service and procedure? </h1>
            
            <Link to="/">
              <button className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-10 mt-10 text-xl">Return</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
