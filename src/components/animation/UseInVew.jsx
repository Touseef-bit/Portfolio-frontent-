// useInView.js
import { useEffect, useState, useRef } from "react";

export function useInView(options = {}) {
    const ref = useRef();
    const [inView, setInView] = useState(false);
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        options
      );
  
      if (ref.current) observer.observe(ref.current);
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, [options]);
  
    return [ref, inView];
}
