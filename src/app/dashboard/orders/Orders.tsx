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

export default function Orders({ orders }: { orders: Order[] }) {
  return (
    <div className="flex flex-col w-10/12 gap-2 ">
      <div className="flex justify-between gap-2 px-2 py-1 my-2 bg-gray-300 rounded-md">
        <p className="font-bold text-blue-600">id</p>
        <p className="font-bold text-violet-600">UserId</p>
        <p className="font-bold text-lime-600">createdAt</p>
      </div>
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex justify-between gap-2 px-2 py-1 bg-orange-300 rounded-md"
        >
          <h3 className="font-bold text-blue-600">
            # {order.id}
          </h3>
          <p className="font-bold text-violet-600">
            {order.userId}
          </p>
          <p className="font-bold text-lime-600">
            {order.createdAt.toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
