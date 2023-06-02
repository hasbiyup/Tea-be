let Product = [
    {
      number: 1,
      type: "Tea Blend",
      name: "NIGHTHAWKS",
      ings: ["Green Tea", ", jasmine"],
      highlight: "Fragrant • Bittersweet • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "2-3 mins"], 
      desc: "Inspired by the painting  'Nighthawks' painted by Edward Hopper in 1942, a painting depicting alienation and loneliness in modern urban life. This green tea and jasmine flower blend is crafted in hopes to be an accompainment to overcome the alienation and loneliness feeling",
    },
    {
      number: 2,
      type: "Tea Blend",
      name: "DARK OPIUM",
      ings: ["Black tea", ", globe amaranth", ", cornflower", ", flavour extract", ", rosebud"],
      highlight: "Sweet • Fruity • Heavy",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "3-5 mins"], 
      desc: "Deep, dark, mysterious, & grand. A combination of black tea with various flower to help you falling in love",
    },
    {
      number: 3,
      type: "Single Origin",
      name: "MATCHA",
      ings: ["Green Tea"],
      highlight: "Grassy • Bittersweet • Mild",
      brew: ["(1 g)", "100 mL", "80 C", "20 sec"],
      desc: "During warring states era, Samurai (japanede warrior) often drink matcha to heighten their focus and battle sense before going to war. Due to increase in adrenaline level, their fighting spirits also reached it speak",
    },
  ];
  
  export function getProduct() {
    return Product;
  }
  
  export function getProducts(number) {
    return Product.find((Product) => Product.number === number);
  }
  