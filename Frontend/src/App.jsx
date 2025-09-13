import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Components/Layouts/UserLayout";
import Home from "./Pages/Home";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout/>}>
       <Route index element={<Home/>}></Route>
      </Route>
     
    </Routes>
    </BrowserRouter>
  );
};

export default App;