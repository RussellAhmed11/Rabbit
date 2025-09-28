
import { useDispatch, useSelector } from 'react-redux';
import HeroSection from '../Components/Layouts/HeroSection';
import FeaturedCollection from '../Components/Products/FeaturedCollection';
import FeatureSection from '../Components/Products/FeatureSection';
import GenderCollectionSection from '../Components/Products/GenderCollectionSection';
import NewArrivals from '../Components/Products/NewArrivals';
import ProductDetails from '../Components/Products/ProductDetails';
import ProductGrid from '../Components/Products/ProductGrid';
import { useEffect, useState } from 'react';
import { fetchProductsByFilters } from '../Redux/Slices/ProductSlices';
import axios from 'axios';

const Home = () => {
const dispatch=useDispatch();
const {products,loading,error}=useSelector((state)=>state.products);
const [bestSellerProduct,setBestSellerProduct]=useState(null)
useEffect(()=>{
    // fetch product by filters
    dispatch(fetchProductsByFilters({
        gender:"Women",
        category:"Bottom Wear",
        limit:8,
    }));
    // fetch best seller products
    const fetchBestSeller=async()=>{
        try{
           const response=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`)
           setBestSellerProduct(response.data)
        }catch(error){
            console.log(error)
        }
    }
    fetchBestSeller()
},[dispatch])
    return (
        <div>
            <HeroSection />
            <GenderCollectionSection />
            <NewArrivals />
            {/* Best seller section */}
            <div>
                <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2> 
                 {bestSellerProduct ? (<ProductDetails productId={bestSellerProduct._id}/>):(
                   <p className='text-center'>Loading Best seller product</p>
                 )}
            </div>
          
            <div className='container mx-auto'>
                <h2 className='text-3xl text-center font-bold mb-4'>Top Wears For Women</h2>
                <ProductGrid products={products} loading={loading} error={error}/>
            </div>
            <FeaturedCollection />
            <FeatureSection />
        </div>
    );
};

export default Home;