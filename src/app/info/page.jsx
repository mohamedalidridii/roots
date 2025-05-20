"use client";
import "./info.css";
import { useRef, useEffect } from "react";

import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useLenis } from "lenis/react";

const InfoPage = () => {
  const containerRef = useRef(null);
  const descriptionRef = useRef(null);

  const lenis = useLenis(({ scroll }) => {});

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.set(".info-wrapper .revealer p", {
      y: "100%",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        delay: 0.85,
      },
    });

    tl.to(".info-col:nth-child(1) .revealer p", {
      y: "0%",
      duration: 0.75,
      stagger: 0.1,
    });

    tl.to(
      ".info-col:nth-child(2) .revealer p",
      {
        y: "0%",
        duration: 0.75,
        stagger: 0.1,
      },
      "0"
    );

    if (descriptionRef.current) {
      const descriptionParagraphs =
        descriptionRef.current.querySelectorAll("p");

      descriptionParagraphs.forEach((paragraph) => {
        const splitDescription = new SplitType(paragraph, {
          types: "lines",
          lineClass: "line",
        });

        splitDescription.lines.forEach((line) => {
          const content = line.innerHTML;
          line.innerHTML = `<span>${content}</span>`;
        });
      });

      gsap.set("#info-description p .line span", {
        y: "100%",
        display: "block",
      });

      tl.to(
        "#info-description p .line span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
        },
        "-=2.5"
      );
    }
  }, [containerRef, descriptionRef]);

  return (
    <div className="info-page" ref={containerRef}>
      <div className="info-wrapper">
        <div className="info-col">
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>Info</p>
              </div>
            </div>
            <div
              className="info-copy"
              id="info-description"
              ref={descriptionRef}
            >
              <p>
              ROOTS Care Cubes is a thoughtfully curated marketplace for digital
                design assets, tailored for creatives who value minimalism,
                clarity, and intentionality. Our collection includes everything
                from refined mockups and sleek UI templates to motion elements,
                sound effects, and graphic components—each crafted to elevate
                the way visual stories are told. Whether you're a designer
                shaping a brand, a developer building an interface, or an artist
                exploring new mediums, ROOTS Care Cubes ROOTS Care Cube offers tools that are as
                functional as they are beautiful, designed to seamlessly
                integrate into modern workflows and creative processes.
              </p>
              <p>
                We believe great design is about more than aesthetics—it's about
                purpose, utility, and the subtle details that create emotional
                resonance. That's why we partner with independent designers and
                studios across the globe who share our commitment to quality and
                simplicity. Every asset we feature is carefully selected to
                ensure it meets our standards for visual precision and
                usability. At Format Archive, we aim to be more than just a
                resource—we’re building a creative ecosystem where thoughtful
                design lives, evolves, and empowers creators to do their best
                work with confidence and clarity.
              </p>
            </div>
          </div>
        </div>
        <div className="info-col">
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>What You Get</p>
              </div>
            </div>
            <div className="info-copy">
              <div className="revealer">
                <p>Curated digital assets</p>
              </div>
              <div className="revealer">
                <p>Ready to use</p>
              </div>
              <div className="revealer">
                <p>No subscriptions</p>
              </div>
              <div className="revealer">
                <p>Pay once, own forever</p>
              </div>
            </div>
          </div>
          <div className="info-item">
            <div className="info-title">
              <div className="revealer">
                <p>Contact</p>
              </div>
            </div>
            <div className="info-copy">
              <div className="revealer">
                <p>Creator Collaborations</p>
              </div>
              <div className="revealer">
                <p>studio@formatarchive.com</p>
              </div>
              <br />
              <div className="revealer">
                <p>Customer Support</p>
              </div>
              <div className="revealer">
                <p>support@formatarchive.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPage;
