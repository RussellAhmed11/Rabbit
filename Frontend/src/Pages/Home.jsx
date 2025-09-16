
import HeroSection from '../Components/Layouts/HeroSection';
import FeaturedCollection from '../Components/Products/FeaturedCollection';
import FeatureSection from '../Components/Products/FeatureSection';
import GenderCollectionSection from '../Components/Products/GenderCollectionSection';
import NewArrivals from '../Components/Products/NewArrivals';
import ProductDetails from '../Components/Products/ProductDetails';
import ProductGrid from '../Components/Products/ProductGrid';

const placeholderProducts = [
    {
        _id: 1,
        name: "product 1",
        price: 175,
        image: [{ url: "https://picsum.photos/500/500?random=9" }]
    },
    {
        _id: 2,
        name: "product 2",
        price: 100,
        image: [{ url: "https://picsum.photos/500/500?random=10" }]
    },
    {
        _id: 3,
        name: "product 3",
        price: 100,
        image: [{ url: "https://picsum.photos/500/500?random=11" }]
    },
    {
        _id: 4,
        name: "product 5",
        price: 100,
        image: [{ url: "https://picsum.photos/500/500?random=12" }]
    },
    {
        _id: 5,
        name: "product 1",
        price: 85,
        image: [{ url: "https://picsum.photos/500/500?random=13" }]
    },
    {
        _id: 6,
        name: "product 2",
        price: 100,
        image: [{ url: "https://picsum.photos/500/500?random=16" }]
    },
    {
        _id: 7,
        name: "product 7",
        price: 75,
        image: [{ url: "https://picsum.photos/500/500?random=14" }]
    },
    {
        _id: 8,
        name: "product 8",
        price: 125,
        image: [{ url: "https://picsum.photos/500/500?random=15" }]
    },
]
const Home = () => {

    return (
        <div>
            <HeroSection />
            <GenderCollectionSection />
            <NewArrivals />
            {/* Best seller section */}
            <div>
                <h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2> 
                  <ProductDetails />
            </div>
          
            <div className='container mx-auto'>
                <h2 className='text-3xl text-center font-bold mb-4'>Top Wears For Women</h2>
                <ProductGrid products={placeholderProducts} />
            </div>
            <FeaturedCollection />
            <FeatureSection />
        </div>
    );
};

export default Home;