import React, { useRef } from "react";
import ContactInfo from "./ContactInfo";
import "./Contact.css";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  
    const contactHeading = useRef(null);
    const contactText = useRef(null);
    useGSAP(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: contactHeading.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
  
      tl.from(contactHeading.current, {
        x:-40,
        opacity:0,
        duration: .7,
      })
      .from(contactText.current,{
        opacity:0,
        x:-50,
        duration:1,
      })
    },[]);
  return (
    <>
      <main
        id="Contact"
        className="contact-main w-full flex flex-col items-center px-4"
      >
        <div
          ref={contactHeading}
          className="contact-me text-center text-4xl underline decoration-3 underline-offset-3 text-purple-800"
        >
          Contact Me
        </div>
        <div className="contact-div w-full mt-12">
          <div
            ref={contactText}
            className="contact-text-div w-full overflow-hidden"
          >
            <p className="contact-text flex flex-col gap-4 text-lg leading-relaxed">
              <span className="contact-heading font-bold block text-2xl">
                 Let’s Connect
              </span>
              Have a question, project idea, or just want to say hi? I’d love to hear from you! Whether you're looking to
              collaborate, need help with development, or simply want to get in touch, feel free to reach out through the form below. I’ll get back to you as soon as possible.
            </p>
          </div>
          <div className="contact-form-wrapper w-full">
            <ContactInfo />
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
