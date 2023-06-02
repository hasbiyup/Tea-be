let Product = [
    {
      number: 1,
      type: "Single Origin",
      name: "BLACK TEA SPECIAL",
      ings: ["Black Tea"],
      highlight: "Sweet • Honey • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"], 
      desc: "A fully oxidized tea with a sweet taste and honey note.  Your best friend in the morning to boost your mood and be more focused",
    },
    {
      number: 2,
      type: "Tea Blend",
      name: "CHEERFUL BERRY",
      ings: ["Black tea", ", hibiscus", ", dried berry"],
      highlight: "Fruity • Berry Sweet • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "100 C", "4-5 mins"], 
      desc: "Sweet and sour, to cheer your day. A blend of black tea with hibiscus and dried berry perfect to make your day more cheerful",
    },
    {
      number: 3,
      type: "Tea Blend",
      name: "SWEET SUMMER",
      ings: ["Green Tea", ", chamomile"],
      highlight: "Floral • Sweet • Mild",
      brew: ["1 teaspoon (2 g)", "200-250 mL", "80 C", "2-3 mins"],
      desc: "As sweet as summer as you. Combining the benefits of green tea and the sweet aroma and taste of chamomile flowers, this is the perfect companion for your date",
    },
    {
        number: 4,
        type: "Tea Blend",
        name: "SCARLETT",
        ings: ["Green Tea", ", hibiscus", ", blueberry", ", mango", ", safflower", ", flavor extract", ", myosotis petal"],
        highlight: "Fresh • Tangy • Bright",
        brew: ["1 teaspoon (2 g)", "200-250 mL", "90 C", "2-3 mins"],
        desc: "Imagine it's Saturday morning where you wake up fresh and ready for your weekend. Put on your best dress or dance to your favorite tune while sipping on Scarlett to boost your weekend moods!",
    },
    {
        number: 5,
        type: "Tea Blend",
        name: "MORNING SPIRIT",
        ings: ["Green Tea", ", rose petal", ", myosotis petal", ", flavour extract"],
        highlight: "Fruity • Tropical • Medium",
        brew: ["1 teaspoon (2 g)", "200-250 mL", "90 C", "2-3 mins"],
        desc: "Feel the morning in your cup every time you need it! Green Tea with various flowers & a dash of morning",
      },
  ];
  
  export function getProduct() {
    return Product;
  }
  
  export function getProducts(number) {
    return Product.find((Product) => Product.number === number);
  }
  