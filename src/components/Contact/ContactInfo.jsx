import React, { useRef, useState } from "react";
import "./Contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);

// Constants
const EMAIL = "touseefali11092@gmail.com";
const API_ENDPOINT = import.meta.env.VITE_API_URL; // TODO: add your contact form API endpoint URL


const ContactInfo = () => {
  const contactCard = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleChange = (field) => (event) => {
    const { value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(API_ENDPOINT);
    if (!API_ENDPOINT) {
      console.warn("Contact API endpoint is not configured.");
      toast.warn(
        "Contact endpoint is not configured yet. Please try again later."
      );
      return;
    }

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      await axios.post(API_ENDPOINT, formData);
      toast.success("Thanks for reaching out! I’ll get back to you shortly.");
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to submit contact form:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const copyText = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Check if Clipboard API is available
  //     if (!navigator.clipboard) {
  //       // Fallback for older browsers
  //       const textArea = document.createElement("textarea");
  //       textArea.value = EMAIL;
  //       textArea.style.position = "fixed";
  //       textArea.style.opacity = "0";
  //       document.body.appendChild(textArea);
  //       textArea.select();

  //       try {
  //         document.execCommand("copy");
  //         toast.success("Email copied to clipboard!");
  //       } catch {
  //         toast.error("Failed to copy email. Please copy manually.");
  //       } finally {
  //         document.body.removeChild(textArea);
  //       }
  //       return;
  //     }

  //     // Modern Clipboard API
  //     await navigator.clipboard.writeText(EMAIL);
  //     toast.success("Email copied to clipboard!");
  //   } catch (err) {
  //     console.error("Failed to copy email:", err);
  //     toast.error("Failed to copy email. Please copy manually.");
  //   }
  // };

  // const handleKeyDown = (e) => {
  //   // Allow copying with Enter or Space key
  //   if (e.key === "Enter" || e.key === " ") {
  //     e.preventDefault();
  //     copyText(e);
  //   }
  // };

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
    // <main
    //   ref={contactCard}
    //   onClick={copyText}
    //   onKeyDown={handleKeyDown}
    //   tabIndex={0}
    //   role="button"
    //   aria-label={`Click to copy email address: ${EMAIL}`}
    //   className="w-[500px] overflow-hidden relative max-tablet:w-60 max-laptop:w-[400px] max-tablet:h-40 cursor-pointer flex flex-col items-start h-60 rounded-4xl border-2 text-purple-800 border-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all hover:border-purple-600 hover:shadow-lg"
    // >
    //   <div className="px-4 max-tablet:mt-3 max-tablet:px-2 mt-10 flex gap-5 flex-col">
    //     <h3 className="font-bold max-tablet:text-lg text-2xl">Email Me</h3>
    //     <div>
    //       <p className="font-bold w-full max-tablet:text-sm text-lg copyInput">
    //         {EMAIL}
    //       </p>
    //     </div>
    //     <p className="max-tablet:text-[9px] text-purple-500">
    //       Send me a message directly through this form — whether it's a
    //       question, a collaboration idea, or just to say hello. I'll get back
    //       to you as soon as possible!
    //     </p>
    //   </div>
    // </main>
    <section ref={contactCard} class="text-gray-600 body-font relative">
      <div class="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
        <div class="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
            Get in Touch
          </h2>
          <p class="leading-relaxed mb-5 text-gray-600">
            Drop me a message below—I'll reply soon!
          </p>
          <form onSubmit={handleSubmit} class="flex flex-col">
            <div class="relative mb-4">
              <label for="name" class="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange("name")}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="Your full name"
                required
              />
            </div>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange("email")}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                placeholder="you@example.com"
                required
              />
            </div>
            <div class="relative mb-4">
              <label for="message" class="leading-7 text-sm text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange("message")}
                class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                placeholder="Share your project details or questions"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="text-white cursor-pointer bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
