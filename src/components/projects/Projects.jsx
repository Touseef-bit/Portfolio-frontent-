import React, { useRef } from "react";
import laptop from "../../assets/auth.png";
import chatApp from "../../assets/chat.png";
import "./project.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


const Projects = () => {
  const data = [
    {
      id: 1,
      heading: "AuthApp",
      text: "AuthApp is a backend-only authentication system built with Node.js, Express, and MongoDB. It uses JWT for secure token-based login and bcrypt for password hashing. Features include user registration, login, and protected routes using middleware.",
      img: laptop,
    },
    {
      id: 2,
      heading: "Chat-app",
      text: "ChatApp is a full-stack messaging app using Node.js, Express, and Socket.io for real-time chat, with MongoDB for storing messages and users. The frontend is built with React, allowing users to register, log in, and chat instantly.",
      img: chatApp,
    },
  ];
  const projectHeading = useRef()
  const projectCard = useRef()
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: projectHeading.current,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
      },
    });

    tl.from(projectHeading.current, {
      y:20,
      opacity:0,
      duration: 1,
    })
    .from(projectCard.current,{
      opacity:0,
      y:50,
      duration:1,
    })
  },[]);
  return (
    <>
      <main id="Projects" className="flex flex-col items-center w-full mb-4 ">
        <div ref={projectHeading} className="project-heading text-4xl underline decoration-3 underline-offset-3 text-purple-800">
          Projects
        </div>
        <div ref={projectCard} className="flex mt-12 w-full gap-4 flex-wrap justify-evenly">
          {data.map((el, ind) => {
            return (
              <div
                className="card w-[380px] -z-10 relative flex flex-col gap-3 items-center rounded-sm"
                key={ind}
              >
                <div className="w-24 rounded-lg h-24 mt-4 overflow-hidden">
                  <img src={el.img} alt="" />
                </div>
                <div className="card-text text-purple-800 flex z-50 flex-col mt-2 gap-3">
                  <div className="card-heading font-bold underline underline-offset-5 decoration-3 w-full text-xl">
                    {el.heading}
                  </div>
                  <div className="card-text w-80 pr-2 text-md">{el.text}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <hr/>
    </>
  );
};

export default Projects;
