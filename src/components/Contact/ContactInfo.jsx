import React, { useRef } from "react";
import "./Contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

// Constants
const EMAIL = "touseefali11092@gmail.com";

const ContactInfo = () => {
  const contactCard = useRef(null);

  const copyText = async (e) => {
    e.preventDefault();
    
    try {
      // Check if Clipboard API is available
      if (!navigator.clipboard) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = EMAIL;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
          document.execCommand("copy");
          toast.success("Email copied to clipboard!");
        } catch {
          toast.error("Failed to copy email. Please copy manually.");
        } finally {
          document.body.removeChild(textArea);
        }
        return;
      }

      // Modern Clipboard API
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy email:", err);
      toast.error("Failed to copy email. Please copy manually.");
    }
  };

  const handleKeyDown = (e) => {
    // Allow copying with Enter or Space key
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      copyText(e);
    }
  };

  useGSAP(() => {
    if (!contactCard.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactCard.current,
        start: "top 80%",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(
      contactCard.current,
      {
        x: 50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <main
      ref={contactCard}
      onClick={copyText}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Click to copy email address: ${EMAIL}`}
      className="w-[500px] overflow-hidden relative max-tablet:w-60 max-laptop:w-[400px] max-tablet:h-40 cursor-pointer flex flex-col items-start h-60 rounded-4xl border-2 text-purple-800 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all hover:border-purple-600 hover:shadow-lg"
    >
      <div className="px-4 max-tablet:mt-3 max-tablet:px-2 mt-10 flex gap-5 flex-col">
        <h3 className="font-bold max-tablet:text-lg text-2xl">Email Me</h3>
        <div>
          <p className="font-bold w-full max-tablet:text-sm text-lg copyInput">
            {EMAIL}
          </p>
        </div>
        <p className="max-tablet:text-[9px] text-purple-500">
          Send me a message directly through this form — whether it's a
          question, a collaboration idea, or just to say hello. I'll get back
          to you as soon as possible!
        </p>
      </div>
    </main>
  );
};

export default ContactInfo;
