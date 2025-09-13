
import HeroSection from '../Components/Layouts/HeroSection';
import GenderCollectionSection from '../Components/Products/GenderCollectionSection';
import NewArrivals from '../Components/Products/NewArrivals';
import ProductDetails from '../Components/Products/ProductDetails';


const Home = () => {
  
    return (
        <div>
          <HeroSection/>
          <GenderCollectionSection/>
          <NewArrivals/>
          {/* Best seller section */}
          
          <ProductDetails/>
        </div>
    );
};

export default Home;