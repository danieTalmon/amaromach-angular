import { Product } from './../../shared/models/product.model';

export const mockProduct: Product = {
  name: 'test1',
  description: 'test1 description',
  price: 40,
  limit: 5,
};

export const productsMock: Product[] = [
  { name: 'test1', description: 'test1 description', price: 120, limit: 20 },
  { name: 'test2', description: 'test2 description', price: 150, limit: 5 },
  { name: 'test3', description: 'test3 description', price: 190 },
  { name: 'test4', description: 'test4 description', price: 220, limit: 29 },
  { name: 'test5', description: 'test5 description', price: 1120, limit: 45 },
  { name: 'test6', description: 'test6 description', price: 1728, limit: 10 },
];
