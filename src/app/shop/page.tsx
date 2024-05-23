import { getPublishedProducts } from "@/lib/products";
import Shop from "./Shop";

export default async function page() {
  const products = await getPublishedProducts();
  return <Shop products={products} />;
}
