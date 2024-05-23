"use server";
import { z } from "zod";
import prisma from "./db";

export async function getProducts() {
  const res = await prisma.product.findMany({
    orderBy: { id: "asc" },
  });
  return res;
}

export async function getPublishedProducts() {
  const res = await prisma.product.findMany({
    where: { published: true, stock: { gt: 0 } },
    orderBy: { id: "asc" },
  });
  return res;
}

interface Products {
  id: number;
  name: string;
  description: string | null;
  stock: number;
  price: number;
  discount: number;
  published: boolean;
  imgUrl?: string;
}

const FormSchema = z.object({
  published: z.boolean(),
  name: z
    .string()
    .min(3, { message: "Title is required" })
    .max(30, "Too long name"),
  description: z.string().optional(),
  price: z
    .number({
      invalid_type_error: "Enter a valid price",
    })
    .min(1, { message: "Price is required" }),
  stock: z
    .number({
      invalid_type_error: "Enter a valid stock value",
    })
    .min(0, { message: "Stock is required" }),
  discount: z
    .number({
      invalid_type_error:
        "Discount is required, must be at least 0 value",
    })
    .min(0, { message: "Discount is required" })
    .max(100, { message: "Discount is not valid" }),
});

export async function updateProduct(data: Products) {
  const isValid = FormSchema.safeParse(data);
  if (!isValid.success || data.id === 0) {
    return { status: 400, message: "Invalid data" };
  }

  try {
    const res = await prisma.product.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        discount: data.discount,
        published: data.published,
        actualPrice:
          data.price - (data.price * data.discount) / 100,
      },
    });

    if (data.imgUrl) {
      const img = await prisma.imageURL.create({
        data: {
          url: data.imgUrl,
          description: data.description || " ",
          product: {
            connect: {
              id: data.id,
            },
          },
        },
      });
    }

    return {
      status: 200,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
}

export async function addNewProduct(data: Products) {
  const isValid = FormSchema.safeParse(data);
  if (!isValid.success) {
    return {
      status: 400,
      message: "Invalid data",
    };
  }

  try {
    const res = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        discount: data.discount,
        published: data.published,
        actualPrice:
          data.price - (data.price * data.discount) / 100,
      },
    });
    return {
      status: 200,
      message: "Product created successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
}

export async function getProductById(id: number) {
  const res = await prisma.product.findUnique({
    where: { id },
  });
  return res;
}
