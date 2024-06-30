import { Request, Response } from "express";
import { GetByIdProductUseCase } from "../../../application/GetByIdProductUseCase";


export class GetByIdProductController{
constructor(readonly getByIdProductUseCase: GetByIdProductUseCase){}

async run(req: Request, res: Response) {
    const id: string = req.params.id; 
    try {
      const product = await this.getByIdProductUseCase.run(id);

      if (product)
        //Code HTTP : 200 -> Consulta exitosa
        res.status(200).send({
          status: "success",
          data: {
            id: product.id,
            refresco: product.refresco,
            sabrita: product.sabrita,
            galletas: product.galletas,
            dulces: product.dulces

          },
        });
      else
        res.status(400).send({
          status: "Error",
          msn: "Ha ocurrido un problema",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }

}

