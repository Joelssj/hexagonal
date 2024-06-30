import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../application/GetAllUsersUseCase";

export class GetAllUsersController {
  constructor(readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const users = await this.getAllUsersUseCase.run();
      if (users) {
        res.status(200).json(users.map((user: any) => {
          return {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            password: user.password
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




/*import { Request, Response } from "express";
import { GetAllUsersUseCase } from "../../../application/GetAllUsersUseCase";
import jwt from "jsonwebtoken";

export class GetAllUsersController {
  constructor(readonly getAllUsersUseCase: GetAllUsersUseCase) {}

  async run(req: Request, res: Response) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ error: 'El acceso ha sido denegado' });
    }

    try {
      const decoded: any = jwt.verify(token, 'tu_secreto');
      const users = await this.getAllUsersUseCase.run();
      if (users) {
        res.status(200).send(users.map((user: any) => {
          return {
            id: user.id,
            nombre: user.nombre,
            correo: user.correo,
            password: user.password
          };
        }));
      } else {
        res.status(400).send({
          status: "Error",
          msn: "Ha ocurrido un problema",
        });
      }
    } catch (error) {
      res.status(401).json({ error: 'El token no es válido' });
    }
  }
}*/
