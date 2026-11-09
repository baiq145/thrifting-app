export type ProductCategory =
  | "Atasan"
  | "Outer"
  | "Celana"
  | "Aksesori";

export interface ThriftProduct {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  condition: "Sangat baik" | "Baik" | "Vintage";
  size: string;
  color: string;
  description: string;
  emoji: string;
  isAvailable: boolean;
  image?: string;
}

/**
 * Interface untuk satu produk
 * yang berasal dari External API DummyJSON.
 */
export interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string;
  images?: string[];
}

/**
 * Interface untuk response
 * dari External API DummyJSON.
 */
export interface DummyJsonProductsResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}