import ContactForm from "../components/ContactUs";
import FeaturedProducts from "../components/FeaturedProducts";
import { Link } from "react-router-dom";


export default function Home() {

  const categories = [
    { name: 'GeneralCommercialCleaning', imageUrl: 'https://example.com/general-commercial-cleaning.jpg' },
    { name: 'HighPresureWaterBlasting', imageUrl: 'https://example.com/high-pressure-water-blasting.jpg' },
    { name: 'CarpetSteamCleaningandMaintains', imageUrl: 'https://example.com/carpet-steam-cleaning.jpg' },
    { name: 'BuildersCleaning', imageUrl: 'https://example.com/builders-cleaning.jpg' },
    { name: 'BondCleaning', imageUrl: 'https://example.com/bond-cleaning.jpg' },
    { name: 'HouseResidentalCleaning', imageUrl: 'https://example.com/house-residential-cleaning.jpg' },
    { name: 'OfficeCleaning', imageUrl: 'https://example.com/office-cleaning.jpg' },
    { name: 'WarehouseCleaning', imageUrl: 'https://example.com/warehouse-cleaning.jpg' },
    { name: 'HospitalCleaning', imageUrl: 'https://example.com/hospital-cleaning.jpg' },
    { name: 'SchoolCleaning', imageUrl: 'https://example.com/school-cleaning.jpg' },
    { name: 'NewlyConstructedCleaning', imageUrl: 'https://example.com/newly-constructed-cleaning.jpg' },
    { name: 'GovernmentProjecCleaning', imageUrl: 'https://example.com/government-project-cleaning.jpg' },
    { name: 'HotelCleaning', imageUrl: 'https://example.com/hotel-cleaning.jpg' },
    { name: 'RestaurentCleaning', imageUrl: 'https://example.com/restaurant-cleaning.jpg' },
    { name: 'OfficeBoyandMaidService', imageUrl: 'https://example.com/office-boy-maid-service.jpg' }
];

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center" title={"Home"}>
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center mt-20">
        <section className="hero-section"></section>

        {/* above code need to be copy in every page that you create */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h1 className="text-4xl font-bold text-gray-800 mb-4 font-baloo">
              Enjoy the best cleaning service for your home or workplace
            </h1>
            <p className="text-gray-600 mb-6">
            Experience unmatched quality and reliability with our top-rated cleaning services. Our dedicated team ensures your space is pristine, healthy, and inviting. Trust us to make your home or office shine!
            </p>
            
            <div className="flex justify-center lg:justify-start mb-4">
              <Link to="/book-service">
              
              <button className="bg-secondary text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                Book Now
              </button>
              </Link>
            </div>
            <div className="flex justify-center lg:justify-start items-center space-x-4 mt-10">
              <div className=" flex md:flex items-center md:gap-18 gap-10 mx-auto">
                <div>
                  <div className="flex-row md:flex mx-auto">
                    <span className="material-icons "><box-icon name='phone-call' type='solid' size='md' color='#2B0996' ></box-icon></span>
                    <div>
                      <span className="text-gray-800 ml-2 font-semibold"> Call us</span><br />
                      <span href="tel:+01234567890" className="text-gray-800 ml-2">0777574274</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex-row md:flex">
                    <span className="material-icons text-orange-500"><box-icon name='envelope' size='md' color='#2B0996'></box-icon></span>
                    <div>
                      <span className="text-gray-800 ml-2 font-semibold"> Email</span><br />
                      <span href="tel:+01234567890" className="text-gray-800 ml-2">djsanjaya46@gmail.com</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex-row md:flex">
                    <span className="material-icons text-orange-500"><box-icon name='location-plus' type='solid' size='md' color='#2B0996' ></box-icon></span>
                    <div>
                      <span className="text-gray-800 ml-2 font-semibold"> Location</span><br />
                      <span href="tel:+94777574274" className="text-gray-800 ml-2  text-sm ">11 Samanpura,Dambulla road,Kurunegala</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="hidden md:block relative">
              <div style={{marginTop:"-55px"}} >
                <img src="/images/cleaner.png" alt="Cleaner" className="hidden md:block mx-auto lg:mx-0 self-center justify-center" />
              </div>
              <div className="absolute top-0 right-0 mt-10 mr-4">
              <a href="https://www.facebook.com/profile.php?id=61565314887430" target="_blank" rel="noopener noreferrer">
                  <div className="bg-secondary p-2 rounded-full shadow-md hover:bg-blue-900 transition hover:cursor-pointer">
                    <img src="/images/facebook.png" alt="Facebook" className="w-4 h-4 mx-auto" />
                  </div>
                </a>
                <div className="bg-secondary p-2 rounded-full shadow-md mt-2 hover:bg-blue-900 transition hover:cursor-pointer">
                  <img src="/images/instagram.png" alt="Instagram" className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <div className="bg-secondary p-2 rounded-full shadow-md mt-2">

            <img src="/images/hero-1.jpg" alt="Customer 1" className="w-14 h-14 rounded-full shadow-md" />
          </div>
          <div className="bg-secondary p-2 rounded-full shadow-md mt-2">
            
            <img src="/images/hero-2.jpg" alt="Customer 2" className="w-14 h-14 rounded-full shadow-md" />
          </div>
          <div className="bg-secondary p-2 rounded-full shadow-md mt-2">
            
            <img src="/images/hero-3.jpg" alt="Customer 3" className="w-14 h-14 rounded-full shadow-md" />
          </div>
          <div className="bg-secondary p-2 rounded-full shadow-md mt-2">
            
            <img src="/images/hero-4.jpg" alt="Customer 4" className="w-14 h-14 rounded-full shadow-md" />
          </div>
        </div>

        <br />
          <div className="flex flex-wrap justify-between items-center gap-0 mt-10">
            <div className="hidden md:block w-full md:w-1/2 lg:w-2/5">
              <img
                src="/images/hero-3.jpg"
                alt="Cleaning Service"
                className="w-96 h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-3/5">
              <span className="block uppercase text-secondary font-sans mb-2">
                Welcome to the best cleaning service in Sri Lanka
              </span>
              <h1 className="text-4xl font-bold text-secondary mb-4">
                Cleaning Services (Pvt) Ltd
              </h1>
              <p className="text-gray-700 mb-4">
                We proudly announce that "Pioneer Cleaning Services" was established in 2000 and we can claim and state that we are the best cleaning services provider in Sri Lanka. We grew up gradually in the janitorial services industry during the last three decades and now play a major role in that segment of the industry.
              </p>
              <p className="text-gray-700 mb-4">
                Without any hesitation we say that we provide unique Cleaning Services in Sri Lanka, while maintaining exemplary Janitorial services in Sri Lanka. We are professionals in house cleaning, commercial cleaning, carpet cleaning, sofa cleaning, initial cleaning, general cleaning, post-construction cleaning, cladding cleaning, window cleaning, cleaning of high-rise buildings, floor polishing, and floor scrubbing.
              </p>
              <p className="text-gray-700">
                Further we undertake disinfection services, office aids services and tea stewards’ services.
              </p>
            </div>
          </div>
          <FeaturedProducts/>
          <div className="container mx-auto p-4 mt-20">
            <div className="text-center my-8">
              <h1 className="text-3xl font-bold mb-4 text-secondary">OUR SERVICES</h1>
              <p className="text-gray-700">
                We assure in providing quality and excellence cleaning services and related services to keep the clients’ premises clean and healthy. We provide quality chemicals, equipment, and high-tech machines with well-trained employees to execute our services to high standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {categories.map((category, index) => (
              
              <div className="bg-white shadow-md rounded-lg overflow-hidden" key={category._id}>
                <img src="/services/commercial-cleaning.jpeg" alt="Commercial Cleaning" className="w-full h-48 object-cover"/>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                  <p className="text-gray-700 mb-4">We proudly announce that we are the leading Commercial office cleaning supplier...</p>
                  <Link to={`/product-page?category=${category.name}`}>
                  <h3 className="text-blue-600 hover:underline">VISIT MORE &rarr;</h3>
                  </Link>
                </div>
              </div>
                ))}

            </div>
          </div>
         

      <ContactForm/>

      </div>
    </div>
  )
}
