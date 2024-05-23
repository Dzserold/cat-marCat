import { getProducts } from "@/lib/products";
import Products from "./Products";

export default async function page() {
  const products = await getProducts();

  return <Products products={products} />;
}
