import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16 pb-16 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
