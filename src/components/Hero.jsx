import { Link } from "react-router-dom";
import note from "../assets/img/note.avif";

const Hero = () => {
  return (
    <div className="px-4 md:px-[100px] mt-8 md:flex justify-between items-center">
      <div className="text-gray-500">
        <h1 className="text-4xl md:text-5xl font-bold ">
          <span className="hover:text-accent">Create.</span>
          <span className="text-theme ">Edit.</span>
          <span className="block">
            <span className="text-gray-500  hover:text-accent ">Organize.</span>
            <span className="text-theme ">Share.</span>
          </span>
          <span className="block hover:text-accent">Easy & Fast</span>
        </h1>
        {/* <h1 className="text-4xl md:text-5xl font-bold ">
          <span className="hover:text-accent">Getting your</span>
          <span className="text-theme "> NOTES </span>
          <span className="block hover:text-accent">
            <span className="text-gray-500"> and </span> 
            <span className="text-theme "> ToDo </span>
            List sorted out
          </span>
        </h1> */}
        <small className="text-black block my-2">
          Generate your notes, keep them safe and access them at any time of the
          day, set alarm to get you notified that your note or ToDo is ready,
        </small>
        <Link to="/app">
          <button className="mt-5 bg-gradient-to-r from-theme to-accent px-10 py-3 hover:border rounded-lg shadow-lg text-white hover:border-theme hover:text-white hover:bg-gradient-to-r hover:from-accent hover:to-theme hover:font-bold">
            Get Started
          </button>
        </Link>
      </div>
      <div className="object-cover object-center">
        <img src={note} alt="" />
      </div>
    </div>
  );
};

export default Hero;
