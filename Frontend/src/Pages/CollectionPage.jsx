import { useEffect, useState } from "react";
import {FaFilter} from "react-icons/fa"
import FilterSidebar from "../Components/Products/FilterSidebar";
import { useRef } from "react";
import SortOptions from "../Components/Products/SortOptions";
import ProductGrid from "../Components/Products/ProductGrid";

const CollectionPage = () => {
    const [products, setProduct] = useState([])
    const sidebarRef=useRef(null)
    const [isSiderbarOpen,setIsSidebarOpen]=useState(false)
    const toggleSidebar=()=>{
      setIsSidebarOpen(!isSiderbarOpen)  
    }
    const handleClickOutside=(e)=>{
       if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
        setIsSidebarOpen(false)
       }
    }
    useEffect(()=>{
        // add event listener
        document.addEventListener('mousedown',handleClickOutside)
        // remove event listener
        return ()=>{
            document.removeEventListener('mousedown',handleClickOutside)
        }
    },[])
    useEffect(() => {
        setTimeout(() => {
            const fetchedProducts = [
                {
                    _id: 1,
                    name: "product 1",
                    price: 65,
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
                    price: 95,
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
                    price: 60,
                    image: [{ url: "https://picsum.photos/500/500?random=15" }]
                },
            ]
            setProduct(fetchedProducts)
        },1000)
    }, [])
    return (
        <div className="flex flex-col lg:flex-row">
            {/* Mobile filter button */}
            <button onClick={toggleSidebar} className="lg:hidden border p-2 flex justify-center items-center">
               <FaFilter className="mr-2"/>Filters
            </button>
            {/* filter sidebar */}
            <div ref={sidebarRef} className={`${isSiderbarOpen ? "translate-x-0":"-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}>
                <FilterSidebar/>
            </div>
            <div className="flex-grow p-4">
                <h2 className="text-2xl uppercase mb-4">All Collection</h2>
                {/* sort options */}
                <SortOptions/>
                <ProductGrid products={products}/>
            </div>
        </div>
    );
};

export default CollectionPage;