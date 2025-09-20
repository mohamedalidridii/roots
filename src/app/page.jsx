"use client";
import "./index.css";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import useCartStore from "@/store/useCartStore";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CustomEase from "gsap/CustomEase";
import { useTransitionRouter } from "next-view-transitions";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", ".15, 1, .25, 1");
CustomEase.create("hop2", ".9, 0, .1, 1");

let isInitialLoad = true;

export default function Home() {
  const router = useTransitionRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const container = useRef(null);
  const counterRef = useRef(null);
  const [showPreloader, setShowPreloader] = useState(isInitialLoad);

  useEffect(() => {
    return () => {
      isInitialLoad = false;
    };
  }, []);

  function slideInOut() {
    document.documentElement.animate(
      [
        {
          opacity: 1,
          transform: "translateY(0)",
        },
        {
          opacity: 0.2,
          transform: "translateY(-35%)",
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
    const counterElement =
      document.querySelector(".count p") || counterRef.current;
    const totalDuration = 2000;
    const totalSteps = 11;
    const timePerStep = totalDuration / totalSteps;

    if (counterElement) {
      counterElement.textContent = "0";
    }

    let currentStep = 0;
    function updateCounter() {
      currentStep++;
      if (currentStep <= totalSteps) {
        const progress = currentStep / totalSteps;
        let value;

        if (currentStep === totalSteps) {
          value = 100;
        } else {
          const exactValue = progress * 100;
          const minValue = Math.max(Math.floor(exactValue - 5), 1);
          const maxValue = Math.min(Math.floor(exactValue + 5), 99);
          value =
            Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
        }
        if (counterElement) {
          counterElement.textContent = value;
        }
        if (currentStep < totalSteps) {
          setTimeout(updateCounter, timePerStep);
        }
      }
    }

    setTimeout(updateCounter, timePerStep);
  };

  useEffect(() => {
    if (showPreloader) {
      startLoader();

      gsap.set(".home-page-content", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
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
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
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
              <p ref={counterRef}>0</p>
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
            <span>ROOTS</span>
          </h1>
          <h1 className="header-line-2">
            <span>Care Cubes</span>
          </h1>
        </div>

        <div className="home-page-footer">
          <div className="hp-footer-col"></div>
          <div className="hp-footer-col">
            <div
              className="product-preview-hero"
              onClick={() => navigateTo(`/catalogue/mirror-orb-mockup`)}
            >
          <img src="/product_images/product_001.jpeg"/>
	  </div>
            <div
              className="product-preview-hero"
              onClick={() => navigateTo(`/catalogue/earbud-ad-mockup`)}
            >
              <img src="/product_images/product_002.jpeg" alt="" />
            </div>
            <div
              className="product-preview-hero"
              onClick={() => navigateTo(`/catalogue/minimal-phone-mockup`)}
            >
              <img src="/product_images/product_003.jpeg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
