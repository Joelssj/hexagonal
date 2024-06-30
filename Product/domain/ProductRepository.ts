import { Product } from "./Product";

export interface ProductRepository {
  getAll(): Promise<Product[] | null>;
  getById(productId: string): Promise<Product | null>;
  createProduct(
    refresco: string,
    sabrita: string,
    galletas: string,
    dulces: string
  ): Promise<Product | null>;
 deleteProduct(productId: string): Promise<boolean>;
  updateProduct(
      productId: string,
      refresco?: string,
      sabrita?: string,
      galletas?: string,
      dulces?: string
  ): Promise<Product | null>;

}

