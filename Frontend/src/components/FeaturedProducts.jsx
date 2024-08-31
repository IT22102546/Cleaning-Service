/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function FeaturedProducts() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(4);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const res = await fetch('/api/products/featured');
                const data = await res.json();
                if (res.ok) {
                    setFeaturedProducts(data);
                } else {
                    console.log('Error fetching featured products');
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        fetchFeaturedProducts();
    }, []);

    // Handle screen resize to adjust items per slide
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerSlide(1);  // 1 item per slide on small screens
            } else if (window.innerWidth < 1024) {
                setItemsPerSlide(2);  // 2 items per slide on medium screens
            } else {
                setItemsPerSlide(4);  // 4 items per slide on larger screens
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? featuredProducts.length - itemsPerSlide : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === featuredProducts.length - itemsPerSlide ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="bg-slate-200 py-16 w-full" style={{ backgroundColor: "white" }}>
            <div className="w-full px-4">
                <div className="text-center my-8">
                    <h1 className="text-3xl font-bold mb-4 text-secondary">FEATURED SERVICES</h1>
                    <p className="text-md text-gray-600 max-w-md">
                        {/* Add any description here */}
                    </p>
                </div>

                {featuredProducts.length > 0 && (
                    <div className="relative w-full mt-8">
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500"
                                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)` }}
                            >
                                {featuredProducts.map((product) => (
                                    <div key={product._id} className={`w-${100 / itemsPerSlide} flex-shrink-0 p-2`}>
                                        <Link to={`/product/${product.slug}`}>
                                            <div className="bg-gray-100 p-4 rounded-lg shadow-lg h-full flex flex-col">
                                                <img 
                                                    src={product.mainImage} 
                                                    alt={product.name} 
                                                    className="w-full h-48 object-cover rounded-md mb-4"
                                                />
                                                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            className="absolute top-1/2 left-[-15px] transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full z-10 w-8 h-8 flex items-center justify-center"
                            onClick={prevSlide}
                        >
                            &lt;
                        </button>
                        <button
                            className="absolute top-1/2 right-[-15px] transform -translate-y-1/2 p-2 bg-gray-500 text-white rounded-full z-10 w-8 h-8 flex items-center justify-center"
                            onClick={nextSlide}
                        >
                            &gt;
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
