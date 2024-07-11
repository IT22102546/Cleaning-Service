import React from "react";

export default function Categories() {
  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row items-center mt-20">
        <section className="hero-section"></section>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-baloo">
              Enjoy the best cleaning service for your home or workplace
            </h1>
            <p className="text-gray-600 mb-6">
            Experience unmatched quality and reliability with our top-rated cleaning services. Our dedicated team ensures your space is pristine, healthy, and inviting. Trust us to make your home or office shine!
            </p>
            
            <div className="flex justify-center lg:justify-start mb-4">
              <button className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition">
                Book Now
              </button>
            </div>
            <div className="flex justify-center lg:justify-start items-center space-x-4 mt-10">
              <div className="flex items-center flex-wrap gap-10">
                <div>
                  <div className="flex flex-wrap">
                    <span className="material-icons text-orange-500"><box-icon name='phone-call' type='solid' size='md' color='#FF7D29' ></box-icon></span>
                    <div>
                      <span className="text-gray-800 ml-2"> Call us</span><br />
                      <span href="tel:+01234567890" className="text-gray-800 ml-2">011 456 7890</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap">
                    <span className="material-icons text-orange-500"><box-icon name='envelope' size='md' color='#FF7D29'></box-icon></span>
                    <div>
                      <span className="text-gray-800 ml-2"> Email</span><br />
                      <span href="tel:+01234567890" className="text-gray-800 ml-2">info@email.com</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap">
                    <span className="material-icons text-orange-500"><box-icon name='location-plus' type='solid' size='md' color='#FF7D29' ></box-icon></span>
                    <div>
                      <span className="text-gray-800 ml-2"> Location</span><br />
                      <span href="tel:+01234567890" className="text-gray-800 ml-2">location ek dnn oneee...</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative">
              <div style={{marginTop:"-55px"}}>
                <img src="/images/cleaner.png" alt="Cleaner" className="mx-auto lg:mx-0 self-center justify-center" />
              </div>
              <div className="absolute top-0 right-0 mt-10 mr-4">
                <div className="bg-yellow-200 p-2 rounded-full shadow-md">
                  <img src="/images/facebook.png" alt="Facebook" className="w-4 h-4" />
                </div>
                <div className="bg-yellow-200 p-2 rounded-full shadow-md mt-2">
                  <img src="/images/instagram.png" alt="Instagram" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
