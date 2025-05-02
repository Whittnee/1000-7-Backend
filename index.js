const express = require("express");
const app = express();
const cors = require("cors");
const Stripe = require("stripe");
const axios = require("axios");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/images", express.static("public/images"));

const products = [
  {
    id: 1,
    name: "Dead Ghoul",
    price: 12.99,
    images: [
      "/images/product-1-0.jpg",
      "/images/product-1-1.jpg",
    ],
    description:
      "The perfect balance of warmth and style. This sweatshirt is made from premium fabric, offering a soft touch and a cozy fit for everyday wear.",
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
      "/images/product-2-0.jpg",
      "/images/product-2-1.jpg",
    ],
    description:
      "Effortlessly cool and endlessly comfortable. This sweatshirt is designed with a relaxed fit and a clean-cut look, making it a staple for any season.",
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
      "/images/product-3-0.jpg",
    ],
    description:
      "Upgrade your wardrobe with this versatile long-sleeve tee. Whether you're going for a relaxed or layered look, its comfortable fit makes it a perfect choice.",
    category: "Longsleeve",
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
      "/images/product-4-0.jpg",
    ],
    description:
      "A sleek and stylish long-sleeve shirt made for those in-between weather days. Crafted from soft, breathable fabric, it keeps you cozy without overheating",
    category: "Longsleeve",
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
      "/images/product-5-0.jpg",
    ],
    description:
      "Casual, cozy, and built for layering. Whether you’re lounging or out and about, this sweatshirt provides the perfect mix of comfort and style.",
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
      "/images/product-6-0.jpg",
    ],
    description:
      "Stay comfortable and stylish with our premium cotton T-shirt. Designed for everyday wear, it offers a soft feel and a perfect fit that keeps you looking fresh all day.",
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
      "/images/product-7-0.jpg",
    ],
    description:
      "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
    category: "T-Shirt",
    rating: 4.8,
    discount: 20,
    discountedPrice: 12.8,
    isNew: false,
    popular: true,
    sizes: ["Large", "X-Large"],
    colors: ["Grey", "White", "Black"],
  },
  {
    id: 8,
    name: "Tokyo Revengers",
    price: 24.99,
    images: [
      "/images/product-8-0.jpg",
    ],
    description:
      "Minimalist yet versatile, this tee features a sleek design that pairs effortlessly with any outfit. Elevate your casual style with its superior comfort and durability.",
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
      "/images/product-9-0.jpg",
    ],
    description:
      "Drift into a peaceful night's sleep with our ultra-soft pajama set. Made from breathable, lightweight fabric, it ensures maximum comfort for a restful night.",
    category: "Pajamas",
    rating: 4.9,
    discount: 30,
    discountedPrice: 28.69,
    isNew: false,
    popular: true,
    sizes: ["Small", "Large", "X-Large"],
    colors: ["Black", "White"],
  },
  {
    id: 10,
    name: "AKATSUKI's Cloud",
    price: 33.99,
    images: [
      "/images/product-10-0.jpg",
    ],
    description:
      "Wrap yourself in warmth with our ultra-soft hoodie. Made from high-quality fleece, it provides maximum coziness while keeping your style on point.",
    category: "Hoodie",
    rating: 4.7,
    discount: 10,
    discountedPrice: 30.59,
    isNew: true,
    popular: false,
    sizes: ["Medium", "Large", "X-Large"],
    colors: ["Blue", "Aquamarine", "White", "LightCoral"],
  },
  {
    id: 11,
    name: "Hate myself",
    price: 175.99,
    images: [
      "/images/product-11-0.jpg",
    ],
    description:
      "Brave the elements in style with our durable and weather-resistant jacket. Designed for both function and fashion, it keeps you warm without compromising on looks.",
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
      "https://i.ibb.co.com/WvrTTDq6/1024.png",
      "https://storage-asset.msi.com/global/picture/image/feature/vga/NVIDIA/new-gen/gb202-300-gaming-trio/images/kv_vga.png",
      "https://storage-asset.msi.com/global/picture/image/feature/vga/NVIDIA/new-gen/gb202-300-gaming-trio/images/card-f-1.png"
    ],
    description:
      "Вы настолько богаты, а я настолько нет, что между нами искажается пространственно-временной континуум, а законы физики перестают работать. Но тепло, излучаемое изгибающимся светом, приносит в мир радость контента.",
    category: "Graphics Card",
    rating: 4.7,
    discount: null,
    discountedPrice: 2999.99,
    isNew: false,
    popular: false,
    sizes: ["X-Large"],
    colors: ["Black", "Grey", "White"],
  },
  {
    id: 13,
    name: "Dead Despair",
    price: 18.99,
    images: [
      "/images/product-13-0.jpg",
    ],
    description:
      "Stay cozy and stylish with this classic sweatshirt. Made from ultra-soft cotton blend, it’s perfect for chilly days and casual outfits.",
    category: "Sweatshirt",
    rating: 4.5,
    discount: null,
    discountedPrice: 19.99,
    isNew: false,
    popular: true,
    sizes: ["Medium", "X-Large"],
    colors: ["Black", "White"],
  },
  {
    id: 14,
    name: "Intermission",
    price: 35.99,
    images: [
      "/images/product-14-0.jpg",
    ],
    description:
      "The perfect blend of comfort and street style. This hoodie features a relaxed fit, adjustable drawstring hood, and a kangaroo pocket for a laid-back yet modern look.",
    category: "Hoodie",
    rating: 5,
    discount: null,
    discountedPrice: 35.99,
    isNew: true,
    popular: false,
    sizes: ["Medium", "X-Large"],
    colors: ["Pink", "Orange", "SpringGreen"],
  },
  {
    id: 15,
    name: "Evangelion",
    price: 17.99,
    images: [
      "/images/product-15-0.jpg",
    ],
    description:
      "A timeless classic, this T-shirt is crafted from breathable fabric to keep you cool and confident. Whether layered or worn solo, it's a must-have for any wardrobe.",
    category: "T-Shirt",
    rating: 4.3,
    discount: 25,
    discountedPrice: 13.49,
    isNew: false,
    popular: false,
    sizes: ["Small", "X-Large"],
    colors: ["White", "Black"],
  },
  {
    id: 16,
    name: "Avocado",
    price: 35.99,
    images: [
      "/images/product-16-0.jpg",
    ],
    description:
      "Drift into dreamland with this ultra-soft pajama set. Designed for maximum comfort, it’s perfect for lazy mornings and cozy nights.",
    category: "Pajamas",
    rating: 4.7,
    discount: 10,
    discountedPrice: 32.39,
    isNew: false,
    popular: true,
    sizes: ["Medium", "X-Large"],
    colors: ["Black", "Orange", "Pink", "Aquamarine"]
  },
  {
    id: 17,
    name: "Kisuke Urahara",
    price: 29.99,
    images: [
      "/images/product-17-0.jpg",
    ],
    description:
      "Designed for a laid-back streetwear look, this oversized hoodie offers both comfort and a modern edge. Pair it with your favorite jeans or joggers.",
    category: "Hoodie",
    rating: 5,
    discount: null,
    discountedPrice: 29.99,
    isNew: true,
    popular: false,
    sizes: ["Small", "Large"],
    colors: ["Black", "White", "LightCoral"]
  },
  {
    id: 18,
    name: "Penguinius",
    price: 32.99,
    images: [
      "/images/product-18-0.jpg",
    ],
    description:
      "Made from breathable fabric, this pajama set keeps you comfortable all night long. The relaxed fit makes it ideal for lounging in style.",
    category: "Pajamas",
    rating: 4.5,
    discount: null,
    discountedPrice: 32.99,
    isNew: false,
    popular: true,
    sizes: ["Large", "X-Large"],
    colors: ["Aquamarine", "Pink", "SpringGreen"]
  },
  {
    id: 19,
    name: "Silly Ghoul",
    price: 27.99,
    images: [
      "/images/product-19-0.jpg",
    ],
    description:
      "A must-have for any wardrobe, this hoodie combines warmth and style. The soft fleece lining makes it perfect for layering on colder days.",
    category: "Hoodie",
    rating: 4.9,
    discount: 15,
    discountedPrice: 23.79,
    isNew: true,
    popular: true,
    sizes: ["Medium", "X-Large"],
    colors: ["LightPink", "SlateBlue"]
  },
];

const formatPrice = (price) => Math.round(price * 100) / 100;

const carts = {};

app.get("/get-location", async (req, res) => {
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket.remoteAddress;
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    console.log(response.data);
    res.json({ country: response.data.country, city: response.data.city });
  } catch {
    res.status(500).json({ error: "Error getting location" });
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
      colors,
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
});

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
      metadata: { userId },
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating checkout session", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
