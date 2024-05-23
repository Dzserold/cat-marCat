import Image from "next/image";
import logo from "@/public/logo.svg";
import { getSession, logout } from "@/lib/jwt";
import { redirect } from "next/navigation";
import cartImg from "@/public/cart.svg";
import Link from "next/link";
import { getCart } from "@/lib/cart";

interface Session {
  id: number;
  name: string;
  email: string;
  isLoggedIn: boolean;
  stayLoggedIn: boolean;
  role: string;
}

interface CartItem {
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
}

interface Cart {
  id: number;
  expires: number;
  data: CartItem[];
}

export default async function Nav() {
  const session = await getSession();
  const cart = await getCart();

  return (
    <nav className="flex items-center justify-between border-b-4 rounded-xl border-rose-950">
      <a href="">
        <Image
          src={logo}
          priority={true}
          alt="logo"
          width={100}
          height={100}
        />
      </a>

      <ul className="flex text-center gap-0.5">
        <a
          className="hidden p-1 text-lg font-semibold bg-orange-300 border-[3px] border-solid rounded-md sm:inline border-rose-950 text-rose-950 hover:scale-105"
          href="/"
        >
          Home
        </a>
        {session &&
        session.isLoggedIn &&
        session.role === "ADMIN" ? (
          <a
            href="/dashboard"
            className="px-2 py-1 text-lg font-semibold bg-slate-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          >
            Dash
          </a>
        ) : null}
        <a
          href="/shop"
          className="px-2 py-1 text-lg font-semibold bg-orange-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
        >
          Shop
        </a>
        {session && session.isLoggedIn && session.name ? (
          <a
            href={`/profile/${session.id}`}
            className="p-1 text-lg font-semibold bg-green-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          >
            {session.name as Session["name"]}
          </a>
        ) : (
          <Link
            href="/login"
            className="p-1 text-lg font-semibold bg-orange-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          >
            LogIn
          </Link>
        )}

        {session && session.isLoggedIn && session.name ? (
          <div className="flex gap-1">
            <form
              action={async () => {
                "use server";
                await logout();
                redirect("/");
              }}
            >
              <button
                className="p-1 text-lg font-semibold bg-red-400 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
                type="submit"
              >
                LogOut
              </button>
            </form>
            <div className="relative">
              <Link
                href="/cart"
                className="flex relative py-1 px-2 text-lg font-semibold bg-orange-600 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
              >
                <Image
                  src={cartImg}
                  priority={true}
                  alt="cart"
                  width={28}
                  height={28}
                />
              </Link>
              {cart &&
                (cart as unknown as Cart).data.length > 0 && (
                  <div className="-top-3 -right-3 flex items-center justify-center bg-rose-950  w-8 h-8 text-red-300 rounded-full absolute">
                    <p>
                      {(cart as unknown as Cart).data.length}
                    </p>
                  </div>
                )}
            </div>
          </div>
        ) : (
          <Link
            href="/signUp"
            className="p-1 text-lg font-semibold bg-green-300 border-[3px] border-solid rounded-md border-rose-950 text-rose-950 hover:scale-105"
          >
            SignUp
          </Link>
        )}
      </ul>
    </nav>
  );
}
