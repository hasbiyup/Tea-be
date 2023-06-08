let Product = [
  {
    number: 1,
    type: "Single Origin",
    name: "WHITE TEA SILVER NEEDLE",
    ings: ["White tea"],
    highlight: "Light • Relaxing • Soft",
    brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "3-4 mins"], 
    desc: "The finest tea bud with a sweet aroma and a delicate taste. Harvested before sunrise to its preserve aroma, taste, and nutrients. Best consumed in the evening or when stressed to get a calming effect.",
  },
  {
    number: 2,
    type: "Tea Blend",
    name: "ROMANCE DAWN",
    ings: ["White tea", ", osmanthus"],
    highlight: "Floral • Sweet • Mild",
    brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "3-4 mins"], 
    desc: "The dawn (start) of a romantic adventure. Harvested only before dawn, this combination of white tea and osmanthus symbolise the beginning of a tales full of romance and a neverending adventure. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    number: 3,
    type: "Tea Blend",
    name: "MINTY CALM",
    ings: ["Green tea", ", peppermint"],
    highlight: "Menthol Fresh • Mint • Mild",
    brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "2-3 mins"],
    desc: "A blend of green tea and peppermint, which rich in antioxidants and antibacterials to help quelling the unrest.",
  },
];

export function getProduct() {
  return Product;
}

export function getProducts(number) {
  return Product.find((Product) => Product.number === number);
}