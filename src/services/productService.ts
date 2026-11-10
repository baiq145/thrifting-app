import {
  fallbackProducts,
  mapApiProductToThrift,
} from "@/data/products";

import { requestProducts } from "@/services/api";

import type { ThriftProduct } from "@/types/product";

type ApiProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string;
};

type ApiProductResponse = {
  products: ApiProduct[];
};

/* =========================================================
   MENGAMBIL DATA PRODUCTS DARI RESPONSE API
========================================================= */

function extractProducts(response: unknown): ApiProduct[] {
  if (!response || typeof response !== "object") {
    return [];
  }

  const data = response as {
    products?: unknown;
    data?: unknown;
  };

  // Bentuk 1:
  // response.products
  if (Array.isArray(data.products)) {
    return data.products as ApiProduct[];
  }

  // Bentuk 2:
  // response.data.products
  if (
    data.data &&
    typeof data.data === "object"
  ) {
    const nestedData = data.data as {
      products?: unknown;
    };

    if (Array.isArray(nestedData.products)) {
      return nestedData.products as ApiProduct[];
    }
  }

  return [];
}

/* =========================================================
   ASYNC / AWAIT
========================================================= */

export async function getThriftProducts(): Promise<ThriftProduct[]> {
  try {
    const response = await requestProducts();

    const apiProducts = extractProducts(response);

    if (apiProducts.length === 0) {
      console.log(
        "Data API tidak valid. Menggunakan data lokal."
      );

      return [...fallbackProducts];
    }

    const mappedProducts: ThriftProduct[] = [];

    apiProducts.forEach((product: ApiProduct) => {
      const thriftProduct =
        mapApiProductToThrift(product);

      if (thriftProduct !== null) {
        mappedProducts.push(thriftProduct);
      }
    });

    if (mappedProducts.length === 0) {
      console.log(
        "Tidak ada produk fashion dari API. Menggunakan data lokal."
      );

      return [...fallbackProducts];
    }

    return mappedProducts;
  } catch (error) {
    console.error(
      "External API gagal:",
      error
    );

    return [...fallbackProducts];
  }
}

/* =========================================================
   PROMISE + THEN + CATCH
========================================================= */

export function getThriftProductsWithThen(): Promise<ThriftProduct[]> {
  return requestProducts()
    .then((response: unknown) => {
      const apiProducts =
        extractProducts(response);

      if (apiProducts.length === 0) {
        return [...fallbackProducts];
      }

      const mappedProducts: ThriftProduct[] = [];

      apiProducts.forEach((product: ApiProduct) => {
        const thriftProduct =
          mapApiProductToThrift(product);

        if (thriftProduct !== null) {
          mappedProducts.push(thriftProduct);
        }
      });

      if (mappedProducts.length === 0) {
        return [...fallbackProducts];
      }

      return mappedProducts;
    })
    .catch((error) => {
      console.error(
        "External API gagal:",
        error
      );

      return [...fallbackProducts];
    });
}