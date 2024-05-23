import { cookies } from "next/headers";
import { decrypt, encrypt } from "./jwt";

interface ToCart {
  userId: number;
  productId: number;
  quantity: number;
}

interface Product {
  productId: number;
  quantity: number;
}

export async function getCart() {
  const cart = cookies().get("Cart")?.value;
  if (cart) return await decrypt(cart);
}

export async function addToCart(data: ToCart) {
  const id = data.userId;
  let products: Array<Product> = [
    {
      productId: data.productId,
      quantity: data.quantity,
    },
  ];

  const cart = await getCart();

  if (cart && Array.isArray(cart.data)) {
    // Check if product is already in cart
    // if yess it will increase quantity else makes a new product
    cart.data.forEach((product) => {
      if (product.productId === products[0].productId) {
        products[0].quantity += product.quantity;
      } else {
        products.push(product);
      }
    });
  }

  try {
    // Save added product as a JWT cookie
    const currentTime = new Date();
    const expires = currentTime.setDate(
      currentTime.getDate() + 14
    );

    const session = await encrypt({
      id: id,
      expires: expires,
      data: products,
    });

    cookies().set("Cart", session, {
      expires,
      httpOnly: true,
    });

    return {
      status: 200,
      message: "Cart updated successfully",
    };
  } catch (error) {
    return { status: 500, message: "Something went wrong" };
  }
}

export async function setQuantity(id: number, quantity: number) {
  const cart = await getCart();

  if (!cart || !Array.isArray(cart.data)) {
    return { status: 500, message: "Something went wrong" };
  }
  // Find the right data to update quantity
  cart.data.forEach((product) => {
    if (product.productId === id) {
      product.quantity = quantity;
    }
  });

  try {
    // Save added product as a JWT cookie with new data
    const currentTime = new Date();
    const expires = currentTime.setDate(
      currentTime.getDate() + 14
    );

    const session = await encrypt({
      id: cart.id,
      expires: expires,
      data: cart.data,
    });

    cookies().set("Cart", session, {
      expires,
      httpOnly: true,
    });

    return {
      status: 200,
      message: "Cart updated successfully",
    };
  } catch (error) {
    return { status: 500, message: "Something went wrong" };
  }
}

export async function deleteProduct(id: number) {
  const cart = await getCart();

  if (!cart || !Array.isArray(cart.data)) {
    return { status: 500, message: "Something went wrong" };
  }
  // Find the right data to delete
  const newData = cart.data.filter(
    (product) => product.productId !== id
  );

  try {
    // Save added product as a JWT cookie with new data
    const currentTime = new Date();
    const expires = currentTime.setDate(
      currentTime.getDate() + 14
    );
    const session = await encrypt({
      id: cart.id,
      expires: expires,
      data: newData,
    });
    cookies().set("Cart", session, {
      expires,
      httpOnly: true,
    });
    return {
      status: 200,
      message: "Cart updated successfully",
    };
  } catch (error) {
    return { status: 500, message: "Something went wrong" };
  }
}

export async function deleteCart() {
  return await cookies().delete("Cart");
}
