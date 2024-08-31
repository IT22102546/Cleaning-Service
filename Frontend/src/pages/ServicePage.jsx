import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import queryString from "query-string";

export default function ProductPage() {
  const location = useLocation();
  const { category } = queryString.parse(location.search);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, selectedCategory, selectedPriceRange]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/products/getproducts?searchTerm=${searchTerm}&page=${currentPage}&category=${selectedCategory}&priceRange=${selectedPriceRange}`
      );
      const data = await res.json();
      if (res.ok) {
        setProducts(data.products);
        setTotalProducts(data.totalProducts);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-start mt-10">
          <div className="lg:w-1/4 p-4 mb-6 lg:mb-0">
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-4 text-secondary">Categories</h2>
              <ul>
                {[
                  "CommercialCleaning",
                  "BondCleaning",
                  "HighPressureWaterCleaning",
                  "HospitalCleaning",
                  "OfficeBoyAndMaidService",
                  "RestaurantCleaning",
                  "GovernmentProjecCleaning",
                  "HotelCleaning",
                  "GovernmentProjecCleaning",
                  "NewlyConstructedCleaning",
                  "SchoolCleaning",
                  "WarehouseCleaning",
                  "OfficeCleaning",
                  "HouseResidentalCleaning",
                  "BuildersCleaning",
                  "CarpetSteamCleaningandMaintains"
                ].map((category) => (
                  <li
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`cursor-pointer mb-2 font-sans ${
                      selectedCategory === category ? "bg-gray-200" : ""
                    }`}
                  >
                    {category.replace(/([A-Z])/g, " $1").trim()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:w-3/4 p-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <input
                type="text"
                placeholder="Search Products..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full md:w-1/3 mb-4 md:mb-0 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
              <span className="text-lg font-semibold">
                Total Services: {totalProducts}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg shadow-md"
                >
                  <Link to={`/product/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-40 object-cover mb-4"
                    />
                  </Link>
                  <h3 className="text-lg font-semibold mb-2">
                    <Link to={`/product/${product.slug}`}>
                      {product.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600">{product.category}</p>
                  {/*<p className="text-xl font-bold">Rs. {product.price}.00</p>*/}
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-2 px-4 py-2 bg-gray-200 rounded"
              >
                Previous
              </button>
              <span className="mx-2 px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-2 px-4 py-2 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
