interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _count: {
    orders: number;
  };
  role: "ADMIN" | "USER";
}

export default function Users(users: { users: User[] }) {
  const usersArray = users.users;

  return (
    <div className="flex flex-col w-10/12 gap-2 ">
      <div className="flex justify-between gap-2 px-2 py-1 my-2 bg-gray-300 rounded-md">
        <p className="font-bold text-blue-600">id</p>
        <p className="font-bold text-violet-600">Name</p>{" "}
        <p className="font-bold text-fuchsia-500">email</p>{" "}
        <p className="font-bold text-amber-600">role</p>{" "}
        <p className="font-bold text-sky-500">Total Orders</p>{" "}
        <p className="font-bold text-lime-600">createdAt</p>{" "}
        <p className="font-bold text-teal-600">updatedAt</p>
      </div>
      {usersArray.map((user) => (
        <div
          key={user.id}
          className="flex justify-between gap-2 px-2 py-1 bg-orange-300 rounded-md"
        >
          <h3 className="font-bold text-blue-600">
            # {user.id}
          </h3>
          <p className="font-bold text-violet-600">
            {user.name}
          </p>
          <p className="font-bold text-fuchsia-500">
            {user.email}
          </p>

          <p className="font-bold text-amber-600">{user.role}</p>
          <p className="font-bold text-sky-500">
            {user._count.orders}
          </p>
          <p className="font-bold text-lime-600">
            {user.createdAt.toDateString()}
          </p>
          <p className="font-bold text-teal-600">
            {user.updatedAt.toDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}
