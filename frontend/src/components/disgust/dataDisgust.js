let Product = [
    {
      number: 1,
      type: "Single Origin",
      name: "YELLOW TEA",
      ings: ["Yellow Tea"],
      highlight: "Sweet • Nutty • Light",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "3-5 mins"], 
      desc: "A combination of a sweet and mellow flavor. Packed with antioxidants and benefical for cell rejuvenation. One of the rarest tea variety",
    },
    {
      number: 2,
      type: "Single Origin",
      name: "BLACK TEA RENGGANIS",
      ings: ["Black Tea"],
      highlight: "Rich • Mood Booster • Bold",
      brew: ["10 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"], 
      desc: "A strong black tea with herb aftertaste originated from the south of Bandung. Contain the highest caffeine level, with the benefit of fixing blood circulation",
    },
    {
      number: 3,
      type: "Tea Blend",
      name: "REMEDY",
      ings: ["Black Tea", ", ginger", ", lemongrass", ", clove"],
      highlight: "Aromatic • Spicy • Bold",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"],
      desc: "Tea blends with a touch of local wisdom. A mixture of black tea, ginger, lemongrass and cloves which are aromatic and rich in benefits to accompany you when you are not feeling well",
    },
  ];
  
  export function getProduct() {
    return Product;
  }
  
  export function getProducts(number) {
    return Product.find((Product) => Product.number === number);
  }
  