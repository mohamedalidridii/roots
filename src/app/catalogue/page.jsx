"use client";
import "./catalogue.css";
import { useRef, useState } from "react";

import { generateSlug } from "@/utils";
import useCartStore from "@/store/useCartStore";
import products from "@/products";
import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useTransitionRouter } from "next-view-transitions";

const Page = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useTransitionRouter();
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const containerRef = useRef(null);

  const lenis = useLenis(({ scroll }) => {});

  const productDistribution = [
    [1, 0, 0, 1],
    [0, 1, 0, 0],
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 0, 0],
    [0, 0, 1, 1],
    [1, 0, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 1, 0],
  ];

  const getProductLayout = () => {
    let productIndex = 0;
    const layout = [];

    for (let rowIndex = 0; rowIndex < productDistribution.length; rowIndex++) {
      const rowLayout = [[], [], [], []];

      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const productCount = productDistribution[rowIndex][colIndex];

        for (let i = 0; i < productCount; i++) {
          if (productIndex < products.length) {
            rowLayout[colIndex].push(products[productIndex]);
            productIndex++;
          }
        }
      }

      layout.push(rowLayout);
    }

    return layout;
  };

  const productLayout = getProductLayout();

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

  useGSAP(
    () => {
      const rows = gsap.utils.toArray(".row");

      gsap.fromTo(
        rows,
        {
          y: 300,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.85,
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div className="catalogue-page" ref={containerRef}>
      <div className="p-25"></div>
      <div className="products">
        {productLayout.map((row, rowIndex) => (
          <div className="row" key={`row-${rowIndex}`}>
            {row.map((column, colIndex) => (
              <div
                className={`column ${
                  column.length === 0 ? "empty-column" : ""
                }`}
                key={`col-${rowIndex}-${colIndex}`}
              >
                {column.map((product) => (
                  <div
                    key={product.id}
                    className="product-link"
                    onClick={() =>
                      navigateTo(`/catalogue/${generateSlug(product.name)}`)
                    }
                  >
                    <div className="product-card">
                      <div className="product-card-image">
                        <img
                          src={`/product_images/${product.previewImg}`}
                          alt={product.name}
                          className="product-card-img"
                        />
                      </div>
                      <div className="product-info">
                        <p className="product-card-name">{product.name}</p>
                        {/* <p className="product-card-price">${product.price}</p> */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="p-50"></div>
      <Footer />
    </div>
  );
};

export default Page;
