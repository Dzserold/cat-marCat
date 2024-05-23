"use server";
import { z } from "zod";
import prisma from "./db";
import bcrypt from "bcrypt";

const FormSchema = z.object({
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
    .email({ message: "Please provide a valid email" }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters",
  }),
  confirmPassword: z.string(),
});

// Make a type from zod schema
type formType = z.infer<typeof FormSchema>;
export default async function signUp(data: formType) {
  // Validate the data
  const isValid = FormSchema.safeParse(data);
  if (!isValid.success)
    return {
      status: 400,
      message: "Invalid credentials",
    };

  try {
    // Check if user is already registered
    const isEmailExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const isUserExist = await prisma.user.findFirst({
      where: {
        name: data.name,
      },
    });

    if (isUserExist || isEmailExist)
      return {
        status: 400,
        message: "This user is already exist.",
      };

    // Register user with hashed password
    const hashedPass = await bcrypt.hashSync(data.password, 13);
    const response = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPass,
      },
    });

    return {
      status: 200,
      message: "User created successfully",
    };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }
}
