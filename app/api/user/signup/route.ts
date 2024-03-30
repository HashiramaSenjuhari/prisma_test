import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("lhcvlzjk");

export async function POST(request: NextResponse) {
  const req = await request.json();
  const { username, email, password } = req;
  const existingUser = await prisma.user.findFirst({
    select: {
      email: true,
    },
    where: {
      username: username,
    },
  });
  if (existingUser) {
    return console.log("user aldready exist");
  }
  const salt = await bcryptjs.genSalt(10);
  const hash = await bcryptjs.hash(password, salt);
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password: hash,
    },
  });
  console.log(user);
}
