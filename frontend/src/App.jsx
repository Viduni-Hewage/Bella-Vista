import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import Layout from './hoc/Layout';
import Home from './pages/homePage';
import ShopByCategory from './pages/shopByCategory';
import Login from './pages/login';
import SignUp from './pages/signUp';
import WorldOfBellaVista from './pages/worldOfBellaVista';
import News from './pages/news';
import ErrorPage from './pages/404';
import SuccessTransaction from './pages/successTransaction';
import Jewelry from './pages/categories/jewelry';
import Watches from './pages/categories/watches';
import Accessories from './pages/categories/accessories';
import Decorations from './pages/categories/decorations';
import CartPage from './pages/cart';
import CardPayment from './pages/cardPayment';
import ProductDetail from './component/productDetail';
import CodPayment from './pages/codPayment';
import HistoryPage from './pages/history';
import Auth0CallbackHandler from './component/auth0CallbackHandler';
import ProfilePage from './pages/profile';
import SummaryPage from './pages/orderSummary';

const App = () => {
  return (

    <>
      <ScrollToTop />
      <Routes>      
        
        <Route index element={<Home />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<ErrorPage />} />
     
        <Route path="/" element={<Layout />}>        
          <Route path="shop-by-category" element={<ShopByCategory />}>
            <Route index element={<Jewelry />} />  
            <Route path="jewelry" element={<Jewelry />} />
            <Route path="watches" element={<Watches />} />
            <Route path="decorations" element={<Decorations />} />
            <Route path="accessories" element={<Accessories />} />
          </Route>

          <Route path="cart" element={<CartPage />} />
          <Route path="world" element={<WorldOfBellaVista />} />
          <Route path="news" element={<News />} />
          <Route path="success-transaction" element={<SuccessTransaction />} />
          <Route path="card-payment" element={<CardPayment />} />
          <Route path="product/:id" element={<ProductDetail />} />
          <Route path="cod-payment" element={<CodPayment />} />
          <Route path="purchase-history" element={<HistoryPage />} />
          <Route path="/callback" element={<Auth0CallbackHandler />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order-summary" element={<SummaryPage />} />
        
        </Route>
      </Routes>
    </>
    
  );
};

export default App;
