import NavBar from "../../shared/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../shared/Footer/Footer";

const MainLayouts = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayouts;
