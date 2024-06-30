import { Request, Response } from "express";

import { CreateProductUseCase } from "../../../application/CreateProductUseCase";

export class CreateProductController {
  constructor(readonly createProductUseCase: CreateProductUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    console.log("mensaje " + JSON.stringify(data));
   try {
      const product = await this.createProductUseCase.run(
        data.refresco, 
        data.sabrita, 
        data.galletas, 
        data.dulces, 
      );

      if (product)
        res.status(201).send({
          status: "success",
          data: {
            id: product?.id,
            refresco: product?.refresco,
            sabrita: product?.sabrita, 
            galletas: product?.galletas, 
            dulces: product?.dulces, 
          },
        });
      else
        res.status(204).send({
          status: "error",
          data: "NO fue posible agregar el registro",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ocurrió un error",
        msn: error,
      });
    }
  }
}



