"use server";
import { getSession } from "@/lib/jwt";
import Product from "./Product";

interface Product {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  actualPrice: number;
  discount: number;
  published: boolean;
}

interface Session {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
  role: "ADMIN" | "USER";
  stayLoggedIn: boolean;
  expires: number;
}

export default async function Shop(props: {
  products: Product[];
}) {
  const session = (await getSession()) as Session | undefined;
  const sessionId = session?.id || null;
  const products = props.products;

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-2">
      {products.map((prod) => (
        <Product key={prod.id} {...prod} sessionId={sessionId} />
      ))}
    </div>
  );
}
