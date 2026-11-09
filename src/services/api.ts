import type { DummyJsonProductsResponse } from "@/types/product";

const PRODUCTS_ENDPOINT =
  "https://dummyjson.com/products/category/mens-shirts?limit=10";

/**
 * Custom Promise wrapper
 * Menunjukkan penggunaan resolve() dan reject().
 */
export function requestProducts(): Promise<DummyJsonProductsResponse> {
  return new Promise<DummyJsonProductsResponse>((resolve, reject) => {
    fetch(PRODUCTS_ENDPOINT)
      .then(async (response) => {
        if (!response.ok) {
          reject(
            new Error(`HTTP Error ${response.status}`)
          );
          return;
        }

        const data =
          (await response.json()) as DummyJsonProductsResponse;

        resolve(data);
      })
      .catch((error: unknown) => {
        reject(
          error instanceof Error
            ? error
            : new Error("Gagal mengambil data API")
        );
      });
  });
}

/**
 * Custom async function menggunakan await.
 */
export async function fetchProducts(): Promise<DummyJsonProductsResponse> {
  const response = await requestProducts();

  return response;
}