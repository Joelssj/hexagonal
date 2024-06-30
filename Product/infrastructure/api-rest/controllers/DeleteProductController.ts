import { Request, Response } from "express";
import { DeleteProductUseCase } from "../../../application/DeleteProductUseCase";

export class DeleteProductController {
    constructor(readonly deleteProductUseCase: DeleteProductUseCase) {}

    async run(req: Request, res: Response) {
        const productId = req.params.id;
        try {
            const result = await this.deleteProductUseCase.run(productId);
            if (result) {
                res.status(200).send({
                    status: "success",
                    data: `El producto con id:${productId} ha sido eliminado.`,
                });
            } else {
                res.status(404).send({
                    status: "Error",
                    data: `product with ID ${productId} not found.`,
                });
            }
        } catch (error) {
            const errorMessage = (error as Error).message || "Unknown error";
            res.status(500).send({
                status: "Error",
                data: "An error occurred while trying to delete the product.",
                message: errorMessage,
            });
        }
    }
}