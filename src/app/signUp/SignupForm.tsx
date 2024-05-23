"use client";
import signUp from "@/lib/signUp";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Validation for Form
const FormSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name is required" })
      .max(30, "Too long name")
      .regex(
        new RegExp("^[a-zA-Z0-9.@_-]+$"),
        "This username is not valid"
      ),
    email: z
      .string()
      .email({ message: "Please enter a valid email" }),
    password: z.string().min(4, {
      message: "Password must be at least 4 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match",
    path: ["confirmPassword"],
  });

// Make a type from zod schema
type formType = z.infer<typeof FormSchema>;

export default function SignupForm() {
  const router = useRouter();
  const [servErr, setServErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formType>({
    resolver: zodResolver(FormSchema),
  });

  const submitForm: SubmitHandler<formType> = async (data) => {
    try {
      const res = await signUp(data);
      if (res.status === 200) {
        router.push("/login");
      } else {
        setServErr(res.message);
      }
    } catch (error) {
      setServErr("Something went wrong");
    }
  };

  return (
    <div className="text-center">
      <h1 className="py-4 text-3xl font-semibold">REGISTER</h1>
      <p className="text-red-500  min-h-7">{servErr}</p>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center justify-center font-bold text-slate-600"
      >
        <div className="">
          <input
            placeholder="NAME"
            {...register("name")}
            className="w-72 p-1.5 border-[3px] border-solid rounded-md outline-none focus:border-rose-950 border-slate-400"
            type="text"
          />
          <p className="text-sm text-red-500 min-h-6">
            {errors.name && errors.name.message}
          </p>
        </div>

        <div>
          <input
            placeholder="EMAIL"
            {...register("email")}
            className="w-72 p-1.5 border-[3px] border-solid rounded-md outline-none focus:border-rose-950 border-slate-400"
            type="email"
          />
          <p className="text-sm text-red-500 min-h-6">
            {errors.email && errors.email.message}
          </p>
        </div>

        <div>
          <input
            placeholder="PASSWORD"
            {...register("password")}
            className="w-72 p-1.5 border-[3px] border-solid rounded-md outline-none focus:border-rose-950 border-slate-400"
            type="password"
          />
          <p className="text-sm text-red-500 min-h-6">
            {errors.password && errors.password.message}
          </p>
        </div>

        <div>
          <input
            placeholder="CONFIRM PASSWORD"
            {...register("confirmPassword")}
            className="w-72 p-1.5 border-[3px] border-solid rounded-md outline-none focus:border-rose-950 border-slate-400"
            type="password"
          />
          <p className="text-sm text-red-500 min-h-6">
            {errors.confirmPassword &&
              errors.confirmPassword.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-72 hover:scale-105 text-rose-950 p-1 bg-green-300 rounded-md border-[3px] border-rose-950"
        >
          Submit
        </button>
        <p className="text-sm text-red-500 min-h-6"></p>
      </form>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p>Already have an account? </p>
        <Link
          className="text-lg font-semibold text-green-700 hover:scale-105"
          href={"/login"}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
