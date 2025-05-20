"use client";
import "./product-detail.css";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";

import { findProductBySlug, generateSlug } from "@/utils";
import useCartStore from "@/store/useCartStore";
import products from "@/products";
import Footer from "@/components/Footer/Footer";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { useLenis } from "lenis/react";
import { useTransitionRouter } from "next-view-transitions";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = findProductBySlug(products, slug);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useTransitionRouter();
  const isCartOpen = useCartStore((state) => state.isCartOpen);

  const addToCart = useCartStore((state) => state.addToCart);
  const openCart = useCartStore((state) => state.openCart);
  const closeCart = useCartStore((state) => state.closeCart);

  const containerRef = useRef(null);
  const descriptionRef = useRef(null);
  const addToCartBtnRef = useRef(null);

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

  const handleAddToCart = () => {
    if (!product || isAnimating) return;

    addToCart(product);

    gsap.to(addToCartBtnRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    openCart();

    setTimeout(() => {
      closeCart();
    }, 3000);
  };

  useEffect(() => {
    if (product) {
      const otherProducts = products.filter((p) => p.id !== product.id);

      let sameCategory = otherProducts.filter(
        (p) => p.category === product.category
      );

      let sameFileType = otherProducts.filter(
        (p) =>
          p.fileType === product.fileType && p.category !== product.category
      );

      let sameDesigner = otherProducts.filter(
        (p) =>
          p.designer === product.designer && p.category !== product.category
      );

      let selectedProducts = [];

      const seed = parseInt(product.id, 10);

      if (sameCategory.length > 0) {
        const catIndex = seed % sameCategory.length;
        selectedProducts.push(sameCategory[catIndex]);

        if (sameCategory.length > 1) {
          const catIndex2 = (seed + 1) % sameCategory.length;
          if (catIndex !== catIndex2) {
            selectedProducts.push(sameCategory[catIndex2]);
          }
        }
      }

      if (sameFileType.length > 0 && selectedProducts.length < 4) {
        const fileTypeIndex = seed % sameFileType.length;
        const fileTypeProduct = sameFileType[fileTypeIndex];

        if (!selectedProducts.some((p) => p.id === fileTypeProduct.id)) {
          selectedProducts.push(fileTypeProduct);
        }
      }

      if (sameDesigner.length > 0 && selectedProducts.length < 4) {
        const designerIndex = seed % sameDesigner.length;
        const designerProduct = sameDesigner[designerIndex];

        if (!selectedProducts.some((p) => p.id === designerProduct.id)) {
          selectedProducts.push(designerProduct);
        }
      }

      if (selectedProducts.length < 4) {
        const remainingProducts = otherProducts.filter(
          (p) => !selectedProducts.some((sp) => sp.id === p.id)
        );

        remainingProducts.sort((a, b) => {
          const scoreA = (parseInt(a.id, 10) * seed) % 100;
          const scoreB = (parseInt(b.id, 10) * seed) % 100;
          return scoreB - scoreA;
        });

        const neededCount = 4 - selectedProducts.length;
        selectedProducts = [
          ...selectedProducts,
          ...remainingProducts.slice(0, neededCount),
        ];
      }

      setRelatedProducts(selectedProducts);
    }
  }, [product]);

  useGSAP(() => {
    if (!containerRef.current || !product) return;

    gsap.set(".info-item .revealer p", {
      y: "105%",
    });

    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
        delay: 1,
      },
    });

    tl.to(".info-item .revealer:first-child p", {
      y: "0%",
      duration: 0.75,
    });

    tl.to(
      ".info-item .revealer:nth-child(2) p",
      {
        y: "0%",
        duration: 0.75,
      },
      "-=1.6"
    );

    if (descriptionRef.current) {
      const splitDescription = new SplitType(descriptionRef.current, {
        types: "lines",
        lineClass: "line",
      });

      splitDescription.lines.forEach((line) => {
        const content = line.innerHTML;
        line.innerHTML = `<span>${content}</span>`;
      });

      gsap.set("#product-description .line span", {
        y: "100%",
        display: "block",
      });

      tl.to(
        "#product-description .line span",
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.1,
        },
        "-=1.75"
      );
    }

    tl.fromTo(
      ".product-detail-img",
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
      },
      "-=2"
    );
  }, [product, containerRef]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h1>Product not found</h1>
        <div className="back-link" onClick={() => navigateTo("/catalogue")}>
          Back to Catalogue
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-page" ref={containerRef}>
      <div className="product-detail-container">
        <div className="product-detail-col product-detail-copy">
          <div className="info-row">
            <div className="info-item">
              <div className="revealer">
                <p>ID</p>
              </div>
              <div className="revealer">
                <p>{product.id}</p>
              </div>
            </div>
            <div className="info-item">
              <div className="revealer">
                <p>Designer</p>
              </div>
              <div className="revealer">
                <p>{product.designer}</p>
              </div>
            </div>
            <div className="info-item">
              <div className="revealer">
                <p>Date</p>
              </div>
              <div className="revealer">
                <p>{product.date}</p>
              </div>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <div className="revealer">
                <p>Name</p>
              </div>
              <div className="revealer">
                <p>{product.name}</p>
              </div>
            </div>
            <div className="info-item">
              <div className="revealer">
                <p>Compatibility</p>
              </div>
              <div className="revealer">
                <p>{product.compatibility}</p>
              </div>
            </div>
            <div className="info-item">
              <div className="revealer">
                <p>File Type</p>
              </div>
              <div className="revealer">
                <p>{product.fileType}</p>
              </div>
            </div>
          </div>
          <div className="info-row">
            <div className="info-item">
              <div className="revealer">
                {/* <p>Price</p> */}
              </div>
              <div className="revealer">
                {/* <p>${product.price}</p> */}
              </div>
            </div>
            <div className="info-item">
              <div className="revealer">
                <p>Info</p>
              </div>
              <p id="product-description" ref={descriptionRef}>
                {product.description.bodyCopy1}
              </p>
            </div>
            <div className="info-item"></div>
          </div>
          <div className="info-row" id="add-to-cart-row">
            <div className="info-item">
              <div
                className="add-to-cart-btn"
                ref={addToCartBtnRef}
                onClick={handleAddToCart}
              >
                <div className="revealer">
                  {/* <p>Add to cart</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-detail-col product-detail-images">
          {product.productImages.map((image, index) => (
            <div
              className={`product-detail-img product-detail-img-${index + 1}`}
              key={index}
            >
              <img src={`/product_images/${image}`} alt={product.name} />
            </div>
          ))}
        </div>
      </div>
      <div className="more-products">
        <div className="more-products-header">
          <p>Related Products</p>
        </div>
        <div className="more-products-list">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="related-product-link"
              onClick={() =>
                navigateTo(`/catalogue/${generateSlug(relatedProduct.name)}`)
              }
            >
              <div className="related-product-card">
                <div className="related-product-image">
                  <img
                    src={`/product_images/${relatedProduct.previewImg}`}
                    alt={relatedProduct.name}
                    className="related-product-img"
                  />
                </div>
                <div className="related-product-info">
                  <p className="related-product-name">{relatedProduct.name}</p>
                  <p className="related-product-price">
                    ${relatedProduct.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
