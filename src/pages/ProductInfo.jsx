import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import myContext from "../context/data/mycontext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../redux/Cartslice";

function ProductInfo() {
  const context = useContext(myContext);
  const { mode, product } = context;
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    // Find the product by ID
    const selectedProduct = product.find((item) => item.id === id);
    setProductDetails(selectedProduct);
  }, [id, product]);

  const addCart = () => {
    if (productDetails) {
      dispatch(addToCart(productDetails));
      toast.success('Added to cart');
    }
  };

  // Prevent rendering if product is not found
  if (!productDetails) {
    return (
      <Layout>
        <div 
          className="flex justify-center items-center h-screen text-2xl"
          style={{ color: mode === "dark" ? "white" : "black" }}
        >
          Loading product details...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div 
        className="min-h-screen py-8" 
        style={{ 
          backgroundColor: mode === "dark" ? "#282c34" : "white",
          color: mode === "dark" ? "white" : "black"
        }}
      >
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt={productDetails.title}
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={productDetails.imageUrl}
                style={{
                  boxShadow: mode === "dark" ? "0 4px 6px rgba(255,255,255,0.1)" : "0 4px 6px rgba(0,0,0,0.1)"
                }}
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 
                  className="text-sm title-font tracking-widest"
                  style={{ 
                    color: mode === "dark" ? "lightgray" : "gray" 
                  }}
                >
                  {productDetails.category}
                </h2>
                <h1 
                  className="text-3xl title-font font-medium mb-1"
                  style={{ 
                    color: mode === "dark" ? "white" : "black" 
                  }}
                >
                  {productDetails.title}
                </h1>
                
                <p 
                  className="leading-relaxed border-b-2 mb-5 pb-5"
                  style={{ 
                    color: mode === "dark" ? "rgba(255,255,255,0.8)" : "black",
                    borderColor: mode === "dark" ? "rgba(255,255,255,0.2)" : "gray-200"
                  }}
                >
                  {productDetails.description}
                </p>

                <div className="flex items-center">
                  <span 
                    className="title-font font-medium text-2xl"
                    style={{ 
                      color: mode === "dark" ? "white" : "black" 
                    }}
                  >
                    ₹{productDetails.price}
                  </span>
                  <button 
                    onClick={addCart}
                    className="flex ml-auto text-white bg-pink-600 border-0 py-2 px-6 focus:outline-none hover:bg-pink-700 rounded"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default ProductInfo;