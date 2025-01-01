import { Fragment, useContext, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { BsFillCloudSunFill } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import myContext from '../context/data/mycontext';
import { useSelector } from "react-redux";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const context = useContext(myContext);
  const { toggleMode, mode } = context;

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [mode]);

  const user = JSON.parse(localStorage.getItem('user'));

  const logoutUser = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

const cartItem = useSelector((state) => state.cart);
  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel
                className={`relative flex w-full max-w-xs flex-col overflow-y-auto pb-12 shadow-xl ${mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
              >
                <div className="flex items-center justify-between px-4 pt-6">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button
                    type="button"
                    className="rounded-md p-2 text-gray-400 hover:text-gray-600"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross2 size={24} />
                  </button>
                </div>
                <div className="flex flex-col px-4 py-14 space-y-4">
                  <Link
                    to="/allproducts"
                    className="text-lg hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    All Products
                  </Link>
                  {user ? <Link
                    to="/order"
                    className="text-lg hover:underline"
                    onClick={() => setOpen(false)}
                  >
                    Order
                  </Link> : ""}
                  {user?.email === 'santoshpatelvns5@gmail.com' && (
                    <Link
                      to="/Dashboard"
                      className="text-lg hover:underline"
                    >
                      Admin
                    </Link>
                  )}
                  {user ? (
                    <button
                      onClick={() => {
                        logoutUser();
                        setOpen(false);
                      }}
                      className="text-lg hover:underline self-start"
                    >
                      Logout
                    </button>
                  ) : null}
                  <div className="flex items-center gap-2 mt-4">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt="India Flag"
                      className="w-6 h-auto"
                    />
                    <span className="text-lg">INDIA</span>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop menu */}
      <header className="relative bg-white">
        {/* <p
          className={`flex h-10 items-center justify-center px-4 text-sm font-medium ${
            mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-pink-600 text-white'
          }`}
        >
          Get free delivery on orders over ₹300
        </p> */}

        <nav
          className={`px-4 sm:px-6 lg:px-8 shadow-xl ${
            mode === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'
          }`}
        >
          <div className="flex h-16 items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md hover:bg-gray-200"
              onClick={() => setOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>

            <div className="ml-4 flex">
              <Link to="/" className="text-2xl font-bold">
              BharatCart 
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:items-center lg:space-x-6">
                <Link to="/allproducts" className="text-sm font-medium hover:underline">
                  All Products
                </Link>
                {user ? <Link to="/Order" className="text-sm font-medium hover:underline">
                  Order
                </Link> : ""}
                {user?.email === 'santoshpatelvns5@gmail.com' && (
                  <Link to="/dashboard" className="text-sm font-medium hover:underline">
                    Admin
                  </Link>
                )}
                {user && (
                  <button
                    onClick={logoutUser}
                    className="text-sm font-medium hover:underline"
                  >
                    Logout
                  </button>
                )}
              </div>
              <div className="hidden lg:flex items-center gap-2 ml-6">
                <img
                  src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                  alt="India Flag"
                  className="w-6 h-auto"
                />
                <span>INDIA</span>
              </div>

              {/* Theme Toggler */}
              <div className="ml-6 flex items-center">
                <button onClick={toggleMode}>
                  {mode === 'light' ? (
                    <FiSun size={30} className="text-yellow-500" />
                  ) : (
                    <BsFillCloudSunFill size={30} className="text-blue-500" />
                  )}
                </button>
              </div>

              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-6">
                <Link to="/cart" className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '' }}>{cartItem.length}</span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
