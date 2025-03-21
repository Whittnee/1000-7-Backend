const express = require("express");
const app = express();
const cors = require("cors");
const Stripe = require("stripe")
const axios = require("axios");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const products = [
  {
    id: 1,
    name: "Dead Ghoul",
    price: 12.99,
    images: [
      "https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/3/3045/3045283/previews/people_1_mansmockfull_front_white_700.jpg",
      "https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/3/3045/3045283/previews/people_5_mansmockfull_back_white_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Sweatshirt",
    rating: 4.6,
    discount: 15,
    discountedPrice: 11.04,
    isNew: true,
    popular: false,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: ["Black", "White"],
  },
  {
    id: 2,
    name: "Drain Face",
    price: 9.99,
    images: [
      "https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/3/3053/3053881/previews/people_4_womansmockfull_front_white_700.jpg",
      "https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/3/3053/3053881/previews/people_5_mansmockfull_back_white_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Sweatshirt",
    rating: 4.4,
    discount: null,
    discountedPrice: 9.99,
    isNew: false,
    popular: false,
    sizes: ["Small", "Medium", "X-Large"],
    colors: ["Black", "White"],
  },
  {
    id: 3,
    name: "Rei & Asuka",
    price: 21.99,
    images: [
      "https://vm.vse-footbolki.ru/image/vm/jpg/0/3/3095/3095893/previews/people_4_manlongfull_front_white_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Sweatshirt",
    rating: 5,
    discount: 5,
    discountedPrice: 20.9,
    isNew: true,
    popular: true,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: ["Grey", "White", "Bisque"],
  },
  {
    id: 4,
    name: "Thousand-seven",
    price: 17.99,
    images: [
      "https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/2/2960/2960955/previews/people_4_child_long_cotton_front_darkblue_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Sweatshirt",
    rating: 4.9,
    discount: 25,
    discountedPrice: 13.49,
    isNew: true,
    popular: false,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: ["Blue", "Slateblue", "Black"],
  },
  {
    id: 5,
    name: "ZERO-TWO",
    price: 17.99,
    images: [
      "https://vm.vse-footbolki.ru/image/vm/jpg/0/3/3002/3002659/previews/people_1_mansmockfull_front_black_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Sweatshirt",
    rating: 4.9,
    discount: 25,
    discountedPrice: 13.49,
    isNew: true,
    popular: false,
    sizes: ["Medium", "Large", "X-Large"],
    colors: ["Black", "White", "Pink"],
  },
  {
    id: 6,
    name: "DEAD INSIDE MODE",
    price: 15.99,
    images: [
      "https://vm.vse-footbolki.ru/image/vm/jpg/0/3/3014/3014625/previews/people_4_manshortfull_front_white_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "T-Shirt",
    rating: 4.5,
    discount: 20,
    discountedPrice: 12.8,
    isNew: false,
    popular: true,
    sizes: ["Medium", "Large", "X-Large"],
    colors: ["White"],
  },
  {
    id: 7,
    name: "Darling in the franxx",
    price: 15.99,
    images: [
      "https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/1/1819/1819789/previews/people_4_manshortfull_front_white_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "T-Shirt",
    rating: 4.8,
    discount: 20,
    discountedPrice: 12.8,
    isNew: false,
    popular: true,
    sizes: ["Medium", "Large", "X-Large"],
    colors: ["Grey", "White", "Black"],
  },
  {
    id: 8,
    name: "Tokyo Revengers",
    price: 24.99,
    images: [
      "https://vm.vse-footbolki.ru/image/vm/jpg/0/3/3145/3145985/previews/people_7_manshort_front_white_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "T-Shirt",
    rating: 4.4,
    discount: null,
    discountedPrice: 24.99,
    isNew: false,
    popular: true,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: ["White", "Black", "Grey"],
  },
  {
    id: 9,
    name: "Rei Ayanami",
    price: 40.99,
    images: [
      "https://vm.vse-footbolki.ru/image/vm/jpg/0/3/3184/3184985/previews/people_1_man_pajamas_front_black_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Pajamas",
    rating: 4.9,
    discount: 30,
    discountedPrice: 28.69,
    isNew: false,
    popular: true,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: ["Black", "White"],
  },
  {
    id: 10,
    name: "AKATSUKI's Cloud",
    price: 33.99,
    images: [
      "https://sankt-peterburg.vse-footbolki.ru/image/catalog/vsm/0/0/152/152519/previews/people_7_man_hoodie_oversize_front_darkblue_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Hoodie",
    rating: 4.7,
    discount: 10,
    discountedPrice: 30.59,
    isNew: true,
    popular: false,
    sizes: ["Small", "Medium", "Large", "X-Large"],
    colors: ["Blue", "Aquamarine", "White", "LightCoral"],
  },
  {
    id: 11,
    name: "Hate myself",
    price: 175.99,
    images: [
      "https://vm.vse-footbolki.ru/image/vm/jpg/0/3/3129/3129095/previews/people_5_man_winter_jacket_front_black_700.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "Jacket",
    rating: 4.7,
    discount: 17,
    discountedPrice: 146.07,
    isNew: true,
    popular: false,
    sizes: ["Medium", "Large", "X-Large"],
    colors: ["Black", "Grey", "White"],
  },
  {
    id: 12,
    name: "RTX 5090",
    price: 2999.99,
    images: [
      "https://img.telemart.ua/721209-913458-product_popup/msi-geforce-rtx-5090-gaming-trio-oc-32768mb-rtx-5090-32g-gaming-trio-oc.jpg",
    ],
    description:
      "Вы настолько богаты, а я настолько нет, что между нами искажается пространственно-временной континуум, а законы физики перестают работать. Но тепло, излучаемое изгибающимся светом, приносит в мир радость контента.",
    category: "Graphics Card",
    rating: 4.7,
    discount: null,
    discountedPrice: 2999.99,
    isNew: true,
    popular: false,
    sizes: ["Medium", "Large", "X-Large"],
    colors: ["Black", "Grey", "White"],
  },
  {
    id: 13,
    name: "Dead Despair",
    price: 18.99,
    images: [
      "https://vm.vse-footbolki.ru/image/vm/jpg/0/3/3120/3120579/previews/people_1_mansmockfull_front_black_700.jpg",
    ],
    description:
      "Вы настолько богаты, а я настолько нет, что между нами искажается пространственно-временной континуум, а законы физики перестают работать. Но тепло, излучаемое изгибающимся светом, приносит в мир радость контента.",
    category: "Sweatshirt",
    rating: 4.5,
    discount: null,
    discountedPrice: 19.99,
    isNew: true,
    popular: true,
    sizes: ["Medium", "X-Large"],
    colors: ["Black", "White"],
  },
];

const formatPrice = (price) => Math.round(price * 100) / 100;

const carts = {};

app.get("/get-location", async (req, res) => {
  try {
    const { data: ipData } = await axios.get("https://api64.ipify.org?format=json");
    const ip = ipData.ip;
    const { data: locationData } = await axios.get(`http://ip-api.com/json/${ip}`);

    res.json({ country: locationData.country, city: locationData.city });
  } catch (error) {
    console.error("Error getting location", error);
    res.status(500).json({ error: "Failed to get location" });
  }
});

app.get("/products", (req, res) => {
  const productList = products.map(
    ({
      id,
      name,
      price,
      images,
      rating,
      category,
      discount,
      discountedPrice,
      isNew,
      popular,
      sizes,
      colors,
    }) => ({
      id,
      name,
      price,
      category,
      image: images[0],
      rating,
      discount,
      discountedPrice,
      isNew,
      popular,
      sizes,
      colors
    })
  );
  res.json(productList);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const product = products.find((product) => product.id === Number(id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;
  const cart = carts[userId] || [];
  const subtotal = formatPrice(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
  const discount = formatPrice(
    cart.reduce(
      (sum, item) => sum + (item.price - item.discountedPrice) * item.quantity,
      0
    )
  );
  const deliveryFee = formatPrice((subtotal - discount) * 0.1);
  const total = formatPrice(subtotal - discount + deliveryFee);
  res.json({
    clothes: cart,
    totalPrices: { subtotal, total, discount, deliveryFee },
  });
});

app.delete("/cart/:userId", (req, res) => {
  const { userId } = req.params;
  carts[userId] = [];
  res.status(204).send();
})

app
  .route("/cart")
  .post((req, res) => {
    const { userId, productId, size, color } = req.body;
    if (!carts[userId]) carts[userId] = [];
    const product = products.find((product) => product.id === productId);
    if (!product) return res.status(404).json({ error: "Product not found" });
    carts[userId].push({
      ...product,
      quantity: 1,
      size,
      color,
    });
    res.status(204).send();
  })
  .patch((req, res) => {
    const { userId, productId, quantity } = req.body;
    if (!carts[userId])
      return res.status(404).json({ error: "Cart not found" });
    const cart = carts[userId];
    const item = cart.find((item) => item.id === productId);
    if (!item) return res.status(404).json({ error: "Item not found" });
    item.quantity = quantity > 0 ? quantity : 1;
    res.status(204).send();
  })
  .delete((req, res) => {
    const { userId, productId } = req.body;
    if (!carts[userId])
      return res.status(404).json({ error: "Cart not found" });
    carts[userId] = carts[userId].filter((item) => item.id !== productId);
    res.status(204).send();
  });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items, userId } = req.body;
    console.log("userId", userId);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: "http://localhost:3000/?status=success",
      cancel_url: "http://localhost:3000/cart",
      metadata: { userId }
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session", err);
    res.status(500).json({ error: err.message });
  }
});


const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Сервер запущен на http://localhost:${PORT}`)
);
