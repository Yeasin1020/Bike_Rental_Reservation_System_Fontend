import { Outlet } from "react-router-dom";
import NavBar from "../../shared/NavBar/NavBar";
import Footer from "../../shared/Footer/Footer";
import RippleGrid from "../../components/ui/RippleGrid"; // ✅ Adjust the path if needed

const MainLayouts = () => {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* 🔵 Animated Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <RippleGrid
          enableRainbow={false}
          gridColor="#0C111B"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.07} // 🔍 Subtle background
        />
      </div>

      {/* 🔗 Navbar always on top */}
      <NavBar />

      {/* 🧩 Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 🔻 Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default MainLayouts;
