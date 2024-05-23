import { getOrders } from "@/lib/order";
import Orders from "./Orders";

interface Order {
  id: number;
  totalPrice: number;
  createdAt: Date;
  userId: number;
  products: Product[];
  orderedProducts: OrderedProducts[];
}

interface Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  discount: number;
  actualPrice: number;
  published: boolean;
}

interface OrderedProducts {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  registeredProductPrice: number;
  totalPrice: number;
}

export default async function page() {
  const orders = await getOrders();

  return <Orders orders={orders as unknown as Order[]} />;
}
