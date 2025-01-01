import React from 'react'
import {BrowserRouter as  Router ,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import Home from './pages/Home'
import Order from './pages/Order';
import Cart from './pages/Cart';
import Dashboard from './pages/Dashboard';
import Nopage from './pages/Nopage';
import Allproduct from './pages/Allproduct';
import MyState from './context/data/myState';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProductInfo from './pages/ProductInfo';
import Addproduct from './pages/Addproduct';
import Updateproduct from './pages/Updateproduct';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {


  return (
    <>
      <>
      <MyState >
        <Router>
        <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/Order' element={
          <ProctedRoute>
            <Order/>
          </ProctedRoute>
        }/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/Dashboard' element={
          <ProctedAdminRoute>
            <Dashboard/>
          </ProctedAdminRoute>
        } />
        <Route  path='/allproducts' element={<Allproduct/>}/>
        <Route  path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/productinfo/:id' element={<ProductInfo/>} />
        <Route path='/addproduct' element={
          <ProctedAdminRoute>
            <Addproduct/>
          </ProctedAdminRoute>
        }/>
        <Route  path='/updateproduct' element={
          <ProctedAdminRoute>
            <Updateproduct/>
          </ProctedAdminRoute>
        }/>
        <Route path='/*' element={<Nopage/>}/>
        </Routes>
      </Router>
      <ToastContainer />
      </MyState>
    </>
     
    </>
  )
}

export default App


// procted Route if user is not logged in then show login page
// User
// export const ProctedRoute = ({children}) => {
//   const user = localStorage.getItem('user');
//   if(user){
//     return children
//   }
//   else{
//     return <Navigate to='/login'/>
//   }
// }
export const ProctedRoute = ({children}) => {
  const userString = localStorage.getItem('user');
  if(userString){
    try {
      const user = JSON.parse(userString);
      return user ? children : <Navigate to='/login'/>
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      return <Navigate to='/login'/>
    }
  }
  return <Navigate to='/login'/>
}


//Admin
export const ProctedAdminRoute = ({children}) => {
  const userString = localStorage.getItem('user');
  if(userString){
    try {
      const user = JSON.parse(userString);
      // Check multiple possible structures of user object
      const adminEmail = user.email || user.user?.email;
      
      if(adminEmail === 'santoshpatelvns5@gmail.com'){
        return children
      }
      else{
        return <Navigate to='/'/>
      }
    } catch (error) {
      console.error("Error parsing user data", error);
      return <Navigate to='/login'/>
    }
  }
  else{
    return <Navigate to='/login'/>
  }
}


//Admin
// export const ProctedAdminRoute = ({children}) => {
//   const user = localStorage.getItem('user');
//   if(user){
//     const Admin = JSON.parse(user);
//     if(Admin.user.email === 'santoshpatelvns5@gmail.com'){
//       return children
//     }
//     else{
//       return <Navigate to='/'/>
//     }
//   }
//   else{
//     return <Navigate to='/login'/>
//   }
// }
