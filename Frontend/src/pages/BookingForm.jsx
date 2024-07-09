import ContactForm from "../components/ContactUs";

export default function BookingForm() {
  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center mt-20">
          <section className="hero-section"></section>

          {/* above code need to be copy in every page that you create */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="w-full p-10 bg-orange-100 shadow-md rounded-md">
              <h2 className="text-2xl font-bold mb-6 text-secondary">
                Book An Appointment
              </h2>
              <form>
                <div className="mx-auto flex flex-wrap gap-5 justify-center">
                  <div>
                    <div className="mb-4">
                      <label htmlFor="name" className="block mb-2">
                        {" "}
                        Your Name{" "}
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="email" className="block mb-2">
                        {" "}
                        Email{" "}
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="phone" className="block mb-2">
                        {" "}
                        Phone Number{" "}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="serviceType" className="block mb-2">
                        Type of Visit
                      </label>
                      <select
                        id="serviceType"
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="regular">Regular Cleaning</option>
                        <option value="deep">Deep Cleaning</option>
                        <option value="move-in-out">
                          Move-In/Move-Out Cleaning
                        </option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="date" className="block mb-2">
                        {" "}
                        Schedule Date{" "}
                      </label>
                      <input
                        type="date"
                        id="date"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="address" className="block mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="city" className="block mb-2">
                        {" "}
                        City{" "}
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-4">
                      <label htmlFor="state" className="block mb-2">
                        {" "}
                        State/Province{" "}
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="zip" className="block mb-2">
                        {" "}
                        Zip/Postal Code{" "}
                      </label>
                      <input
                        type="text"
                        id="zip"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="payment" className="block mb-2">
                        Preferred Payment Method
                      </label>
                      <select
                        id="payment"
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="credit-card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="referral" className="block mb-2">
                        How Did You Hear About Us?
                      </label>
                      <input
                        type="text"
                        id="referral"
                        className="w-full p-2 border rounded-md"
                      />
                    </div>

                    <div className="mb-4">
                      <label htmlFor="allergies" className="block mb-2">
                        Any Allergies or Sensitivities
                      </label>
                      <textarea
                        id="allergies"
                        className="w-full p-2 border rounded-md"
                      ></textarea>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="additional" className="block mb-2">
                        Special Instructions or Requests
                      </label>
                      <textarea
                        id="additional"
                        className="w-full p-2 border rounded-md"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full p-3 bg-customYellow text-white font-bold rounded-md bg-secondary hover:bg-orange-500"
                >
                  Schedule Now
                </button>
              </form>
              
            </div>

            <div className="mt-5 md:hidden">
                <div className="p-4 bg-secondary text-white w-11/12 mx-auto rounded-md shadow-md">
                <h1 className="text-lg mb-2">Appointment Confirmation Process</h1>
                    <p>Once you submit your appointment request, it will be reviewed by our service team. Upon approval, you will receive a confirmation with the scheduled date and time. Our service provider will arrive at the specified time to fulfill your cleaning needs. Thank you for choosing our services!</p>
                </div>
              </div>
          </div>

          <div className="hidden md:block lg:w-1/2 mt-8 lg:mt-0 ">
            <div className="absolute bottom-24">
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
                    <p>Once you submit your appointment request, it will be reviewed by our service team. Upon approval, you will receive a confirmation with the scheduled date and time. Our service provider will arrive at the specified time to fulfill your cleaning needs. Thank you for choosing our services!</p>
                </div>
              </div>
              <div className="absolute top-0 right-10 mt-10 mr-4">
                <div className="bg-yellow-200 p-2 rounded-full shadow-md">
                  <img
                    src="/images/facebook.png"
                    alt="Facebook"
                    className="w-4 h-4"
                  />
                </div>
                <div className="bg-yellow-200 p-2 rounded-full shadow-md mt-2">
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
