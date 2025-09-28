import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../Redux/Slices/ProductSlices";
import { addToCart } from "../../Redux/Slices/CartSlices";



const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, similarProduct, error } = useSelector((state) => state.products)
    const { user, guestId } = useSelector((state) => state.auth)
    const [mainImage, setMainImage] = useState()
    const [selectedSize, setSelectedSize] = useState("")
    const [selectedColor, setselectedColor] = useState("")
    const [quantity, setQuantity] = useState(1)
    const [isButtonDisabled, setButtonDisabled] = useState(false)
    const productFetchId = productId || id;
    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }))
        }
    }, [dispatch, productFetchId])
    useEffect(() => {
        if (selectedProduct?.images?.length > 0)
            setMainImage(selectedProduct.images[0].url)
    }, [selectedProduct])
    const handleQuantityChange = (action) => {
        if (action === "plus") setQuantity((prev) => prev + 1)
        if (action === "minus" && quantity > 1) setQuantity((prev) => prev - 1)
    }
    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            toast.error("Please select a size and color beffor add to cart", {
                duration: 1000,
            })
            return;
        }
        setButtonDisabled(true)
        dispatch(
            addToCart({
                productId: productFetchId,
                quantity,
                size: selectedSize,
                guestId,
                userId: user?.id
            })
        )
            .then(() => {
                toast.success("product added to cart!", {
                    duration: 1000,
                })
            })
            .finally(() => {
                setButtonDisabled(false)
            })
    }
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error:{error}</p>
    }
    return (
        <div className="p-6">
            {
                selectedProduct && (
                    <div className="max-w-6xl mx-auto bg-white rounded-lg">
                        <div className="flex flex-col md:flex-row">
                            {/* left thumbbnails */}
                            <div className="hidden md:flex flex-col space-y-4 mr-6">
                                {
                                    selectedProduct.images.map((image, index) => (
                                        <img onClick={() => setMainImage(image?.url)} key={index} src={image.url} alt={image.alltText} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`} />
                                    ))
                                }
                            </div>
                            <div className="md:w-1/2">
                                {/* main image */}
                                <div className="mb-4">
                                    <img src={mainImage} alt="Main Product" className="w-full h-auto object-cover rounded-lg" />
                                </div>
                            </div>
                            {/* Mobile thumbnail */}
                            <div className="md:hidden flex overscroll-x-5 space-x-4 mb-4">
                                {
                                    selectedProduct.images.map((image, index) => (
                                        <img onClick={() => setMainImage(image?.url)} key={index} src={image.url} alt={image.alltText} className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`} />
                                    ))
                                }
                            </div>
                            {/* Right side */}
                            <div className="md:w-1/2 md:ml-10">
                                <h1 className="text-2xl md:text-3xl font-semibold mb-2">{selectedProduct.name}</h1>
                                <p className="text-lg text-gray-600 mb-1 line-through">
                                    {selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
                                </p>
                                <p className="text-xl text-gray-500 mb-2">${selectedProduct.price}</p>
                                <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
                                 <p className="text-gray-700">Color:</p>
                                <div className="flex gap-2 mt-2">
                                    {
                                        selectedProduct.colors.map((color, index) => (
                                            <button key={index}
                                                onClick={() => setselectedColor(color)}
                                                className={`w-8 h-8 rounded-full border ${selectedColor === color ? "border-4 border-black" : "border-gray-300"}`} style={{ backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.5)" }}>
                                            </button>
                                        ))
                                    }
                                </div>
                                <div className="mb-4">
                                    <p className="text-gray-700">Size:</p>
                                    <div className="flex gap-2 mt-2">
                                        {
                                            selectedProduct.sizes.map((size, index) => (
                                                <button key={index}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={`px-4 py-2 rounded border ${selectedSize === size ? "bg-black text-white" : ""}`}>
                                                    {size}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <p className="text-gray-700">Quantity:</p>
                                    <div className="flex items-center space-x-4 mt-2">
                                        <button onClick={() => handleQuantityChange("minus")} className="px-2 py-2 bg-gray-200 rounded text-lg">
                                            -
                                        </button>
                                        <span className="text-lg">{quantity}</span>
                                        <button onClick={() => handleQuantityChange("plus")} className="px-2 py-2 bg-gray-200 rounded text-lg">
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button disabled={isButtonDisabled} onClick={handleAddToCart} className={`bg-black text-white py-2 px-6 rounded w-full mb-4 ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "bg-gray-900"}`}>{isButtonDisabled ? "Adding.." : "Add To Cart"}</button>
                                <div className="mt-10 text-gray-700">
                                    <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                                    <table className="w-full text-left text-sm text-gray-600">
                                        <tbody>
                                            <tr>
                                                <td className="py-1">Brand</td>
                                                <td className="py-1">{selectedProduct.brand}</td>
                                            </tr>
                                            <tr>
                                                <td className="py-1">Material</td>
                                                <td className="py-1">{selectedProduct.material}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="mt-20">
                            <h2 className="text-2xl text-center font-medium mb-4">You May Also Like</h2>
                            <ProductGrid products={similarProduct} loading={loading} error={error}/>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default ProductDetails;