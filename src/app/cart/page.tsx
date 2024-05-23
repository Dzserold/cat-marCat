import { getCart } from "@/lib/cart";
import Cart from "./Cart";

interface CartItem {
  productId: number;
  quantity: number;
}

interface Cart {
  id: number;
  expires: number;
  data: CartItem[];
}

export default async function page() {
  const cart = await getCart();

  return <Cart cart={cart as Cart | undefined} />;
}
