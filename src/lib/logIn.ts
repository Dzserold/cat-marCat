"use server";
import prisma from "./db";
import bcrypt from "bcrypt";
import { encrypt } from "./jwt";
import { cookies } from "next/headers";

export default async function login(data: {
  email: string;
  password: string;
  stayLoggedIn: boolean;
}) {
  //Check if the email correct
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user)
    return {
      status: 400,
      message: "Invalid credentials",
    };

  //Check if the password is correct
  const isPasswordMatch = await bcrypt.compareSync(
    data.password,
    user.password
  );

  if (!isPasswordMatch) {
    return {
      status: 400,
      message: "Invalid credentials",
    };
  }

  //Login user
  try {
    let expires;

    if (data.stayLoggedIn) {
      const currentTime = new Date();
      expires = currentTime.setDate(currentTime.getDate() + 14);
    } else {
      expires = new Date(Date.now() + 60 * 1000 * 15);
    }

    const session = await encrypt({
      id: user.id,
      name: user.name,
      email: user.email,
      isLoggedIn: true,
      role: user.role,
      stayLoggedIn: data.stayLoggedIn,
      expires: expires,
    });

    cookies().set("Auth_Session", session, {
      expires,
      httpOnly: true,
    });
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Something went wrong" };
  }

  return { status: 200, message: "Logged in successfully" };
}
