import React, { useContext, useEffect } from "react";
import myContext from "../context/data/mycontext";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart ,deleteFromCart} from "../redux/Cartslice"; // Correct import

// function ProductCard() {
//   const context = useContext(myContext);
//   const { mode, product ,searchkey,filterType,filterPrice } = context;

//   const dispatch = useDispatch();
//   const cartItem = useSelector((state) => state.cart);

// useEffect(()=>{
//   localStorage.setItem('cart',JSON.stringify(cartItem));
// })
//   const handleAddToCart = (product) => {
//     // Check if product is already in cart
//     const isProductInCart = cartItem.some(item => item.id === product.id);
    
//     if (isProductInCart) {
//       toast.info("Product already in cart", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "colored",
//       });
//     } else {
//       dispatch(addToCart(product));
//       toast.success("Item added to cart", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: true,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//       });
//     }
//   };

//   return (
//     <section className="text-gray-600 body-font">
//       <div className="container px-5 py-8 md:py-16 mx-auto">
//         <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
//           <h1
//             className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
//             style={{ color: mode === "dark" ? "white" : "" }}
//           >
//             Our Latest Collection
//           </h1>
//           <div className="h-1 w-20 bg-pink-600 rounded"></div>
//         </div>

//         <div className="flex flex-wrap -m-4">
//           {product
//             .filter((obj) =>
//               obj.title.toLowerCase().includes(searchkey.toLowerCase())
//             )
//             .filter((obj) => obj.category === filterType)
//             .filter((obj) => obj.price <= filterPrice)
//             .map((item, index) => {
//               const { title, price, description, imageUrl } = item;
//               return (
//                 <div
//                   className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
//                   style={{
//                     backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
//                     color: mode === "dark" ? "white" : "",
//                   }}
//                 >
//                   <div className="flex justify-center cursor-pointer">
//                     <img
//                       className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out"
//                       src={imageUrl}
//                       alt="blog"
//                     />
//                   </div>
//                   <div className="p-5 border-t-2">
//                     <h2
//                       className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
//                       style={{ color: mode === "dark" ? "white" : "" }}
//                     >
//                       BharatCart
//                     </h2>
//                     <h1
//                       className="title-font text-lg font-medium text-gray-900 mb-3"
//                       style={{ color: mode === "dark" ? "white" : "" }}
//                     >
//                       {title}
//                     </h1>
//                     <p
//                       className="leading-relaxed mb-3"
//                       style={{ color: mode === "dark" ? "white" : "" }}
//                     >
//                       ₹{price}
//                     </p>
//                     <div className="flex justify-center">
//                       <button
//                         onClick={() => handleAddToCart(item)}
//                         type="button"
//                         className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
//                       >
//                         Add To Cart
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

function ProductCard() {
  const context = useContext(myContext);
  const { 
    mode, 
    product, 
    searchkey = '', 
    filterType = '', 
    filterPrice = '' 
  } = context;

  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);

  const addCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added to cart');
  };

  // Comprehensive filtering function
  const filteredProducts = product.filter((item) => {
    // Search key filter (case-insensitive)
    const matchesSearch = item.title.toLowerCase().includes(searchkey.toLowerCase());

    // Category filter (handle empty filterType)
    const matchesCategory = !filterType || item.category.toLowerCase() === filterType.toLowerCase();

    // Price filter (handle empty filterPrice)
    const matchesPrice = !filterPrice || 
      (filterPrice === 'low' && parseFloat(item.price) < 500) ||
      (filterPrice === 'medium' && parseFloat(item.price) >= 500 && parseFloat(item.price) < 1000) ||
      (filterPrice === 'high' && parseFloat(item.price) >= 1000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div>
      <div className="flex justify-center" style={{ backgroundColor: mode === "dark" ? "#282c34" : "" }}>
        <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
          {/* Title Section */}
          <div className="main-heading mb-8">
            <h2 
              className="text-3xl lg:text-4xl font-bold leading-10 text-black text-center"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              Our Latest Collection
            </h2>
          </div>

          <div className="flex flex-wrap -m-4">
            {filteredProducts.length === 0 ? (
              <div 
                className="w-full text-center py-10"
                style={{ color: mode === "dark" ? "white" : "black" }}
              >
                No products found matching your filters.
              </div>
            ) : (
              filteredProducts.map((item, index) => {
                const { title, price, description, imageUrl, id } = item;
                return (
                  <div 
                    key={id || index} 
                    className="p-4 md:w-1/4 drop-shadow-lg"
                    onClick={() => window.location.href = `/productinfo/${id}`}
                  >
                    <div 
                      className="h-full border-2 hover:shadow-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                      style={{
                        backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', 
                        color: mode === 'dark' ? 'white' : ''
                      }}
                    >
                      <div className="flex justify-center cursor-pointer">
                        <img 
                          className="rounded-2xl w-full h-80 p-2 hover:scale-110 transition-scale-110 duration-300 ease-in-out" 
                          src={imageUrl} 
                          alt={title} 
                        />
                      </div>
                      <div className="p-5 border-t-2">
                        <h2 
                          className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          E-Bharat
                        </h2>
                        <h1 
                          className="title-font text-lg font-medium text-gray-900 mb-3"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {title}
                        </h1>
                        <p 
                          className="leading-relaxed mb-3"
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          ₹{price}
                        </p>
                        <div className="flex justify-center">
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent navigation when adding to cart
                              addCart(item);
                            }}
                            className="focus:outline-none text-white bg-pink-600 hover:bg-pink-700 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2"
                          >
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductCard;