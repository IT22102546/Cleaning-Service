

export default function Home() {
  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
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
            <div className="flex justify-center lg:justify-start items-center space-x-4">
              <div className="flex items-center">
                <span className="material-icons text-orange-500">call</span>
                <a href="tel:+01234567890" className="text-gray-800 ml-2">
                  +9411 456 7890
                </a>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center space-x-2">
                <span className="bg-white p-2 rounded-md shadow-md">
                  <img src="/award-icon.png" alt="Award Icon" className="w-6 h-6" />
                </span>
                <div>
                  <p className="text-gray-800 font-bold">dn ne hutto</p>
                  <p className="text-gray-600">bdgini ykoo

                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="relative">
              <div className="mt-[-50px]">
                <img src="/images/cleaner.png" alt="Cleaner" className="mx-auto lg:mx-0 self-center justify-center" />
              </div>
              <div className="absolute top-0 right-0 mt-4 mr-4">
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
        <div className="flex justify-center mt-12 space-x-4">
          <img src="/customer1.png" alt="Customer 1" className="w-12 h-12 rounded-full shadow-md" />
          <img src="/customer2.png" alt="Customer 2" className="w-12 h-12 rounded-full shadow-md" />
          <img src="/customer3.png" alt="Customer 3" className="w-12 h-12 rounded-full shadow-md" />
          <img src="/customer4.png" alt="Customer 4" className="w-12 h-12 rounded-full shadow-md" />
        </div>
      </div>
    </div>
  )
}
