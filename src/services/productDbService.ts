import { supabase } from "@/services/supabase";
import type { ThriftProduct } from "@/types/product";

export async function getProductsFromSupabase(): Promise<ThriftProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    price: Number(product.price),
    condition: product.condition,
    size: product.size,
    color: product.color,
    description: product.description,
    emoji: product.emoji,
    isAvailable: product.is_available,
    image: product.image ?? undefined,
  }));
}

export async function insertProduct(
  product: Omit<ThriftProduct, "id">
): Promise<ThriftProduct> {
  const { data, error } = await supabase
    .from("products")
    .insert({
      name: product.name,
      category: product.category,
      price: product.price,
      condition: product.condition,
      size: product.size,
      color: product.color,
      description: product.description,
      emoji: product.emoji,
      is_available: product.isAvailable,
      image: product.image ?? null,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return {
    id: data.id,
    name: data.name,
    category: data.category,
    price: Number(data.price),
    condition: data.condition,
    size: data.size,
    color: data.color,
    description: data.description,
    emoji: data.emoji,
    isAvailable: data.is_available,
    image: data.image ?? undefined,
  };
}
