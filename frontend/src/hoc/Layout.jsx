import { Outlet } from 'react-router-dom';
import WebHeader from "../component/header";
import WebFooter from '../component/footer';

const Layout = () => {
  return (
    <div>
      <WebHeader visible={true} /> 
      <main style={{ marginTop: "10vh" }}> 
        <Outlet /> 
      </main>
      <WebFooter />
    </div>
  );
};

export default Layout;
