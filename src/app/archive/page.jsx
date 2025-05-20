"use client";
import "./archive.css";
import { useRef, useEffect, useState } from "react";

import products from "@/products";
import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";

const Page = () => {
  const lenis = useLenis(({ scroll }) => {});
  const containerRef = useRef(null);
  const previewRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mouseTimeout, setMouseTimeout] = useState(null);
  const [archiveRect, setArchiveRect] = useState(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.set(".archive-header .revealer p", { y: "100%" });
    gsap.set(".archive-item .revealer p", { y: "100%" });

    const tl = gsap.timeline({
      defaults: { ease: "power3.out", delay: 0.85 },
    });

    tl.to(".archive-header .revealer p", {
      y: "0%",
      duration: 0.75,
    });

    const archiveItems = containerRef.current.querySelectorAll(".archive-item");
    const rowTimeline = gsap.timeline({ delay: 0.95 });

    archiveItems.forEach((item, index) => {
      const pTags = item.querySelectorAll(".revealer p");
      rowTimeline.to(
        pTags,
        { y: "0%", duration: 0.75, ease: "power3.out" },
        index * 0.05
      );
    });
  }, [containerRef]);

  const isInsideArchive = () => {
    if (!archiveRect) return false;

    return (
      mousePos.x >= archiveRect.left &&
      mousePos.x <= archiveRect.right &&
      mousePos.y >= archiveRect.top &&
      mousePos.y <= archiveRect.bottom
    );
  };

  useEffect(() => {
    const updateArchiveRect = () => {
      if (!containerRef.current) return;

      const archiveItems = containerRef.current.querySelector(".archive-items");
      if (!archiveItems) return;

      setArchiveRect(archiveItems.getBoundingClientRect());
    };

    updateArchiveRect();

    window.addEventListener("resize", updateArchiveRect);

    return () => {
      window.removeEventListener("resize", updateArchiveRect);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const archiveItems = containerRef.current.querySelector(".archive-items");
      if (!archiveItems) return;

      setArchiveRect(archiveItems.getBoundingClientRect());

      if (!isInsideArchive()) {
        removeAllImages();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mousePos, archiveRect]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (containerRef.current) {
        const archiveItems =
          containerRef.current.querySelector(".archive-items");
        if (archiveItems) {
          setArchiveRect(archiveItems.getBoundingClientRect());
        }
      }

      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }

      const inside = isInsideArchive();
      if (!inside) {
        removeAllImages();
      } else {
        const timer = setTimeout(() => {
          cleanupOldImages();
        }, 2000);

        setMouseTimeout(timer);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (mouseTimeout) {
        clearTimeout(mouseTimeout);
      }
    };
  }, [mouseTimeout, archiveRect]);

  const removeAllImages = () => {
    if (!previewRef.current) return;

    const previewImages = previewRef.current.querySelectorAll("img");
    previewImages.forEach((img) => {
      gsap.to(img, {
        transform: "scale(0)",
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => img.remove(),
      });
    });
  };

  const cleanupOldImages = () => {
    if (!previewRef.current) return;

    const images = previewRef.current.querySelectorAll("img");
    if (images.length <= 1) return;

    const lastImage = images[images.length - 1];

    images.forEach((img) => {
      if (img !== lastImage) {
        gsap.to(img, {
          transform: "scale(0)",
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => img.remove(),
        });
      }
    });
  };

  const createPreviewImage = (product) => {
    if (!previewRef.current || !isInsideArchive()) return;

    const img = document.createElement("img");
    img.src = `/product_images/${product.previewImg}`;
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.transform = "scale(0)";
    img.style.zIndex = Date.now().toString();

    previewRef.current.appendChild(img);

    gsap.to(img, {
      transform: "scale(1)",
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <>
      <div className="p-25"></div>
      <div className="archive-page" ref={containerRef}>
        <div className="archive">
          <div className="archive-header">
            <div className="archive-header-name">
              <div className="revealer">
                <p>Product Name</p>
              </div>
            </div>
            <div className="archive-header-designer">
              <div className="revealer">
                <p>Designer</p>
              </div>
            </div>
            <div className="archive-header-year">
              <div className="revealer">
                <p>Year</p>
              </div>
            </div>
          </div>
          <div className="archive-items">
            {[...Array(2)].flatMap((_, repetition) =>
              products.map((product, index) => {
                const productYear = new Date(product.date).getFullYear();
                const uniqueKey = `${repetition}-${product.id}`;

                return (
                  <div
                    className="archive-item"
                    key={uniqueKey}
                    onMouseEnter={() => createPreviewImage(product)}
                  >
                    <div className="archive-item-name">
                      <div className="revealer">
                        <p>{product.name}</p>
                      </div>
                    </div>
                    <div className="archive-item-designer">
                      <div className="revealer">
                        <p>{product.designer}</p>
                      </div>
                    </div>
                    <div className="archive-item-year">
                      <div className="revealer">
                        <p>{productYear}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="archive-empty-col"></div>
      </div>
      <div className="p-25"></div>
      <div className="product-preview" ref={previewRef}></div>
      <div className="footer-wrapper">
        <Footer />
      </div>
    </>
  );
};

export default Page;
