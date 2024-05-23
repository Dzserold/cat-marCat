"use server";

import prisma from "./db";

interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  expires: number;
  data: CartItem[];
}

export default async function makeOrder(data: Cart) {
  // Validate cart data
  if (!data.id || !data.expires || !data.data)
    return {
      status: 400,
      message: "Invalid cart data",
    };

  // Check if cart is expired
  const currentTime = new Date();
  if (currentTime.getTime() > data.expires)
    return {
      status: 400,
      message: "Cart is expired",
    };

  // Check if cart is empty
  if (data.data.length === 0)
    return {
      status: 400,
      message: "Cart is empty",
    };

  // Check if cart is valid
  data.data.forEach((item) => {
    if (item.quantity <= 0)
      return {
        status: 400,
        message: "Invalid cart data",
      };
  });

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: {
      id: data.id,
    },
  });

  if (!user)
    return {
      status: 400,
      message: "Invalid cart data",
    };
  // Get the products from the cart

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: data.data.map((item) => item.productId),
      },
    },
    select: {
      id: true,
      name: true,
      actualPrice: true,
      stock: true,
    },
  });
  // Check if all products exist in the cart
  if (products.length !== data.data.length)
    return {
      status: 400,
      message: "Invalid cart data",
    };

  const cart = data.data.map((item) => ({
    productId: item.productId,
    quantity: item.quantity,
    price:
      products.find((p) => p.id === item.productId)
        ?.actualPrice || 0,
  }));

  try {
    // First Create order from product in database
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        products: {
          connect: products.map((item) => ({
            id: item.id,
          })),
        },
        totalPrice: cart.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      },
    });

    // Attach the ordered products that comes from clien to the prev created order
    const orderedProducts =
      await prisma.orderedProducts.createMany({
        data: cart.map((item) => ({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          registeredProductPrice: item.price,
          TotalPrice: item.price * item.quantity,
        })),
      });

    return {
      status: 200,
      message: "Order created successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Something went wrong",
    };
  }
}

export async function getOrders() {
  const orders = await prisma.order.findMany({
    include: {
      products: true,
      orderedProducts: true,
    },
  });
  return orders;
}
