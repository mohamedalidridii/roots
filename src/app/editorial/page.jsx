"use client";
import "./editorial.css";

import { generateSlug } from "@/utils";
import useCartStore from "@/store/useCartStore";
import articles from "@/articles";
import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useTransitionRouter } from "next-view-transitions";

const Page = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useTransitionRouter();
  const containerRef = useRef(null);
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  const lenis = useLenis(({ scroll }) => {});

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
      const rows = gsap.utils.toArray(".article-row");

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

  const articleDistribution = [
    [0, 1, 0],
    [1, 0, 0],
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0],
  ];

  const maxRows = Math.min(articleDistribution.length, articles.length);

  const getArticleLayout = () => {
    let articleIndex = 0;
    const layout = [];

    for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
      const rowLayout = [null, null, null];

      for (let colIndex = 0; colIndex < 3; colIndex++) {
        if (
          articleDistribution[rowIndex][colIndex] === 1 &&
          articleIndex < articles.length
        ) {
          rowLayout[colIndex] = articles[articleIndex];
          articleIndex++;
          break;
        }
      }

      layout.push(rowLayout);
    }

    return layout;
  };

  const articleLayout = getArticleLayout();

  return (
    <div className="editorial-page" ref={containerRef}>
      <div className="p-25"></div>
      <div className="articles">
        {articleLayout.map((row, rowIndex) => (
          <div className="article-row" key={`row-${rowIndex}`}>
            {row.map((article, colIndex) => (
              <div
                className={`column ${
                  article === null ? "empty-column" : "article-column"
                }`}
                key={`col-${rowIndex}-${colIndex}`}
              >
                {article && (
                  <div
                    className="article-card"
                    onClick={() =>
                      navigateTo(`/editorial/${generateSlug(article.title)}`)
                    }
                  >
                    <div className="article-image">
                      <img
                        src={`/article_images/${article.bannerImg}`}
                        alt={article.title}
                        className="article-img"
                      />
                    </div>
                    <div className="article-info">
                      <p className="article-title">{article.title}</p>
                      <p className="article-author">{article.author}</p>
                    </div>
                  </div>
                )}
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
