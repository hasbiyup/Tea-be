let Product = [
    {
      number: 1,
      type: "Single Origin",
      name: "DARK OOLONG TEA",
      ings: ["Dark Oolong"],
      highlight: "Smoky • Nutty • Heavy",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"], 
      desc: "A semi oxidation tea with a heavy and umami flavor. Legends said that the name Oolong is derived from its shape that looks like a black dragon (wulong in Chinese)",
    },
    {
      number: 2,
      type: "Tea Blend",
      name: "WHIMSICAL MANGO",
      ings: ["Green tea", ", chili", ", mango essence"],
      highlight: "Fruity • Spicy • Bright",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "3-5 mins"], 
      desc: "Feeling whimsical, we crafted tea, that is spicy. Why? Just for fun",
    },
    {
      number: 3,
      type: "Tea Blend",
      name: "MINT ICE CREAM",
      ings: ["Black Tea", ", spearmint", ", cornflower", ", myosotis petal", ", flavour extract"],
      highlight: "Mint • Cream • Heavy",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "3-5 mins"],
      desc: "Contradiction in a cup. Black tea with sensation of Mint Ice Cream",
    },
    {
        number: 4,
        type: "Tea Blend",
        name: "NUSANTARA",
        ings: ["Black Tea", ", coffee bean", ", cornflower", ", flavor extract"],
        highlight: "Bitter • Nutty • Bold",
        brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "3-5 mins"],
        desc: "Tea, coffee, or me? Alternative for those who doesn't drink coffee anymore",
    },
  ];
  
  export function getProduct() {
    return Product;
  }
  
  export function getProducts(number) {
    return Product.find((Product) => Product.number === number);
  }
  