import React from "react";


const Footer = () => {
    return (
      <footer className="w-full h-14 flex justify-center items-center bg-purple-800 text-white mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Touseef Ali. All rights reserved.
        </p>
      </footer>
    );
  };
  
  export default Footer;
  