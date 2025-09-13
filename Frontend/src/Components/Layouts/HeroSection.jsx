import { Link } from "react-router-dom";
import heroItmg from "../../../public/assets/rabbit-hero.webp"
const HeroSection = () => {
    return (
       <section className="relative">
        <img src={heroItmg} alt="Rabbit" className="w-full h-[400px] md:h-[700px] object-cover"/>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-6">
            <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
                Vacation <br />Ready
                </h1>
                <p className="text-sm tracking md:text-lg mb-6">
                    Explore our vaction-ready outfits with fast worldwide shipping 
                </p>
                <Link to="#" className="bg-white text-gray-950 px-6 py-2 rounded-sm text=lg">
                Shop Now
                </Link>
          </div>
        </div>  
       </section>
    );
};

export default HeroSection;