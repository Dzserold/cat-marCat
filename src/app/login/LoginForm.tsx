"use client";
import login from "@/lib/logIn";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

// Validation for Form
const FormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
  stayLoggedIn: z.boolean(),
});

// Make a type from zod schema
type formType = z.infer<typeof FormSchema>;

export default function LoginForm() {
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
      const res = await login(data);
      if (res.status === 200) {
        router.refresh();
      } else {
        setServErr(res.message);
      }
    } catch (error) {
      setServErr("Something went wrong");
    }
  };

  return (
    <div className="text-center">
      <h1 className="py-4 text-3xl font-semibold">LOG IN</h1>
      <p className="text-red-500  min-h-7">{servErr}</p>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col items-center justify-center font-bold text-slate-600"
      >
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

        <div className="flex gap-1 ">
          <input
            className="w-5"
            type="checkbox"
            {...register("stayLoggedIn")}
          />
          <p>Keep me signed in</p>
        </div>

        <button
          type="submit"
          className="w-72 mt-4 hover:scale-105 text-rose-950 p-1 bg-green-300 rounded-md border-[3px] border-rose-950"
        >
          Submit
        </button>
        <p className="text-sm text-red-500 min-h-6"></p>
      </form>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p>Do not have an account? </p>
        <Link
          className="text-lg font-semibold text-green-700 hover:scale-105"
          href={"/signUp"}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
