import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./Components/Layouts/UserLayout";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLayout/>}></Route>
      <Route>admin route</Route>
    </Routes>
    </BrowserRouter>
  );
};

export default App;