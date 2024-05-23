import { getProductById } from "@/lib/products";
import CartCard from "./CartCard";
import makeOrder from "@/lib/order";
import { deleteCart } from "@/lib/cart";
import { redirect } from "next/navigation";

interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  expires: number;
  data: CartItem[];
}

interface Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  quantity: number;
  discount: number;
  actualPrice: number;
  published: boolean;
}

export default async function Cart({
  cart,
}: {
  cart: Cart | undefined;
}) {
  const cartArray = [];

  if (cart) {
    for (let i = 0; i < cart.data.length; i++) {
      const product = await getProductById(
        cart.data[i].productId
      );
      cartArray.push({
        ...cart.data[i],
        ...product,
      });
    }
  }

  if (!cart || cart.data.length === 0) {
    return (
      <div className="px-10 text-3xl text-center">
        Seems like your cart is enmpty. Go quickly look around in
        the Shop page
      </div>
    );
  }
  return (
    <div className="text-center">
      <h1 className="py-4 text-3xl">Your chosen products</h1>
      <div className="flex flex-col gap-4">
        {cartArray &&
          cartArray.length > 0 &&
          cartArray.map((item) => (
            <CartCard
              key={item.productId}
              {...(item as Product)}
            />
          ))}
        <p className="text-2xl font-bold">
          Total price:{" "}
          <span className="text-green-800">
            {cartArray &&
              cartArray.length > 0 &&
              cartArray.reduce(
                (a, b) => a + (b.actualPrice ?? 0) * b.quantity,

                0
              )}
          </span>{" "}
          $
        </p>
        <form
          action={async () => {
            "use server";
            const res = await makeOrder(cart as Cart);
            if (res.status !== 200) {
              deleteCart();
              redirect("/");
            }
          }}
        >
          <button
            className="py-2 text-xl font-black bg-green-500 border-4 rounded-lg text-rose-950 px-7 border-rose-950 hover:scale-105"
            type="submit"
          >
            Order
          </button>
        </form>
      </div>
    </div>
  );
}
