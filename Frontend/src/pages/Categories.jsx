import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';


export default function Categories() {
  const [generalCommercialCleaning, setGeneralCommercialCleaning] = useState([]);
  const [highPressureWaterBlasting, setHighPressureWaterBlasting] = useState([]);
  const [carpetSteamCleaningAndMaintains, setCarpetSteamCleaningAndMaintains] = useState([]);
  const [buildersCleaning, setBuildersCleaning] = useState([]);
  const [bondCleaning, setBondCleaning] = useState([]);
  const [houseResidentialCleaning, setHouseResidentialCleaning] = useState([]);
  const [officeCleaning, setOfficeCleaning] = useState([]);
  const [warehouseCleaning, setWarehouseCleaning] = useState([]);
  const [hospitalCleaning, setHospitalCleaning] = useState([]);
  const [schoolCleaning, setSchoolCleaning] = useState([]);
  const [newlyConstructedCleaning, setNewlyConstructedCleaning] = useState([]);
  const [governmentProjectCleaning, setGovernmentProjectCleaning] = useState([]);
  const [hotelCleaning, setHotelCleaning] = useState([]);
  const [restaurantCleaning, setRestaurantCleaning] = useState([]);
  const [officeBoyAndMaidService, setOfficeBoyAndMaidService] = useState([]);


  useEffect(() => {
  
    const fetchProductsByCategory = async (category, setState) => {
      try {
        const response = await fetch(`/api/products/category?category=${category}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch products for category: ${category}`);
        }
        const data = await response.json();
        setState(data.products);
      } catch (error) {
        console.error(`Error fetching ${category} products`, error);
      }
    };

    fetchProductsByCategory('GeneralCommercialCleaning', setGeneralCommercialCleaning);
    fetchProductsByCategory('HighPresureWaterBlasting', setHighPressureWaterBlasting);
    fetchProductsByCategory('CarpetSteamCleaningandMaintains', setCarpetSteamCleaningAndMaintains);
    fetchProductsByCategory('BuildersCleaning', setBuildersCleaning);
    fetchProductsByCategory('BondCleaning', setBondCleaning);
    fetchProductsByCategory('HouseResidentalCleaning', setHouseResidentialCleaning);
    fetchProductsByCategory('OfficeCleaning', setOfficeCleaning);
    fetchProductsByCategory('WarehouseCleaning', setWarehouseCleaning);
    fetchProductsByCategory('HospitalCleaning', setHospitalCleaning);
    fetchProductsByCategory('SchoolCleaning', setSchoolCleaning);
    fetchProductsByCategory('NewlyConstructedCleaning', setNewlyConstructedCleaning);
    fetchProductsByCategory('GovernmentProjecCleaning', setGovernmentProjectCleaning);
    fetchProductsByCategory('HotelCleaning', setHotelCleaning);
    fetchProductsByCategory('RestaurantCleaning', setRestaurantCleaning);
    fetchProductsByCategory('OfficeBoyAndMaidService', setOfficeBoyAndMaidService);
  }, []);

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center mt-20">
          <section className="hero-section"></section>
          <div className="container mx-auto py-6">
            {[
              { title: 'General Commercial Cleaning', data: generalCommercialCleaning },
              { title: 'High Pressure Water Blasting', data: highPressureWaterBlasting },
              { title: 'Carpet Steam Cleaning and Maintains', data: carpetSteamCleaningAndMaintains },
              { title: 'Builders Cleaning', data: buildersCleaning },
              { title: 'Bond Cleaning', data: bondCleaning },
              { title: 'House / Residential Cleaning', data: houseResidentialCleaning },
              { title: 'Office Cleaning', data: officeCleaning },
              { title: 'Warehouse Cleaning', data: warehouseCleaning },
              { title: 'Hospital Cleaning', data: hospitalCleaning },
              { title: 'School Cleaning', data: schoolCleaning },
              { title: 'Newly Constructed Cleaning', data: newlyConstructedCleaning },
              { title: 'Government Project Cleaning', data: governmentProjectCleaning },
              { title: 'Hotel Cleaning', data: hotelCleaning },
              { title: 'Restaurant Cleaning', data: restaurantCleaning },
              { title: 'Office Boy and Maid Service', data: officeBoyAndMaidService },
            ].map((category) => (
              <div key={category.title}>
                <h2 className="text-2xl font-bold mb-4 pl-7">{category.title}</h2>
                <div className="grid grid-cols-3 gap-4 mb-8 pl-7">
                  {category.data.map((product) => (
                    <div key={product._id} className="border p-4 rounded-lg shadow-md">
                      <Link to={`/product/${product.slug}`}>
                        <img src={product.images[0]} alt={product.title} className="w-full h-40 object-cover mb-4" />
                      </Link>
                      <h3 className="text-lg font-semibold mb-2">
                        <Link to={`/product/${product.slug}`}>{product.title}</Link>
                      </h3>
                      <p className="text-gray-600">{product.category}</p>
                     { /*<p className={product.quantity < 5 ? 'text-red-500' : 'text-green-500'}>
                        {product.quantity < 5 ? 'Low Stock' : 'In Stock'}
                      </p>*/}
                      {/*<p className="text-xl font-bold">Rs. {product.price}</p>*/}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
