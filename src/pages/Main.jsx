import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Nav from "../components/Nav";

const Main = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <div className="bg-theme p-5  m-auto w-full items-center">
      <h1 className="text-white text-center">We are Tursted</h1>
        <div className="flex justify-center gap-10 "></div>
        <div>
          <p className="text-gray-400">We are Tursted</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Main;
