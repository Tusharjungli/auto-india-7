import { Product } from "@/types/product";

export const dummyProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
  id: `prod-${i + 1}`,
  name: `Premium Car Part ${i + 1}`,
  description: `Top-quality car spare part designed for maximum performance. Item #${i + 1}`,
  price: Math.floor(Math.random() * 9000) + 1000,
  imageUrl: `https://picsum.photos/seed/${i + 1}/400/300`, // Placeholder images
  stock: Math.floor(Math.random() * 50) + 1,
}));
