import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Session } from "next-auth";
import { Product } from "@/types/product";

export async function POST(req: NextRequest) {
  const session: Session | null = await getServerSession(authOptions);
  const body = await req.json();

  const {
    name,
    email,
    phone,
    address,
    pincode,
    city,
    state,
    items,
    total,
  }: {
    name: string;
    email: string;
    phone: string;
    address: string;
    pincode: string;
    city: string;
    state: string;
    items: (Product & { quantity: number })[];
    total: number;
  } = body;

  try {
    const order = await prisma.order.create({
      data: {
        userId: session?.user?.id || null,
        name,
        email,
        phone,
        address,
        pincode,
        city,
        state,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            imageUrl: item.imageUrl,
          })),
        },
      },
    });

    return NextResponse.json({ success: true, order });
  } catch (err) {
    console.error("❌ Order creation failed:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
