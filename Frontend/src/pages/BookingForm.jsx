import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "flowbite-react";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    serviceType: 'regular',
    payment: 'credit-card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/book/create-book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      setLoading(false);

      if (!data.success) {
        setError(data.message);
        return;
      }

      navigate('/success-book');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center mt-20">
          <section className="hero-section"></section>

          <div className="lg:w-2/3 text-center lg:text-left">
            <div className="w-full p-10 shadow-md rounded-md">
              <h2 className="text-2xl font-bold mb-6 text-secondary">Book An Appointment</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mx-auto flex flex-wrap gap-10 justify-center">

                  <div>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Jane"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="jane@example.com"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="123-456-7890"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="serviceType" className="block mb-2">Type of Visit</label>
                      <select
                        id="serviceType"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        onChange={handleChange}
                        defaultValue="regular"
                      >
                        <option value="GeneralCommercialCleaning">General Commercial Cleaning</option>
                        <option value="HighPresureWaterBlasting">High Presure Water Blasting</option>
                        <option value="CarpetSteamCleaningandMaintains">Carpet Steam Cleaning and Maintains</option>
                        <option value="BuildersCleaning">Builders Cleaning</option>
                        <option value="BondCleaning">Bond Cleaning</option>
                        <option value="HouseResidentalCleaning">House / Residental Cleaning</option>
                        <option value="OfficeCleaning">Office Cleaning</option>
                        <option value="WarehouseCleaning">Warehouse Cleaning</option>
                        <option value="HospitalCleaning">Hospital Cleaning</option>
                        <option value="SchoolCleaning">School Cleaning</option>
                        <option value="NewlyConstructedCleaning">Newly Constructed Cleaning</option>
                        <option value="GovernmentProjecCleaning">Government Projec Cleaning</option>
                        <option value="HotelCleaning">Hotel Cleaning</option>
                        <option value="RestaurentCleaning">Restaurent Cleaning</option>
                        <option value="OfficeBoyandMaidService">Office Boy and Maid Service</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="date" className="block mb-2">Schedule Date</label>
                      <input
                        type="date"
                        id="date"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="block mb-2">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="123 Main St"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="city" className="block mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Colombo"
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label htmlFor="state" className="block mb-2">State/Province</label>
                      <input
                        type="text"
                        id="state"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Western"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="zip" className="block mb-2">Zip/Postal Code</label>
                      <input
                        type="text"
                        id="zip"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="12345"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="payment" className="block mb-2">Preferred Payment Method</label>
                      <select
                        id="paymentMethod"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        onChange={handleChange}
                        defaultValue="credit-card"
                      >
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="allergies" className="block mb-2">Any Allergies or Sensitivities</label>
                      <textarea
                        onChange={handleChange}
                        id="allergies"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Any allergies or sensitivities"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="additional" className="block mb-2">Special Instructions or Requests</label>
                      <textarea cols={40}
                        onChange={handleChange}
                        id="additional"
                        className="appearance-none block w-full bg-blue-50 text-gray-700 border border-secondary rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                        placeholder="Any special instructions or requests"
                      ></textarea>
                    </div>
                  </div>

                </div>
                <button className="w-full p-3 bg-customYellow text-white font-bold rounded-md bg-secondary hover:bg-blue-800 transition ease-in">
                  Schedule Now
                </button>
              </form>
            </div>

            {error && (
              <div className="text-red-600">
                <Alert className="mt-5" color="failure">
                  {error}
                </Alert>
              </div>
            )}

          </div>

          <div className="md:hidden p-4 bg-secondary text-white w-11/12 mx-auto rounded-md shadow-md">
                  <h1 className="text-lg mb-2">Appointment Confirmation Process</h1>
                  <p>
                    Once you submit your appointment request, it will be
                    reviewed by our service team. Upon approval, you will
                    receive a confirmation with the scheduled date and time. Our
                    service provider will arrive at the specified time to
                    fulfill your cleaning needs. Thank you for choosing our
                    services!
                  </p>
                </div>

          <div className="hidden md:block lg:w-1/3 mt-8 lg:mt-0">
            <div className="relative">
              <div style={{ marginTop: "-55px" }}>
                <img
                  src="/images/boook.png"
                  alt="Cleaner"
                  className="mx-auto lg:mx-0 self-center justify-center"
                />
              </div>
              <div>
                <div className="p-4 bg-secondary text-white w-11/12 mx-auto rounded-md shadow-md">
                  <h1 className="text-lg mb-2">Appointment Confirmation Process</h1>
                  <p>
                    Once you submit your appointment request, it will be
                    reviewed by our service team. Upon approval, you will
                    receive a confirmation with the scheduled date and time. Our
                    service provider will arrive at the specified time to
                    fulfill your cleaning needs. Thank you for choosing our
                    services!
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-10 mt-10 mr-4">
                <div className="bg-secondary p-2 rounded-full shadow-md">
                  <img
                    src="/images/facebook.png"
                    alt="Facebook"
                    className="w-4 h-4"
                  />
                </div>
                <div className="bg-secondary p-2 rounded-full shadow-md mt-2">
                  <img
                    src="/images/instagram.png"
                    alt="Instagram"
                    className="w-4 h-4"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>

        <br />
      </div>
    </div>
  );
}
