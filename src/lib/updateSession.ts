import { NextResponse } from "next/server";
import { encrypt } from "./jwt";

export default async function updateSession(sessionObj: any) {
  sessionObj.expires = new Date(Date.now() + 60 * 1000 * 15);

  const res = NextResponse.next();
  res.cookies.set({
    name: "Auth_Session",
    value: await encrypt(sessionObj),
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000 * 15),
  });

  return res;
}
