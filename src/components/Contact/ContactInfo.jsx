import React, { useRef, useState } from "react";
import axios  from "axios";
import { Button, Spinner } from "flowbite-react";
import "./Contact.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { toast } from "react-toastify";

gsap.registerPlugin(ScrollTrigger);

const ContactInfo = () => {
  const [loading, setloading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const res = await axios.post("/api/v1/sendEmail", form);
      toast.success(res.data.message);
      setloading(false);
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };
  const contactCard = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactCard.current,
        start: "top 70%",
        end: "top 40%",
        scrub: 4,
      },
    });

    tl.from(contactCard.current, {
      scale: 0.6,
      opacity: 0,
      duration: 1,
    });
  }, []);
  return (
    <>
      <div
        ref={contactCard}
        className="form-div flex justify-center w-96 items-center"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-6 rounded-lg shadow-lg full"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full p-3 mb-4 text-area border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 !resize-none"
          />
          {loading ? (
            <Button className="w-full p-3 contact-btn bg-purple-800 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700">
              <Spinner aria-label="Spinner button example" size="sm" light />
              <span className="pl-3">Loading...</span>
            </Button>
          ) : (
            <button
              type="submit"
              className="w-full contact-btn p-3 bg-purple-800 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-700"
            >
              Send Message
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default ContactInfo;
