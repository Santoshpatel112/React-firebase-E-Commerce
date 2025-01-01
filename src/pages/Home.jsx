import React from 'react'
import Layout from '../components/Layout'
import HeroSection from '../components/Herosection';
import Filter from '../components/Filter';
import Productcard from '../components/Productcard'
import Track from '../components/Track';
import Testimonial from '../components/Testimonial';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart,deleteFromCart } from '../redux/Cartslice';
const Home = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
   
  return (
    <Layout >
       {/* <div className="flex gap-5 justify-center">
        <button className=' bg-gray-300 p-5' onClick={()=> addCart()}>add</button>
        <button className=' bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button>
      </div> */}
        <HeroSection />
        <Filter/>
       <Productcard/>
       <Track/>
       <Testimonial/>
      
    </Layout>
  )
}

export default Home
