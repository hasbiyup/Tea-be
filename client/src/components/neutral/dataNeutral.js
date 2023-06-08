let Product = [
    {
      number: 1,
      type: "Single Origin",
      name: "LIGHT OOLONG TEA",
      ings: ["Light Oolong"],
      highlight: "Earthy • Refreshing • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"], 
      desc: "A semi oxidation tea with a delicate, yet complex flavor. Has a pale yellow color when brewed, slight bitterness, and pleasant lasting aftertaste",
    },
    {
      number: 2,
      type: "Single Origin",
      name: "BLACK TEA ROYAL",
      ings: ["Black tea"],
      highlight: "Sweet • Fruity • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"], 
      desc: "Full bodied black tea with a sweet taste and fruity note. Has a nice amber color when brewed",
    },
    {
      number: 3,
      type: "Tea Blend",
      name: "EARL GREY",
      ings: ["Black Tea", ", bergamot oil", ", rosemary", ", lavender"],
      highlight: "Fragrant • Lemon-y • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"],
      desc: "A classic tea blend beloved by many from 1824 and named after Charles Grey, 2nd Earl Grey, British Prime Minister in the 1830s. The combination of black tea, bergamot oil, and lavender gives the impression of elegance and luxury, and makes this tea one of the prima donnas in all parts of the world",
    },
    {
        number: 4,
        type: "Tea Blend",
        name: "ROYAL TAMANSARI",
        ings: ["Green Tea", ", champaka", ", cananga", ", jasmine", ", pandan", ", flavor extract"],
        highlight: "Floral • Tropical • Light",
        brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "2-3 mins"],
        desc: "This masterfully crafted green tea with Indonesian flowers blend is an homage to Yogyakarta's Taman Sari bathing complex. The combination of green tea, exotic flowers and pandan leaves will make you feel like royalty from the very first sip",
    },
  ];
  
  export function getProduct() {
    return Product;
  }
  
  export function getProducts(number) {
    return Product.find((Product) => Product.number === number);
  }
  