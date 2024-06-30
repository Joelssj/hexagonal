import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class UpdateProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    id: string,
    refresco?: string,
    sabrita?: string,
    galletas?: string,
    dulces?: string,
  ): Promise<Product | null> {
    try {
      const product = await this.productRepository.updateProduct(
        id,
        refresco,
        sabrita,
        galletas,
        dulces,
      );
      return product;
    } catch (error) {
      console.error("Error in UpdateProductUseCase:", error);
      return null;
    }
  }
}
