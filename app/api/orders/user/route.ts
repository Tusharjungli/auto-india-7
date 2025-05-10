import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import {  NextResponse } from "next/server";
import { Session } from "next-auth";

export async function GET() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: true, // include order items
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("❌ Failed to fetch user orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
