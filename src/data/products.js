const products = [
  {
    _id: "1",
    name: "LED Panel Light 15W",
    productOverview: "High-efficiency panel light for office spaces.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image1.gif",
        public_id: "products/image1",
        _id: "img1",
      },
    ],
    highlights: ["Energy saving", "Sleek design", "Long life"],
    price: 299,
    categoryName: "first category",
    application: "first application",
    view: false,
    slug: "led-panel-light-15w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "2",
    name: "LED Downlight 12W",
    productOverview: "Bright and compact ceiling light.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image2.gif",
        public_id: "products/image2",
        _id: "img2",
      },
    ],
    highlights: ["Compact size", "Low heat", "Durable"],
    price: 199,
    categoryName: "first category",
    application: "office",
    view: false,
    slug: "led-downlight-12w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "3",
    name: "LED Tube Light 18W",
    productOverview: "Bright tube for home and office use.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image3.gif",
        public_id: "products/image3",
        _id: "img3",
      },
    ],
    highlights: ["Wide coverage", "Easy install", "Energy efficient"],
    price: 249,
    categoryName: "first category",
    application: "home",
    view: false,
    slug: "led-tube-light-18w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "4",
    name: "LED Bulb 9W",
    productOverview: "Standard LED bulb with long life.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image4.gif",
        public_id: "products/image4",
        _id: "img4",
      },
    ],
    highlights: ["High brightness", "Low power", "Fits standard socket"],
    price: 99,
    categoryName: "first category",
    application: "home",
    view: false,
    slug: "led-bulb-9w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "5",
    name: "Smart LED Strip",
    productOverview: "RGB strip light with mobile app control.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image5.gif",
        public_id: "products/image5",
        _id: "img5",
      },
    ],
    highlights: ["RGB colors", "App controlled", "Flexible design"],
    price: 499,
    categoryName: "first category",
    application: "decor",
    view: false,
    slug: "smart-led-strip",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "6",
    name: "LED Spotlight 5W",
    productOverview: "Focused lighting for displays and accents.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image6.gif",
        public_id: "products/image6",
        _id: "img6",
      },
    ],
    highlights: ["Sharp focus", "Modern look", "Energy saving"],
    price: 149,
    categoryName: "first category",
    application: "showroom",
    view: false,
    slug: "led-spotlight-5w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "7",
    name: "LED Flood Light 50W",
    productOverview: "Outdoor lighting solution for wide coverage.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image7.gif",
        public_id: "products/image7",
        _id: "img7",
      },
    ],
    highlights: ["Weather resistant", "High brightness", "Durable casing"],
    price: 899,
    categoryName: "first category",
    application: "outdoor",
    view: false,
    slug: "led-flood-light-50w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "8",
    name: "LED High Bay Light 100W",
    productOverview: "Industrial lighting for warehouses.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image8.gif",
        public_id: "products/image8",
        _id: "img8",
      },
    ],
    highlights: ["High lumen output", "Industrial grade", "Shockproof"],
    price: 1599,
    categoryName: "first category",
    application: "industrial",
    view: false,
    slug: "led-high-bay-100w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "9",
    name: "LED Street Light 30W",
    productOverview: "Cost-effective and long-lasting street light.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image9.gif",
        public_id: "products/image9",
        _id: "img9",
      },
    ],
    highlights: ["Street-safe design", "Long life", "Energy efficient"],
    price: 599,
    categoryName: "first category",
    application: "street",
    view: false,
    slug: "led-street-light-30w",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },
  {
    _id: "10",
    name: "LED Ceiling Light",
    productOverview: "Elegant ceiling light for modern homes.",
    images: [
      {
        url: "https://res.cloudinary.com/demo/image/upload/products/image10.gif",
        public_id: "products/image10",
        _id: "img10",
      },
    ],
    highlights: ["Elegant", "Bright", "Easy install"],
    price: 350,
    categoryName: "first category",
    application: "home",
    view: false,
    slug: "led-ceiling-light",
    createdAt: "2025-06-02T09:46:13.252Z",
    updatedAt: "2025-06-02T09:55:02.916Z",
    __v: 0,
  },

  // You can generate the remaining 10 similarly or I can generate full 20 if needed
];

export default products;
