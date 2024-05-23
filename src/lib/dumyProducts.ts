"use server";

import prisma from "./db";

const dumyData = [
  {
    name: "T-Shirt",
    description: "Comfortable and stylish T-Shirt",
    stock: 100,
    price: 20,
    discount: 0,
    actualPrice: 20,
    published: false,
  },
  {
    name: "Coffee Mug",
    description: "Start your day with our vibrant coffee mug",
    stock: 50,
    price: 15,
    discount: 0,
    actualPrice: 15,
    published: false,
  },
  {
    name: "Wireless Headphones",
    description: "Immerse yourself in high-quality sound",
    stock: 20,
    price: 100,
    discount: 40,
    actualPrice: 60,
    published: false,
  },
  {
    name: "Notebook",
    description: "Capture your ideas in style",
    stock: 30,
    price: 12,
    discount: 0,
    actualPrice: 12,
    published: false,
  },
  {
    name: "Water Bottle",
    description: "Stay hydrated with our reusable water bottle",
    stock: 80,
    price: 8,
    discount: 0,
    actualPrice: 8,
    published: false,
  },

  {
    name: "Sunglasses",
    description: "Protect your eyes in style",
    stock: 15,
    price: 35,
    discount: 0,
    actualPrice: 35,
    published: false,
  },
  {
    name: "Backpack",
    description: "Carry your essentials comfortably",
    stock: 40,
    price: 50,
    discount: 0,
    actualPrice: 50,
    published: false,
  },
  {
    name: "Desk Lamp",
    description: "Light up your workspace in style",
    stock: 25,
    price: 20,
    discount: 0,
    actualPrice: 25,
    published: false,
  },
  {
    name: "Watch",
    description: "Timeless style for your wrist",
    stock: 10,
    price: 80,
    discount: 20,
    actualPrice: 64,
    published: false,
  },
  {
    name: "Wallet",
    description: "Keep your essentials organized",
    stock: 60,
    price: 18,
    discount: 0,
    actualPrice: 18,
    published: false,
  },

  {
    name: "Running Shoes",
    description:
      "Boost your performance with comfortable running shoes",
    stock: 75,
    price: 70,
    discount: 10,
    actualPrice: 63,
    published: true,
  },
  {
    name: "Plant Stand",
    description: "Elevate your indoor greenery",
    stock: 20,
    price: 30,
    discount: 0,
    actualPrice: 30,
    published: false,
  },
  {
    name: "Phone Case",
    description:
      "Protect your phone in style (Available in various colors)",
    stock: 100,
    price: 25,
    discount: 0,
    actualPrice: 25,
    published: true,
  },
  {
    name: "Gift Basket",
    description:
      "The perfect present for any occasion (Customizable)",
    stock: 50,
    price: 20,
    discount: 50,
    actualPrice: 10,
    published: true,
  },
  {
    name: "Travel Mug",
    description: "Keep your coffee hot on the go",
    stock: 10, // Example of using a string for stock
    price: 15,
    discount: 0,
    actualPrice: 15,
    published: false,
  },
  {
    name: "Board Game",
    description: "Family fun night guaranteed (For ages 8+) ",
    stock: 30,
    price: 40,
    discount: 10,
    actualPrice: 36,
    published: true,
  },
  {
    name: "T-Shirt (Limited Edition)",
    description: "Get yours before they're gone!",
    stock: 20,
    price: 30,
    discount: 0,
    actualPrice: 30,
    published: true,
  },
  {
    name: "Subscription Box",
    description:
      "Surprise yourself with a curated box delivered monthly (Choose your plan)",
    stock: 20,
    price: 10,
    discount: 0,
    actualPrice: 10,
    published: true,
  },
  {
    name: "Vintage Camera",
    description:
      "Capture timeless memories with a classic camera",
    stock: 1, // Example of a single item in stock
    price: 200,
    discount: 0,
    actualPrice: 200,
    published: true,
  },
  {
    name: "Gift Certificate",
    description:
      "The perfect gift for any occasion (Various denominations available)",
    stock: 200, // Example of unlimited stock
    price: 10,
    discount: 0,
    actualPrice: 10,
    published: true,
  },
];

export default async function createDummyProducts() {
  try {
    const res = await prisma.product.createMany({
      data: dumyData,
      skipDuplicates: true,
    });
    console.log("OK");
  } catch (error) {
    console.log(error);
  }
}
