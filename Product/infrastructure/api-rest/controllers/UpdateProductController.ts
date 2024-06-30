import { Request, Response } from "express";
import { UpdateProductUseCase } from "../../../application/UpdateProductUseCase";

export class UpdateProductController {
  constructor(readonly updateProductUseCase: UpdateProductUseCase) {}

  async run(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;
    console.log("mensaje " + JSON.stringify(data));

    try {
      const product = await this.updateProductUseCase.run(
        id,
        data.refresco,
        data.sabrita,
        data.galletas,
        data.dulces,
      );

      if (product) {
        res.status(200).send({
          status: "success",
          data: {
            id: product.id,
            refresco: product.refresco,
            sabrita: product.sabrita,
            galletas: product.galletas,
            dulces: product.dulces,
          },
        });
      } else {
        res.status(404).send({
          status: "error",
          data: "No fue posible actualizar el registro",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: "error",
        data: "Ocurrió un error",
        msn: error,
      });
    }
  }
}
