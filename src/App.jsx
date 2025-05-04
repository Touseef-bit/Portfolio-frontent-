// import { useState } from 'react'
import "./App.css";
import About from "./components/About/About";
import Main from "./components/main/Main";
import Projects from "./components/projects/Projects";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const loaderTimer = setTimeout(() => setShowLoader(true), 300);

    const setup = setTimeout(() => {
      setAppReady(true);
      setShowLoader(false);
    }, 1000); 

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(setup);
    };
  }, []);
  return (
    <>
      {!appReady && showLoader ? (
        <div className="w-full h-screen flex items-center justify-center">
          <Spinner className="w-12 h-12" aria-label="Default status example" />
        </div>
      ) : (
        <div className="app flex flex-col overflow-hidden gap-7 ">
          <Main />
          <About />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default App;
