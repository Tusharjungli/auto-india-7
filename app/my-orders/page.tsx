import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";


export default async function MyOrdersPage() {
  const session: Session | null = await getServerSession(authOptions);


  if (!session?.user) {
    return (
      <main className="p-6 text-red-600">
        <p>Please log in to view your orders.</p>
      </main>
    );
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="p-6 max-w-5xl mx-auto text-black dark:text-white">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="border border-gray-300 dark:border-gray-700 rounded-lg p-4">
              <p className="text-sm text-gray-500">Order ID: {order.id}</p>
              <p className="font-semibold">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Deliver to: {order.name}, {order.address}, {order.city}, {order.state} - {order.pincode}</p>
              <p className="mt-2 font-bold">Total: ₹ {order.total.toLocaleString()}</p>

              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between border-b border-gray-600 pb-1 text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹ {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
