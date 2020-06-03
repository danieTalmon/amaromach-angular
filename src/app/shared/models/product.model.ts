export interface Product {
  name: string;
  description: string;
  price: number;
  limit?: number;
}

export interface ProductListState {
  productList: Product[];
  selectedProduct: Product | null;
}
