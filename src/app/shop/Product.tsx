import { addToCart } from "@/lib/cart";

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
  sessionId: number | null;
}

export default function Product(product: Product) {
  const id = product.sessionId || null;

  return (
    <div className="border-[3px] border-rose-900 flex flex-col justify-between text-center bg-pink-500 rounded-md text-green-950 text-">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      {product.discount > 0 && (
        <div className="text-red-800 ">
          <p className="line-through">
            {" "}
            Original Price: ${product.price}
          </p>
          <p>Discount: {product.discount} %</p>
        </div>
      )}
      <p className="text-lg">Price: ${product.actualPrice}</p>
      {id && (
        <form
          action={async (formData) => {
            "use server";
            // Set product data to session
            const quantity = Number(formData.get("quantity"));
            await addToCart({
              userId: id,
              productId: product.id,
              quantity,
            });
          }}
          className="flex self-end gap-2 p-1 text-white"
        >
          <input
            name="quantity"
            defaultValue={1}
            min={1}
            max={product.stock}
            type="number"
            className="w-10 text-center bg-pink-600 rounded-md"
          />
          <button
            type="submit"
            className="px-2 bg-pink-700 rounded-md py-0.5 hover:scale-105"
          >
            Add To Cart
          </button>
        </form>
      )}
    </div>
  );
}
