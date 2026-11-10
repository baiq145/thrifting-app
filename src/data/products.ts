import type {
  ProductCategory,
  ThriftProduct,
} from "@/types/product";

/* =========================================================
   KATEGORI PRODUK
========================================================= */

export const categories: Array<"Semua" | ProductCategory> = [
  "Semua",
  "Atasan",
  "Outer",
  "Celana",
  "Aksesori",
];

/* =========================================================
   DATA LOKAL / FALLBACK
========================================================= */

export const fallbackProducts: ThriftProduct[] = [
  {
    id: "TH001",
    name: "Kemeja Linen Cream",
    category: "Atasan",
    price: 75000,
    condition: "Sangat baik",
    size: "M",
    color: "Cream",
    description:
      "Kemeja linen bekas dengan kondisi sangat baik. Cocok untuk tampilan casual dan rapi.",
    emoji: "👔",
    isAvailable: true,
  },

  {
    id: "TH002",
    name: "Jaket Denim Classic",
    category: "Outer",
    price: 120000,
    condition: "Baik",
    size: "L",
    color: "Biru",
    description:
      "Jaket denim klasik dengan bahan yang masih nyaman digunakan untuk aktivitas sehari-hari.",
    emoji: "🧥",
    isAvailable: true,
  },

  {
    id: "TH003",
    name: "Celana Cargo Olive",
    category: "Celana",
    price: 95000,
    condition: "Sangat baik",
    size: "L",
    color: "Olive",
    description:
      "Celana cargo warna olive dengan banyak kantong dan kondisi masih sangat baik.",
    emoji: "👖",
    isAvailable: true,
  },

  {
    id: "TH004",
    name: "Sweater Vintage Maroon",
    category: "Atasan",
    price: 85000,
    condition: "Vintage",
    size: "M",
    color: "Maroon",
    description:
      "Sweater vintage dengan warna maroon yang cocok untuk gaya santai.",
    emoji: "🧶",
    isAvailable: true,
  },

  {
    id: "TH005",
    name: "Cardigan Knit Sand",
    category: "Outer",
    price: 90000,
    condition: "Sangat baik",
    size: "M",
    color: "Sand",
    description:
      "Cardigan rajut warna sand dengan model sederhana dan mudah dipadukan.",
    emoji: "🧥",
    isAvailable: true,
  },

  {
    id: "TH006",
    name: "Tote Bag Canvas",
    category: "Aksesori",
    price: 55000,
    condition: "Baik",
    size: "All Size",
    color: "Cream",
    description:
      "Tote bag canvas sederhana yang cocok digunakan untuk kegiatan sehari-hari.",
    emoji: "👜",
    isAvailable: true,
  },

  {
    id: "TH007",
    name: "Kaos Oversize Hitam",
    category: "Atasan",
    price: 65000,
    condition: "Sangat baik",
    size: "XL",
    color: "Hitam",
    description:
      "Kaos oversize warna hitam dengan bahan nyaman untuk gaya casual.",
    emoji: "👕",
    isAvailable: true,
  },

  {
    id: "TH008",
    name: "Hoodie Basic Cream",
    category: "Outer",
    price: 110000,
    condition: "Baik",
    size: "L",
    color: "Cream",
    description:
      "Hoodie basic warna cream dengan kondisi baik dan nyaman dipakai.",
    emoji: "🥼",
    isAvailable: true,
  },

  {
    id: "TH009",
    name: "Jeans Straight Blue",
    category: "Celana",
    price: 100000,
    condition: "Baik",
    size: "M",
    color: "Biru",
    description:
      "Celana jeans model straight dengan warna biru klasik.",
    emoji: "👖",
    isAvailable: true,
  },

  {
    id: "TH010",
    name: "Topi Baseball Navy",
    category: "Aksesori",
    price: 45000,
    condition: "Sangat baik",
    size: "All Size",
    color: "Navy",
    description:
      "Topi baseball warna navy dengan kondisi sangat baik.",
    emoji: "🧢",
    isAvailable: true,
  },
];

/* =========================================================
   FORMAT HARGA
========================================================= */

export function formatRupiah(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

/* =========================================================
   CARI PRODUK BERDASARKAN ID
========================================================= */

export function findProductById(
  id: string
): ThriftProduct | undefined {
  return fallbackProducts.find(
    (product) => product.id === id
  );
}

/* =========================================================
   MAPPING DATA DARI API
========================================================= */

export function mapApiProductToThrift(product: {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail?: string;
}): ThriftProduct | null {
  let mappedCategory: ProductCategory | null = null;

  switch (product.category) {
    /* =========================
       ATASAN
    ========================= */

    case "mens-shirts":
    case "womens-dresses":
    case "tops":
    case "shirts":
      mappedCategory = "Atasan";
      break;

    /* =========================
       OUTER
    ========================= */

    case "jackets":
      mappedCategory = "Outer";
      break;

    /* =========================
       CELANA
    ========================= */

    case "mens-pants":
    case "womens-pants":
    case "jeans":
    case "trousers":
      mappedCategory = "Celana";
      break;

    /* =========================
       AKSESORI
    ========================= */

    case "mens-shoes":
    case "womens-shoes":
    case "womens-bags":
    case "womens-jewellery":
    case "mens-watches":
    case "sunglasses":
      mappedCategory = "Aksesori";
      break;

    /* =========================
       DATA YANG TIDAK BERHUBUNGAN
       DENGAN FASHION
    ========================= */

    default:
      mappedCategory = null;
  }

  /* Kalau kategori API tidak sesuai,
     jangan masukkan produk tersebut */

  if (mappedCategory === null) {
    return null;
  }

  return {
    id: `API-${product.id}`,
    name: product.title,
    category: mappedCategory,
    price: product.price * 16000,
    condition: "Baik",
    size: "M",
    color: "Beragam",
    description: product.description,
    emoji: "👕",
    isAvailable: true,
    image: product.thumbnail,
  };
}