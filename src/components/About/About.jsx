import React, { useRef } from "react";
import "../About/about.css";
import me from "../../assets/me.jpg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "./cv.pdf";
    link.download = "cv.pdf";
    link.click();
  };

  const aboutHeading = useRef(null);
  const about = useRef(null);
  const aboutimg = useRef(null);
  const abouttext = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: about.current,
        start: "top 100%",
        scrub:4,
        end: "top 20%",
        once: true,
      },
    });

    tl.from(aboutHeading.current, {
      scale: 0.6,
      duration: 1,
    })
      .from(aboutimg.current, {
        x: 50,
        opacity:0,
        duration: 1.5,
      })
      .from(abouttext.current, {
        x: -50,
        opacity:0,
        duration: 1,
      });
  }, []);

  return (
    <>
      <main
        ref={about}
        id="About"
        className="flex h-full flex-col items-center w-full mb-4"
      >
        <div
          ref={aboutHeading}
          className="about-heading text-4xl -z-10 underline decoration-3 underline-offset-3 text-purple-800"
        >
          About Me
        </div>
        <div className="main-div mt-20 flex justify-between flex-wrap-reverse h-full items-center w-full">
          <div ref={abouttext} className="text-div w-[470px] text-xl  lh-md">
            <span className="about-text block">
              Hi, I'm a 17-year-old student currently in 11th grade at the
              College of Emerging Technology. I've been passionate about web
              development for the past two years, focusing on mastering the MERN
              stack (MongoDB, Express.js, React, and Node.js). I'm dedicated to
              building modern, full-stack applications and constantly expanding
              my skills through hands-on projects and continuous learning.
            </span>
            <button
              onClick={handleDownload}
              className="bg-purple-600 cursor-pointer btn text-white w-40 py-2 rounded-md hover:bg-purple-700 transition duration-200"
            >
              Download CV
            </button>
          </div>
          <div
            ref={aboutimg}
            className="about-image w-80 -z-50 h-96 rounded-3xl overflow-hidden"
          >
            <img src={me} className="img-fluid" alt="img" />
          </div>
        </div>
      </main>
      <hr />
    </>
  );
};

export default About;
