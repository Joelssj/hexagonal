import { ProductRepository } from "../domain/ProductRepository";

export class DeleteProductUseCase {
    constructor(readonly productRepository: ProductRepository) {}

    async run(productId: string): Promise<boolean> {
        try {
            const result = await this.productRepository.deleteProduct(productId);
            return result;   
        } catch (error) {
            return false;  
        }
    }
}
