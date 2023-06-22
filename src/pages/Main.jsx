import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";

import abf from "../assets/img/ABF_LOGO.jpg";
import bytitude from "../assets/img/bytitudeR.png";
import hikima from "../assets/img/logo.png";

const Main = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <div className="bg-theme bg-opacity-40 p-3">
        <h1 className="text-theme pb-3 text-2xl font-extrabold text-center">
          We are Trusted
        </h1>
        <div className="flex justify-center w-[100%] gap-10 h-9 align-middle">
          <div>
            <img className="hover:scale-[120%] h-full" src={abf} alt="" />
          </div>
          <div>
            <img className="hover:scale-[120%] h-full" src={bytitude} alt="" />
          </div>
          <div>
            <img className="hover:scale-[120%] h-full" src={hikima} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
