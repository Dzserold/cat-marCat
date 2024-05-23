"use server";
import Orders from "@/app/dashboard/orders/Orders";
import prisma from "./db";

export async function getUsers() {
  const res = await prisma.user.findMany({
    orderBy: { id: "asc" },
    include: {
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });
  return res;
}
