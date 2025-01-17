import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class GetByIdProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(id: string): Promise<Product | null> {
    try {
      const result = await this.productRepository.getById(id);
      return result;
    } catch (error) {
      return null;
    }
  }
}
