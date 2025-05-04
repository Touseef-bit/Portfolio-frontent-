import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import bg from "../../assets/bg.jpg";
import "./main.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Main = () => {
  const img = useRef();
  const text = useRef();
  const main = useRef();
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(main.current, { opacity: 0, duration: 1 })
      .from(img.current, { opacity: 0, duration: 1 })
      .from(text.current, { x: -50, opacity: 0, duration: 0.7 });
  }, []);
  return (
    <>
      <main
        ref={main}
        id="Main"
        className="main bg-black flex flex-col w-full h-screen "
      >
        <Navbar />
        <div className="h-full flex items-center justify-between">
          <div
            ref={text}
            className="text font-bold ml-20 text-3xl z-50 text-white"
          >
            Hello
            <span className="block font-bold mt-6 overflow-hidden name relative text-5xl text-purple-600">
              I'm Touseef Ali!
            </span>
          </div>
          <div
            ref={img}
            className="img mr-20 overflow-hidden rounded-full w-80 z-20 "
          >
            <svg
              className="w-6 h-6 dark:text-white"
              aria-hidden="true"
              xmlns="file:///C:/Users/balti/Downloads/main.svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>
        </div>
        <div className="absolute top-0 opacity-20 h-screen overflow-hidden">
          <img src={bg} className="h-screen w-dvw" />
        </div>
      </main>
      <hr />
    </>
  );
};

export default Main;
