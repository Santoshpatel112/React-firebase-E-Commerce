import React, { useContext ,useEffect,useState} from 'react'
import myContext from '../context/data/mycontext';
import Layout from '../components/Layout';
import Modal from '../components/Model';
import { useSelector,useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteFromCart } from '../redux/Cartslice';
import { collection, addDoc } from 'firebase/firestore';
import { fireDB } from '../firebase/Firebase';

function Cart() {
const dispatch=useDispatch();
  const context = useContext(myContext)
  const { mode } = context;
  const cartitem = useSelector((state)=>state.cart);
console.log(cartitem);

const deleteCart = (item) => {
  dispatch(deleteFromCart(item.id))
  toast.success('delete  cart');
}

useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartitem));
}, [cartitem])


const [totalAmount, setTotalAmount] = useState(0);
useEffect(() => {
  let temp = 0;
  cartitem.forEach((cartItem) => {
    temp = temp + parseInt(cartItem.price)
  })
  setTotalAmount(temp);
  console.log(temp)
}, [cartitem])

const shipping = parseInt(100);
const grandTotal = shipping + totalAmount
console.log(grandTotal);


// payment
const [name, setname] = useState('');
const [phonenumber, setphonenumber] = useState('');
const [address, setaddress] = useState('');
const [pincode, setpincode] = useState('');
const buyNow = async () => {
  if (name === "" || phonenumber === "" || address === "" || pincode === "") {
    return toast.error("All fields are required", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  const addressinfo = {
    name,
    address,
    pincode,
    phonenumber,
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  };

  console.log("Address Info:", addressinfo);

  var options = {
    key: "rzp_test_ex3XRuz87M6hSU",
    key_secret: "pIAn2Brh3vGzBwQ9Gm1WpVxw",
    amount: parseInt(grandTotal * 100), // Amount in paise (INR * 100)
    currency: "INR",
    order_receipt: `order_rcptid_${Date.now()}`,
    name: "Bharat-Cart",
    description: "For testing purpose",
    handler: async function (response) {
      try {
        toast.success("Payment Successful");

        const paymentId = response.razorpay_payment_id;
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("user from local storage:", user);

        if (!user || !user.uid || !user.email) {
          throw new Error("Invalid user data from localStorage");
        }

        const orderInfo = {
          cartitem,
          addressinfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          email: user.email,
          userid: user.uid,
          paymentId,
        };

        console.log("orderInfo:", orderInfo);

        // Add order to Firestore
        const orderRef = collection(fireDB, "orders");
        const docRef = await addDoc(orderRef, orderInfo);
        console.log("Order added with ID: ", docRef.id);
        toast.success("Order placed successfully!");
      } catch (error) {
        console.error("Error adding order to Firestore:", error.message);
        toast.error("Failed to create order. Please try again.");
      }
    },
    theme: {
      color: "#3399cc",
    },
  };

  var pay = new window.Razorpay(options);
  pay.open();
  console.log("Payment window opened");
};


  return (
    <Layout >
      <div className="h-screen bg-gray-100 pt-5 mb-[50%] " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '',}}>
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
           {cartitem.map((item,index)=>{
            const {title,price,description,imageUrl}=item
            return(
              <div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
              <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                  <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</h2>
                  <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
                </div>
                <div onClick={()=>{deleteCart(item)}} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>

                </div>
              </div>
            </div>

            )
           })}
          </div>

          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
              </div>
            </div>
            
            {/* // Props passing */}
           <Modal 
name={name} 
address={address} 
pincode={pincode} 
phonenumber={phonenumber} 
setname={setname} 
setaddress={setaddress}         
setpincode={setpincode} 
setphonenumber={setphonenumber} 
buyNow={buyNow} 
/>
           
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
