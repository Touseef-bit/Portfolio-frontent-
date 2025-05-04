import React, { useRef } from "react";
import Navbar from "../Navbar/Navbar";
import bg from "../../assets/bg.jpg";
import mainImg from "../../assets/main.jpg";
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
      .from(text.current, { x: -50, opacity: 0, duration: .7 });
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
            <img src={mainImg} alt="image" />
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
