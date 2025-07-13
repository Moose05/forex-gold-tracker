import Navbar from "./Navbar";
import Footer from "./Footer";
import {Outlet} from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet /> {/* Page Rendering */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
