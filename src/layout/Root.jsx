import { Outlet } from "react-router-dom";
// import Header from "../pages/shared/Header";
// import Footer from "../pages/home/Footer";



const Root = () => {
    return (
        <div>
            <div className="lg:max-w-6xl md:max-w-xl max-w-sm mx-auto font-poppins">
            {/* <Header></Header> */}
            <Outlet></Outlet>
        </div>
        <div>
            {/* <Footer></Footer> */}
        </div>
        </div>
    );
};

export default Root;