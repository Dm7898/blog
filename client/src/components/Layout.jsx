import Footer from "./Footer";
import Navbar from "./Navbar";

export const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">{children}</div>
      <Footer />
    </>
  );
};
