import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Components/Layouts/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./Components/Products/ProductDetails";
import CheckOut from "./Components/Cart/CheckOut";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";


const App = () => {
  return (
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
       <Route index element={<Home/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="register" element={<Register/>}/>
       <Route path="profile" element={<Profile/>}/>
       <Route path="collections/:collection" element={<CollectionPage/>}/>
       <Route path="product/:id" element={<ProductDetails/>}/>
       <Route path="checkout" element={<CheckOut/>}/>
       <Route path="order-confirmation" element={<OrderConfirmationPage/>}/>
      </Route>
     
    </Routes>
    </BrowserRouter>
  );
};

export default App;