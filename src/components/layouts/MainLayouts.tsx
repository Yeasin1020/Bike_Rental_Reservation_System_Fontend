import NavBar from "../../shared/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";

const MainLayouts = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar always at top */}
      <NavBar />

      {/* Main content fills the screen */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default MainLayouts;
