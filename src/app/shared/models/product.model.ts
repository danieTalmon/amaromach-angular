export interface Product {
  name: string;
  description: string;
  price: number;
  limit?: number;
}

export type ProductListState = Product[];
