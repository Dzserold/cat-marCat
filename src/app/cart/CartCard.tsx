import { deleteProduct, setQuantity } from "@/lib/cart";
interface CartItem {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string | null;
  stock: number;
  quantity: number;
  price: number;
  discount: number;
  actualPrice: number;
  published: boolean;
}

export default async function CartCard(data: CartItem) {
  return (
    <div className="flex justify-between p-3 bg-green-200 border-4 rounded-xl border-emerald-900">
      <article className="flex flex-col justify-between text-left ">
        <p className="text-lg font-bold">{data.name}</p>
        {data.discount > 0 && (
          <div>
            <p className="line-through text-red-950">
              Original Price:{" "}
              <span className="font-bold">{data.price}</span> $
            </p>
            <p className="text-blue-900">
              Discount:{" "}
              <span className="font-bold">{data.discount}</span>{" "}
              %
            </p>
          </div>
        )}
        <p className="text-lg text-green-800">
          Price:{" "}
          <span className="font-bold">{data.actualPrice}</span> $
        </p>
      </article>

      <div className="flex flex-col items-end justify-around">
        <form
          className="flex gap-2 p-1 text-white"
          action={async (formData) => {
            "use server";
            // Set product data to session
            const quantity = Number(formData.get("quantity"));
            await setQuantity(data.id, quantity);
          }}
        >
          <input
            name="quantity"
            defaultValue={data.quantity}
            min={1}
            max={data?.stock || data.quantity}
            type="number"
            className="w-10 text-center bg-pink-600 rounded-md"
          />
          <button
            type="submit"
            className="px-2 bg-pink-700 rounded-md py-0.5 hover:scale-105"
          >
            Set Quantity
          </button>
        </form>
        <form
          className="flex self-end gap-2 p-1 text-white"
          action={async () => {
            "use server";
            await deleteProduct(data.id);
          }}
        >
          <button
            type="submit"
            className="px-2 bg-pink-900 rounded-md py-0.5 hover:scale-105"
          >
            Delete <span className="font-black ">X</span>
          </button>
        </form>
        <p className="text-xl text-red-950">
          Total Price:{" "}
          <span className="font-bold">
            {data.actualPrice * data.quantity}
          </span>{" "}
          $
        </p>
      </div>
    </div>
  );
}
