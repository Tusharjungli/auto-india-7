import { prisma } from "../lib/prisma";

async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: Array.from({ length: 30 }).map((_, i) => ({
      name: `Genuine Car Part ${i + 1}`,
      description: `Engineered for performance. Part #${i + 1}`,
      price: Math.floor(Math.random() * 9000) + 1000,
      imageUrl: `https://picsum.photos/seed/p${i + 1}/400/300`,
      stock: Math.floor(Math.random() * 40) + 10,
    })),
  });
}

main()
  .then(() => console.log("✅ Seeded DB with products"))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
