import { Outlet } from 'react-router-dom';
import WebHeader from "../component/header";
import WebFooter from '../component/footer';
import { useState, useEffect } from 'react';

const Layout = () => {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowHeader(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <WebHeader visible={showHeader} />
      <main> 
        <Outlet /> 
      </main>
      <WebFooter />
    </div>
  );
};

export default Layout;
