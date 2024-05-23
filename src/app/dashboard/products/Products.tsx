"use client";
import { saveImg } from "@/lib/img";
import { addNewProduct, updateProduct } from "@/lib/products";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

interface Products {
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

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const FormSchema = z.object({
  published: z.enum(["Published", "Unpublished"]),
  name: z
    .string()
    .min(3, { message: "Title is required" })
    .max(30, "Too long name"),
  description: z.string(),
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
  img: z
    .custom<FileList>()
    .transform((file) => file.length > 0 && file.item(0))
    .refine(
      (file) =>
        !file || (!!file && file.size <= 4 * 1024 * 1024),
      {
        message:
          "The profile picture must be a maximum of 10MB.",
      }
    )
    .refine(
      (file) =>
        !file || (!!file && file.type?.startsWith("image")),
      {
        message: "Only images are allowed to be sent.",
      }
    )
    .refine(
      (file) =>
        !file ||
        (!!file && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: "Only image formats are allowed",
      }
    ),
});

type InputType = z.infer<typeof FormSchema>;

export default function Products(products: {
  products: Products[];
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Products | null>();
  const [img, setImg] = useState<File | undefined>(undefined);

  const productsArray = products.products;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveData: SubmitHandler<InputType> = async (data) => {
    const ID = selectedProduct?.id || 0;
    const isPublished =
      data.published === "Published" ? true : false;

    if (!isNew) {
      saveImg(data.img);
      return;
      const res = await updateProduct({
        id: ID,
        name: data.name,
        description: data.description || " ",
        price: data.price,
        stock: data.stock,
        discount: data.discount,
        published: isPublished,
      });
      if (res.status === 200) {
        window.location.reload();
      }
    } else {
      const res = await addNewProduct({
        id: ID,
        name: data.name,
        description: data.description || "JELO",
        price: data.price,
        stock: data.stock,
        discount: data.discount,
        published: isPublished,
      });
      if (res.status === 200) {
        window.location.reload();
      }
    }
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImg(file);
  };

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={() => {
          reset();
          setSelectedProduct(null);
          setIsEdit(true);
          setIsNew(true);
          setImg(undefined);
        }}
        className="self-center px-3 py-2 mb-4 font-semibold bg-green-300 border-4 rounded-lg hover:scale-105 border-rose-950"
      >
        ADD NEW PRODUCT <span className="text-lg">+</span>
      </button>

      {/* If ADMIN clicks edit it will show a box where he can edit the product */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
        {" "}
        {isEdit && (
          <div className="fixed top-0 left-0 w-screen h-screen z-1 ">
            <div
              onClick={() => {
                setIsEdit(false);
              }}
              className="fixed top-0 left-0 w-screen h-screen z-2 bg-slate-800 bg-opacity-80"
            ></div>

            <div className="overflow-y-scroll flex flex-col gap-2 rounded-lg px-3 py-4 fixed transform -translate-x-1/2 -translate-y-1/2 opacity-100 w-[500px] z-3 bg-slate-500 h-96 top-1/2 left-1/2">
              <div className="flex justify-between">
                <h3 className="font-semibold">
                  # {selectedProduct?.id || "??"}
                </h3>

                <button
                  onClick={() => {
                    setIsEdit(false);
                  }}
                  className="px-2 mt-0.5 bg-red-300 border-2 rounded-md hover:scale-105 border-rose-950"
                  type="button"
                >
                  Close{" "}
                  <span className="text-lg font-black">X</span>
                </button>
              </div>

              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(saveData)}
                className="flex flex-col gap-1"
              >
                <select
                  {...register("published")}
                  defaultValue={
                    selectedProduct?.published
                      ? "Published"
                      : "Unpublished"
                  }
                  className={`${
                    selectedProduct?.published
                      ? "bg-green-300"
                      : "bg-red-300"
                  } self-center w-1/3 text-center border-2 rounded-md outline-none border-rose-950`}
                >
                  <option
                    className="bg-green-300"
                    value="Published"
                  >
                    Published
                  </option>
                  <option
                    className="bg-red-300"
                    value="Unpublished"
                  >
                    Unpublished
                  </option>
                </select>

                {/* Show error messages */}
                {errors && (
                  <p className="text-lg text-center text-red-400">
                    {errors.name?.message ||
                      errors.description?.message ||
                      errors.price?.message ||
                      errors.stock?.message ||
                      errors.discount?.message ||
                      errors.root?.message ||
                      errors.img?.message}
                  </p>
                )}

                <label htmlFor="">Name</label>
                <input
                  defaultValue={selectedProduct?.name}
                  {...register("name")}
                  className="border-2 rounded-md outline-none focus:border-red-700 border-rose-950"
                  type="text"
                />
                <label htmlFor="">Description</label>
                <textarea
                  defaultValue={
                    selectedProduct?.description || ""
                  }
                  {...register("description")}
                  className="border-2 rounded-md outline-none border-rose-950 focus:border-red-700"
                  typeof="text"
                ></textarea>

                <div className="flex flex-1 w-full gap-3 ">
                  <div className="flex flex-col ">
                    <label htmlFor="">Price $</label>
                    <input
                      defaultValue={selectedProduct?.price}
                      {...register("price", {
                        valueAsNumber: true,
                      })}
                      className="w-full border-2 rounded-md outline-none focus:border-red-700 border-rose-950"
                      type="number"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Stock</label>
                    <input
                      defaultValue={selectedProduct?.stock}
                      {...register("stock", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-full border-2 rounded-md outline-none focus:border-red-700 border-rose-950"
                    />
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="">Discount %</label>
                    <input
                      defaultValue={selectedProduct?.discount}
                      {...register("discount", {
                        valueAsNumber: true,
                      })}
                      type="number"
                      className="w-full border-2 rounded-md outline-none focus:border-red-700 border-rose-950"
                    />
                  </div>
                  <p>
                    Final Price:{" "}
                    <span className="font-bold text-green-900">
                      {selectedProduct?.actualPrice}
                    </span>
                    $
                  </p>
                </div>
                <button
                  className="self-center w-1/2 mt-2 bg-green-400 border-2 rounded-md border-rose-950 hover:scale-105"
                  type="submit"
                >
                  Save
                </button>
              </form>
              {selectedProduct?.id && (
                <form className="flex flex-col gap-1" action="">
                  <label htmlFor="">Image </label>
                  <input
                    accept="image/png, image/jpeg, image/webp"
                    placeholder="Image URL Path"
                    className="text-white bg-stone-600 text-center border-2 rounded-md outline-none focus:border-red-700 border-rose-950"
                    type="file"
                    onChange={handleImg}
                  />
                  {img && (
                    <img
                      src={URL.createObjectURL(img)}
                      alt="img"
                      className="w-2/3 h-[130px] self-center rounded-md object-cover"
                    />
                  )}
                  {img && (
                    <button className="self-center w-1/2 mt-2 bg-green-400 border-2 rounded-md border-rose-950 hover:scale-105">
                      Upload File
                    </button>
                  )}
                </form>
              )}
            </div>
          </div>
        )}
        {/* Show all products */}
        {productsArray &&
          productsArray.map((product) => (
            <article
              key={product.id}
              className="px-3 text-center bg-orange-200 border-2 rounded-md border-rose-950"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold"># {product.id}</h3>
                {product.published ? (
                  <h3 className="text-green-500">Published</h3>
                ) : (
                  <h3 className="text-red-500">Unpublished</h3>
                )}

                <button
                  onClick={() => {
                    reset();
                    setIsEdit(true);
                    setIsNew(false);
                    setSelectedProduct(product);
                    setImg(undefined);
                  }}
                  className="px-2 mt-0.5 bg-green-300 border-2 rounded-md hover:scale-105 border-rose-950"
                  type="button"
                >
                  Edit
                </button>
              </div>
              <h3 className=" py-0.5 text-lg font-bold border-2 rounded-md border-rose-900">
                {product.name}
              </h3>
              <p className="border-b-2 border-rose-900">
                {product.description}
              </p>
              <p>
                On Store:{" "}
                <span className="font-semibold">
                  {product.stock}
                </span>{" "}
                pcs
              </p>
              <div className="flex justify-around">
                <p>
                  Price:{" "}
                  <span className="font-semibold">
                    {product.price}
                  </span>{" "}
                  $
                </p>
                <p>
                  Deal:{" "}
                  <span className="font-semibold">
                    {product.discount}
                  </span>{" "}
                  %
                </p>
                <p>
                  Final:{" "}
                  <span className="font-semibold">
                    {product.actualPrice}
                  </span>{" "}
                  $
                </p>
              </div>
              <div className="border-t-2 border-rose-900">
                <p>
                  Created at: {product.createdAt.toDateString()}
                </p>
                <p>
                  Updated at: {product.updatedAt.toDateString()}
                </p>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}
