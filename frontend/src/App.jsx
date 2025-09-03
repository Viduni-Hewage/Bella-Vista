import { Routes, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Home from './pages/homePage';
import ShopByCategory from './pages/shopByCategory';
import Login from './pages/login';
import SignUp from './pages/signUp';
import WorldOfBellaVista from './pages/worldOfBellaVista';

const App = () => {
  return (
    <Routes>      
        
      <Route index element={<Home />} />  
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />

     
      <Route path="/" element={<Layout />}>        
        <Route path="shop-by category" element={<ShopByCategory />} />
        <Route path="world" element={<WorldOfBellaVista />} />
       
      </Route>

    </Routes>
  );
};

export default App;
