import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Button, TextInput } from "flowbite-react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import { Link } from "react-router-dom";

export default function PostProduct() {
  const { productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/products/getproducts?slug=${productSlug}`
        );

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
                {product.images &&
                  product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Product Image ${index + 1}`}
                      className={`hidden md:block cursor-pointer h-56 w-full object-cover ${
                        index === mainImageIndex
                          ? "border-4 border-secondary"
                          : "border"
                      }`}
                      onClick={() => setMainImageIndex(index)}
                    />
                  ))}
              </div>
              <div className="sm:w-2/3">
                <img
                  src={product.images[mainImageIndex]}
                  alt={product.title}
                  className="w-full h-72 object-cover"
                />
                <h1 className="text-3xl my-7 font-semibold">{product.title}</h1>
                <p>{product.description}</p>
                <div className="flex flex-col gap-4 sm:flex-row justify-between mt-4">
                  {/* <span>Price: Rs. {product.price}</span> */}
                  
                </div>
                <div className="flex items-center mt-4 gap-2">
                  
                </div>
                  <Link to='/book-service'>
                    <Button className="bg-secondary w-full py-2 text-xl">Book this Service</Button>
                  </Link>

              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="flex flex-col gap-4">
                {product.reviews &&
                  product.reviews.map((review, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{review.author}</span>
                        <span className="text-sm">{review.date}</span>
                      </div>
                      <p>{review.content}</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {product.similarProducts &&
                  product.similarProducts.map((similarProduct, index) => (
                    <div key={index} className="border p-4 rounded-md">
                      <img
                        src={similarProduct.image}
                        alt={similarProduct.title}
                        className="w-full h-48 object-cover mb-4"
                      />
                      <h3 className="text-lg font-semibold">
                        {similarProduct.title}
                      </h3>
                      <span>Price: Rs. {similarProduct.price}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
