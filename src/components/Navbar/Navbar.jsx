import React, { useRef, useState } from "react";
import "./Navbar.css";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import MenuIcon from "@mui/icons-material/Menu";
import { HashLink as Link } from "react-router-hash-link";

const Navbar = () => {
  const data = ["Home", "About", "Projects", "Contact"];
  const [isOpen, setisOpen] = useState(false);

  const toggle = () => {
    setisOpen(!isOpen);
  };
  const text = useRef();
  const link = useRef();

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(text.current, {
      y: -20,
      opacity: 0,
      duration: 0.8,
      delay: 3.5,
    }).from(".link", { y: -20, opacity: 0, duration: 0.5, stagger: 0.1 });
  }, []);
  return (
    <>
      <nav className="w-full h-20 overflow-hidden z-50 flex items-center justify-between p-4">
        <div
          ref={text}
          className="heading cursor-pointer ml-4 relative text-white font-bold text-xl"
        >
          Touseef Ali
        </div>
        <ul
          className={
            isOpen
              ? "flex text-white gap-7 right-0"
              : "flex text-white gap-7 -right-[1000px] "
          }
        >
          <div
            onClick={toggle}
            className={
              isOpen
                ? "cross absolute top-5 right-5"
                : "cross absolute top-5 right-5"
            }
          >
            <svg
              className="w-6 h-6 text-white dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
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
          {data.map((el, ind) => {
            return (
              <Link
                ref={link}
                className="link cursor-pointer relative mx-4"
                key={ind}
                to={`#${el}`}
              >
                {el}
              </Link>
            );
          })}
        </ul>
        <div
          onClick={toggle}
          className="icon flex text-white items-center w-4 mr-4 z-10"
        >
          <MenuIcon />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
