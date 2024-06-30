import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class CreateProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

async run(
  refresco: string,
  sabrita: string,
  galletas: string,
  dulces: string,
): Promise<Product | null> {
  try {
    const product = await this.productRepository.createProduct(
      refresco,
      sabrita,
      galletas,
      dulces,
    );
    return product;
  } catch (error) {
    return null;
  }
}
}
  
