import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.student.findMany();
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { fullname, email, password } = body;

  const hashedPassword = await bcrypt.hash(password,10);

  const user = await prisma.student.create({
    data: { fullname, email, password: hashedPassword },
  });

  return NextResponse.json(user, { status: 201 });
}

