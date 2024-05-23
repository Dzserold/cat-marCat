export default function DashNav() {
  return (
    <nav>
      <ul className="flex h-full gap-1">
        <a
          className="px-2 py-1 text-lg font-semibold bg-slate-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          href="/dashboard/"
        >
          Home
        </a>
        <a
          className="px-2 py-1 text-lg font-semibold bg-slate-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          href="/dashboard/products"
        >
          Poducts
        </a>
        <a
          className="px-2 py-1 text-lg font-semibold bg-slate-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          href="/dashboard/users"
        >
          Users
        </a>
        <a
          className="px-2 py-1 text-lg font-semibold bg-slate-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          href="/dashboard/orders"
        >
          Orders
        </a>
      </ul>
    </nav>
  );
}
