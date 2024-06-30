import express from "express";

import { createProductController, getAllProductController, getByIdProductController, updateProductController } from "../dependencies/dependencies";
import { deleteProductController } from "../dependencies/dependencies";

export const productRouter = express.Router();


productRouter.post("/crear",createProductController.run.bind(createProductController));
productRouter.get("/get",getAllProductController.run.bind(getAllProductController));
productRouter.get( "/get/:id", getByIdProductController.run.bind(getByIdProductController));
productRouter.delete("/delete/:id",deleteProductController.run.bind(deleteProductController));
productRouter.put("/update/:id", updateProductController.run.bind(updateProductController));