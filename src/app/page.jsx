"use client";
import "./index.css";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import { useTransitionRouter } from "next-view-transitions";
import Lenis from "lenis";


gsap.registerPlugin(CustomEase);

gsap.registerPlugin(ScrollTrigger);
CustomEase.create("hop", ".15, 1, .25, 1");
CustomEase.create("hop2", ".9, 0, .1, 1");

let isInitialLoad = true;

export default function Home() {
  const router = useTransitionRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const horizontalRef = useRef(null);
  const container = useRef(null);
  const counterRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

	useEffect(() =>{
		const lenis = new Lenis({
	  	duration: 1.2 ,
	  	easing: (t) => Math.min(1,1.001 - Math.pow(2, -10 * t)),
	  	orientation: "vertical",
      		gestureOrientation: "vertical",
      		smoothWheel: true,
      		wheelMultiplier: 1,
      		smoothTouch: false,
      		touchMultiplier: 2,
      		infinite: false,


 	 });
    
	lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Cleanup
    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
    useEffect(() => {
    // Wait for preloader to finish before initializing scroll animations
    const delay = showPreloader ? 4500 : 0;

    const timer = setTimeout(() => {
      const section = horizontalRef.current;
      if (!section) return;

      const pinWrap = section.querySelector(".pin-wrap");
      const gallery = section.querySelector(".image-gallery");
      
      if (!pinWrap || !gallery) return;

      // Calculate scroll distance
      const scrollDistance = gallery.scrollWidth - window.innerWidth;

      // Create horizontal scroll animation
      const scrollTween = gsap.to(gallery, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      // Cleanup function
      return () => {
        scrollTween.scrollTrigger?.kill();
        scrollTween.kill();
      };
    }, delay);

    return () => clearTimeout(timer);
  }, [showPreloader]);
	
  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-50%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-old(root)",
      }
    );

    document.documentElement.animate(
      [
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        },
        {
          clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        },
      ],
      {
        duration: 1200,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const navigateTo = (path) => {
    if (isAnimating) return;

    setIsAnimating(true);

    if (isCartOpen) {
      setTimeout(() => {
        router.push(path, {
          onTransitionReady: slideInOut,
        });
      }, 500);
    } else {
      router.push(path, {
        onTransitionReady: slideInOut,
      });
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };
  const startLoader = () => {
    const textElement = counterRef.current;
    
    // 1. Define the target text
    const targetText = "Roots Care cube";
    const totalDuration = 2000; // Total animation time remains the same

    // 2. Calculate steps based on the text's length
    const totalSteps = targetText.length;
    const timePerStep = totalDuration / totalSteps;

    // 3. Ensure the element is valid and initialize it to be empty
    if (!textElement) {
        console.error("Counter ref element not found.");
        return;
    }
    textElement.textContent = "";

    let currentStep = 0;
    function updateText() {
        // Stop if we have displayed all letters
        if (currentStep >= totalSteps) {
            return;
        }
        currentStep++;

        // 4. The core logic: Get a slice of the string
        const newText = targetText.slice(0, currentStep);
        textElement.textContent = newText;

        // Schedule the next letter to appear
        setTimeout(updateText, timePerStep);
    }

    // Start the animation
    updateText();
  };
  useEffect(() => {
    if (showPreloader) {
      startLoader();

      gsap.set(".home-page-content", {
        clipPath: "polygon(0% 100%, 10% 100%, 100% 100%, 0% 100%)",
      });

      const tl = gsap.timeline();

      tl.to(".count", {
        opacity: 0,
        delay: 2.5,
        duration: 0.25,
      });

      tl.to(".pre-loader", {
        scale: 0.5,
        ease: "hop2",
        duration: 1,
      });

      tl.to(".home-page-content", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.5,
        ease: "hop2",
        delay: -1,
      });

      tl.to(".loader", {
        height: "0",
        ease: "hop2",
        duration: 1,
        delay: -1,
      });

      tl.to(".loader-bg", {
        height: "0",
        ease: "hop2",
        duration: 1,
        delay: -0.5,
      });

      tl.to(".loader-2", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        ease: "hop2",
        duration: 1,
      });
    } else {
      gsap.set(".home-page-content", {
clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
      });
    }
  }, [showPreloader]);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.to("h1 span", {
        y: "0%",
        ease: "hop",
        duration: 1.5,
        stagger: 0.2,
        delay: showPreloader ? 4 : 1,
      });

      tl.to(
        ".product-preview-hero",
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "hop",
          duration: 1.5,
          stagger: 0.3,
        },
        "<"
      );
    },
    { scope: container, dependencies: [showPreloader] }
  );

  return (
    <div className="home-page" ref={container}>
      {showPreloader && (
        <>
          <div className="preloader-overlay">
            <div className="pre-loader">
              <div className="loader"></div>
              <div className="loader-bg"></div>
            </div>
            <div className="count">
              <p ref={counterRef}></p>
            </div>
            <div className="loader-2"></div>
          </div>

          <div className="preloader-bg-img">
            <img src="/article_images/roots.jpg" alt="" />
          </div>
        </>
      )}

      <div className="home-page-content">
        <div className="header">
          <h1 className="header-line-1">
            <span>Roots</span>
          </h1>
          <h1 className="header-line-2">
            <span>Care Cube</span>
          </h1>
        </div>
      </div>
	  
	  <div className="info-wrapper">
        <div className="info-col">
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
              </div>
            </div>
            <div
              className="info-copy"
              id="info-description"
              
            >
              <p>
          Roots transforme les rituels de soin en gestes simples et responsables :    
	  </p>
              <p>
          des cubes solides, zéro plastique, qui protègent la planète sans compromis sur l’efficacité.
    
	  </p>
            </div>
          </div>
        </div>
	  </div>
       <section style={{height: '100vh'}}></section>

        <div className="horizontal-scroll-section" ref={horizontalRef}>
          <div className="pin-wrap">
            <div className="image-gallery">
              <img src="product_images/product_001.jpeg" alt="Image 1"/>
              <img src="product_images/product_002.jpeg" alt="Image 2"/>
	      <img src="product_images/product_003.jpeg" alt="Image 3"/>
      	      <img src="product_images/product_004.jpeg" alt="Image 4"/>
      	    </div>
         </div>
	</div>

	<section style={{height: '400vh'}}></section>
	<section className="section-4">
		<h1>Hello world</h1>
	  </section>
	  
	  
	  </div>
  );
}
