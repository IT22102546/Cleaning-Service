import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import { FaPlayCircle } from "react-icons/fa";

export default function PostProduct() {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainMediaIndex, setMainMediaIndex] = useState(0); // Default to 0
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/getproducts?slug=${productSlug}`);

        if (!res.ok) {
          const errorMessage = await res.text();
          setError(errorMessage);
          setLoading(false);
          return;
        }

        const data = await res.json();
        if (data.products.length === 0) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        setProduct(data.products[0]);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug]);

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart({ product, userId: user.id }));
      showNotification("Product added to the cart");
    } else {
      console.log("User not logged in");
    }
  };

  const showNotification = (message) => {
    setNotification({ visible: true, message });
    setTimeout(() => {
      setNotification({ visible: false, message: "" });
    }, 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Alert color="failure">{error}</Alert>;
  }

  // Combine images and video into a single media array, prioritizing the video
  let media = product.images ? [...product.images] : [];
  if (product.video) {
    media.unshift(product.video); // Add video to the beginning of the media array
  }

  return (
    <div className="relative bg-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center mt-20">
          <section className="hero-section"></section>
          <div className="p-3 max-w-5xl mx-auto min-h-screen">
            {notification.visible && (
              <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md">
                {notification.message}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex flex-col gap-4 sm:w-1/3">
                {media.map((mediaItem, index) => (
                  <div
                    key={index}
                    className="relative cursor-pointer"
                    onClick={() => setMainMediaIndex(index)}
                  >
                    {index === 0 && product.video ? (
                      <div className="relative">
                        <video
                          className={`h-56 w-full object-cover ${
                            index === mainMediaIndex
                              ? "border-4 border-secondary"
                              : "border"
                          }`}
                          autoPlay
                          muted
                          loop
                        >
                          <source src={mediaItem} type="video/mp4" />
                        </video>
                        {/* Video Icon Overlay */}
                        <FaPlayCircle className="absolute inset-0 m-auto text-white text-6xl opacity-75" />
                      </div>
                    ) : (
                      <img
                        src={mediaItem}
                        alt={`Product Media ${index + 1}`}
                        className={`h-56 w-full object-cover ${
                          index === mainMediaIndex
                            ? "border-4 border-secondary"
                            : "border"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="sm:w-2/3">
                {mainMediaIndex === 0 && product.video ? (
                  <video className="w-full h-72 object-cover" controls autoPlay muted>
                    <source src={media[mainMediaIndex]} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={media[mainMediaIndex]}
                    alt={product.title}
                    className="w-full h-72 object-cover"
                  />
                )}
                <h1 className="text-3xl my-7 font-semibold">{product.title}</h1>
                <p>{product.description}</p>
               {/*} <div className="flex flex-col gap-4 sm:flex-row justify-between mt-4">
                  <span>Price: Rs. {product.price}</span>
                  
                </div>*/}
                <div className="flex items-center mt-4 gap-2">
                  
                </div>
                <Link to="/book-service">
                  <Button className="bg-secondary w-full py-2 text-xl">
                    Book this Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
