import { Request, Response } from "express";
import { GetAllProductUseCase } from "../../../application/GetAllProductUseCase";

export class GetAllProductController {
  constructor(readonly getAllUsersUseCase: GetAllProductUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const products = await this.getAllUsersUseCase.run();
      if (products) {
        res.status(200).json(products.map((product: any) => {
          return {
            id: product.id,
            refresco: product.refresco,
            sabrita: product.sabrita,
            galletas: product.galletas,
            dulces: product.dulces
          };
        }));
      } else {
        res.status(400).json({
          status: "Error",
          msn: "Ha ocurrido un problema",
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
}





