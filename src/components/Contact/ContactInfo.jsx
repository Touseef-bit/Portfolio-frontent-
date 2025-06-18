import React, { useRef, useState } from "react";
import "./Contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => {
  const [email, setemail] = useState("touseefali11092@gmail.com");
  const copyText = async (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    toast.success("Copied");
  };
  const contactCard = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactCard.current,
        start: "top 50%",
        end: "top 100%",
        scrub: 4,
      },
    });

    tl.from(contactCard.current, {
      x:50,
      opacity: 0,
      duration: .5,
    });
  }, []);
  return (
    <>
      <main
        ref={contactCard}
        onClick={copyText}
        className="w-[500px] overflow-hidden relative max-tablet:w-60 max-laptop:w-[400px] max-tablet:h-40 cursor-pointer flex flex-col items-start h-60 rounded-4xl border-2 text-purple-800 border-purple-800"
      >
        <div className="px-4 max-tablet:mt-3 max-tablet:px-2 mt-10 flex gap-5 flex-col">
          <h3 className="font-bold max-tablet:text-lg text-2xl ">Email Me</h3>
          <div>
            <p className="font-bold w-full max-tablet:text-sm text-lg copyInput ">
              {email}
            </p>
          </div>
          <p className="max-tablet:text-[9px] text-purple-500 ">
            Send me a message directly through this form — whether it's a
            question, a collaboration idea, or just to say hello. I'll get back
            to you as soon as possible!
          </p>
        </div>
      </main>
    </>
  );
};

export default ContactInfo;
