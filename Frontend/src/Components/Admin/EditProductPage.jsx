import { useState } from "react";


const EditProductPage = () => {
    const [productData,setProductData]=useState({
        name:"",
        description:"",
        price:0,
        countInStock:0,
        sku:"",
        category:"",
        barnd:"",
        sizes:[],
        colors:[],
        collections:"",
        materials:"",
        gender:"",
        images:[
            {
             url:"https://picsum.photos/150?random=1"   
            },
            {
             url:"https://picsum.photos/150?random=1"   
            },
        ]  
    })
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setProductData((prevData)=>({...prevData,[name]:value}))
    }
    const handleImageUpload=async(e)=>{
       const file=e.target.files[0] 
       console.log(file)
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(productData)
    }
    return (
        <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
            <h2 className="text-4xl font-bold mb-6">Edit Product</h2>
            <form onSubmit={handleSubmit}>
                {/* product name */}
                <div className="mb-6">
                  <label className="block font-semibold mb-2">Product Name</label>
                  <input onChange={handleChange} type="text" name="name" value={productData.name} className="w-full border border-gray-300 rounded-md p-2" required/>
                </div>
                {/* description */}
                 <div className="mb-6">
                  <label className="block font-semibold mb-2">Description</label>
                  <textarea onChange={handleChange} name="description" value={productData.description}  className="w-full border border-gray-300 rounded-md p-2" rows={4}></textarea>
                </div>
                {/* price */}
                <div className="mb-5">
                     <label className="block font-semibold mb-2">Price</label> 
                     <input onChange={handleChange} type="number" name="price" value={productData.price} className="w-full border border-gray-300 rounded-md p-2"/>
                </div>
                <div className="mb-5">
                     <label className="block font-semibold mb-2">SKU</label> 
                     <input onChange={handleChange} type="text" name="sku" value={productData.sku} className="w-full border border-gray-300 rounded-md p-2"/>
                </div>
                {/* sizes */}
                <div className="mb-5">
                     <label className="block font-semibold mb-2">Sizes (comma-separated)</label> 
                     <input onChange={(e)=>setProductData({...productData,sizes:e.target.value.split(",").map((size)=>size.trim())})} type="text" name="sizes" value={productData.sizes.join(",")} className="w-full border border-gray-300 rounded-md p-2"/>
                </div>
                {/* colors */}
                <div className="mb-5">
                     <label className="block font-semibold mb-2">Colors (comma-separated)</label> 
                     <input onChange={(e)=>setProductData({...productData,colors:e.target.value.split(",").map((color)=>color.trim())})} type="text" name="colors" value={productData.colors.join(",")} className="w-full border border-gray-300 rounded-md p-2"/>
                </div>
               {/* Image Upload */}
               <div className="mb-6">
                 <label className="block font-semibold mb-2">Upload Image</label>
                 <input onChange={handleImageUpload} type="file" />
                 <div className="flex gap-4 mt-4">
                      {
                        productData.images.map((image,index)=>(
                           <div key={index}>
                                 <img src={image.url} alt={image.altText || "product Image"} className="w-20 h-20 object-cover rounded-md shadow-md"/>
                           </div> 
                        ))
                      }
                 </div>
               </div>
               <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">Update Product</button>
            </form>
        </div>
    );
};

export default EditProductPage;