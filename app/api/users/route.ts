import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, username, password } = body;

  const hashedPassword = await bcrypt.hash(password,10);

  const user = await prisma.user.create({
    data: { name, email, username, password: hashedPassword },
  });

  return NextResponse.json(user, { status: 201 });
}

