import React, { useState, useEffect  } from 'react';
import myContext from './mycontext';
import { fireDB } from "../../firebase/Firebase";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, deleteDoc, doc, setDoc,getDocs} from 'firebase/firestore';
import { toast } from 'react-toastify';
const MyState = (props) => {
  const [mode, setMode] = useState('light');  // Defaulting to 'light'

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const [loading, setLoading] = useState(false);

 
  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  // ********************** Add Product Section  **********************
  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error('Please fill all fields')
    }
    const productRef = collection(fireDB, "products")// product ref  creat DB name 
    setLoading(true)
    try {
      await addDoc(productRef, products)// collection (DBname,collection name)
      toast.success("Product Add successfully") // send message to toastify ('product add successfully')
      setTimeout(() => {
        window.location.href='/Dashboard'
      }, 800);
      getProductData()// call getProductData
      closeModal() 
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    setProducts("")
  }

  const [product, setProduct] = useState([]);

  // ****** get product******************\\
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"), // refrence 1st part is db name and 2nd part is collection name
        orderBy("time"), // sort data by time
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = []; // make the empty Array to store the data
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray) // set the data in to the state
        setLoading(false);
      }); 
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.message);
    }
  }

  // make a useEffect callback for it work on pagerefress
  useEffect(() => {
    getProductData();
  }, []);


// *********Update Product**********

  const edithandle = (item) => {
    setProducts(item)
  }
  // update product
  const updateProduct = async (item) => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products); // (basicaly take doc and data) -> database collection and product id
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      setTimeout(() => {
        window.location.href = '/Dashboard'
      }, 800);
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }
// *********Delete Product**********
const deleteProduct = async (item) => {
  try {
    setLoading(true)
    await deleteDoc(doc(fireDB, "products", item.id));
    toast.success('Product Deleted successfully')
    getProductData() // Refresh the product list
  } catch (error) {
    console.error("Delete error:", error);
    toast.error('Product Deletion Failed')
  } finally {
    setLoading(false)
  }
}


//****Order page ***********/

const [order, setOrder] = useState([]);

const getOrderData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB, "orders"))
    
    if (result.empty) {
      console.log("No orders found in the database");
      setOrder([]);
      return;
    }

    const ordersArray = result.docs.map(doc => {
      const orderData = doc.data();
      
      // Normalize address info with multiple fallbacks
      const addressInfo = {
        name: orderData.name || 
              orderData.addressinfo?.name || 
              orderData.addressInfo?.name || 
              'N/A',
        address: orderData.address || 
                 orderData.addressinfo?.address || 
                 orderData.addressInfo?.address || 
                 'N/A',
        phone: orderData.phone || 
               orderData.addressinfo?.phone || 
               orderData.addressInfo?.phone || 
               'N/A',
        email: orderData.email || 
               orderData.addressinfo?.email || 
               orderData.addressInfo?.email || 
               'N/A',
        pincode: orderData.pincode || 
                 orderData.addressinfo?.pincode || 
                 orderData.addressInfo?.pincode || 
                 'N/A'
      };

      // Normalize cart items with multiple fallbacks
      const cartitem = Array.isArray(orderData.cartitem) 
        ? orderData.cartitem 
        : (orderData.cartItems || orderData.cart || []);

      // Comprehensive logging
      console.group(`Order Debug - ID: ${doc.id}`);
      console.log("Raw Order Data:", orderData);
      console.log("Normalized Address Info:", addressInfo);
      console.log("Cart Items:", cartitem);
      console.groupEnd();

      return {
        ...orderData,
        id: doc.id,
        addressinfo: addressInfo,
        cartitem: cartitem.map(item => ({
          title: item.title || 'N/A',
          description: item.description || 'N/A',
          category: item.category || 'N/A',
          imageUrl: item.imageUrl || 'https://via.placeholder.com/150',
          price: item.price || 0
        })),
        date: orderData.date || new Date().toLocaleString()
      };
    });
    
    console.log("Total Processed Orders:", ordersArray.length);
    setOrder(ordersArray);
  } catch (error) {
    console.error("Comprehensive Order Fetch Error:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    toast.error("Failed to fetch orders. Please check console for details.");
    setOrder([]); 
  } finally {
    setLoading(false)
  }
}

const [user, setUser] = useState([]);

const getUserData = async () => {
  setLoading(true)
  try {
    // Try multiple collection names
    const collectionNames = ['user', 'users', 'Users', 'User'];
    let usersArray = [];

    for (const collName of collectionNames) {
      try {
        const result = await getDocs(collection(fireDB, collName));
        
        console.group(`Attempting to fetch from collection: ${collName}`);
        console.log("Number of documents:", result.docs.length);

        if (result.docs.length > 0) {
          usersArray = result.docs.map(doc => {
            const userData = doc.data();
            
            // Date handling with multiple fallback mechanisms
            const extractDate = () => {
              const datePaths = [
                userData.date,
                userData.createdAt,
                userData.timestamp,
                userData.created,
                userData.registeredAt
              ];

              for (let dateValue of datePaths) {
                if (dateValue) {
                  // If it's a Firestore Timestamp
                  if (dateValue.toDate) {
                    return dateValue.toDate().toLocaleString();
                  }
                  
                  // If it's a string or number timestamp
                  const parsedDate = new Date(dateValue);
                  if (!isNaN(parsedDate)) {
                    return parsedDate.toLocaleString();
                  }
                }
              }

              // Fallback to current date if no date found
              return new Date().toLocaleString();
            };

            console.log(`User Document from ${collName}:`, {
              id: doc.id,
              data: userData
            });

            return {
              ...userData,
              id: doc.id,
              date: extractDate()
            };
          });

          // If we find documents, break the loop
          if (usersArray.length > 0) {
            console.log(`Successfully retrieved users from ${collName}`);
            break;
          }
        }
        console.groupEnd();
      } catch (collectionError) {
        console.error(`Error fetching from collection ${collName}:`, collectionError);
      }
    }

    // Final logging
    console.group("Final User Data");
    console.log("Total Users Retrieved:", usersArray.length);
    console.log("User Data:", usersArray);
    console.groupEnd();

    setUser(usersArray);
    setLoading(false);
  } catch (error) {
    console.error("Comprehensive User Fetch Error:", {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    toast.error("Failed to fetch users. Please check console for details.");
    setUser([]); 
    setLoading(false);
  }
}

const [searchkey, setsearchkey] = useState('')
const [filterType, setfilterType] = useState('')
const [filterPrice, setfilterPrice] = useState('')

useEffect(() => {
  getProductData();
  getOrderData();
  getUserData();

}, []);



  return (
    <myContext.Provider value={{ mode, toggleMode, loading ,setLoading,products,setProducts,product,setProduct,addProduct,edithandle,updateProduct,deleteProduct ,order,user ,searchkey,setsearchkey,filterType,setfilterType,filterPrice,setfilterPrice}}>
      {props.children}
    </myContext.Provider>
  );
};

export default MyState;
