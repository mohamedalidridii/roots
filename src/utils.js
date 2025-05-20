export const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, "-");
};

export const findProductBySlug = (products, slug) => {
  return products.find((product) => generateSlug(product.name) === slug);
};

export const findArticleBySlug = (articles, slug) => {
  return articles.find((article) => generateSlug(article.title) === slug);
};
