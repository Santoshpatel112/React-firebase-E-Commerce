import React, { useContext, useEffect } from 'react'
import myContext from '../context/data/mycontext'
import Layout from '../components/Layout'
import Loader from '../components/Loader'

function Order() {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const userid = user?.uid || user?.user?.uid;

  const context = useContext(myContext)
  const { mode, loading, order = [] } = context

  // Debug logging
  useEffect(() => {
    console.log("User ID:", userid);
    console.log("Total Orders:", order.length);
    console.log("User Orders:", order.filter(obj => obj.userid === userid));
  }, [userid, order]);

  // Filter orders for the current user
  const userOrders = order.filter(obj => obj.userid === userid);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : userOrders.length > 0 ? (
        <div className="h-full pt-10">
          {userOrders.map((order, orderIndex) => (
            <div 
              key={orderIndex} 
              className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 mb-6"
            >
              {order.cartitem?.map((item, itemIndex) => (
                <div key={itemIndex} className="rounded-lg md:w-2/3 mb-4">
                  <div 
                    className="justify-between rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start" 
                    style={{ 
                      backgroundColor: mode === 'dark' ? '#282c34' : '', 
                      color: mode === 'dark' ? 'white' : '', 
                    }}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt="product-image" 
                      className="w-full rounded-lg sm:w-40" 
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 
                          className="text-lg font-bold text-gray-900" 
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {item.title}
                        </h2>
                        <p 
                          className="mt-1 text-xs text-gray-700" 
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {item.description}
                        </p>
                        <p 
                          className="mt-1 text-xs text-gray-700" 
                          style={{ color: mode === 'dark' ? 'white' : '' }}
                        >
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h2 className="text-center text-2xl text-gray-600">
            You have no orders yet. Start shopping!
          </h2>
        </div>
      )}
    </Layout>
  )
}

export default Order