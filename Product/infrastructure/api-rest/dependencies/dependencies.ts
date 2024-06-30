import { CreateProductUseCase } from "../../../application/CreateProductUseCase";
import { GetAllProductUseCase } from "../../../application/GetAllProductUseCase";
import { GetByIdProductUseCase } from "../../../application/GetByIdProductUseCase";
import { CreateProductController } from "../controllers/CreateProductController";
import { GetAllProductController } from "../controllers/GetAllProductController";
import { GetByIdProductController } from "../controllers/GetByIdProductController";
import { MysqlProductRepository } from "../../adapters/mysql/MysqlProductRepository";
import { MongodbProductRepository } from "../../adapters/mongo/MongodbProductRepository";
import { DeleteProductController } from "../controllers/DeleteProductController";
import { DeleteProductUseCase } from "../../../application/DeleteProductUseCase";
import { UpdateProductController } from "../controllers/UpdateProductController";
import { UpdateProductUseCase } from "../../../application/UpdateProductUseCase";
import dotenv from 'dotenv';
import { ProductRepository } from "../../../domain/ProductRepository";

dotenv.config(); 

let productRepository: ProductRepository;
const productoRepository = process.env.DB_TYPE; 

if (productoRepository === "mysql") {
  productRepository = new MysqlProductRepository();
} else {
  productRepository = new MongodbProductRepository(); 
}

export const createProductUseCase = new CreateProductUseCase(productRepository);
export const getAllUseCase = new GetAllProductUseCase(productRepository);
export const getByIdProductUseCase = new GetByIdProductUseCase(productRepository);
export const deleteProductUseCase = new DeleteProductUseCase(productRepository);
export const updateProductUseCase = new UpdateProductUseCase( productRepository);

export const createProductController = new CreateProductController(createProductUseCase);
export const getAllProductController = new GetAllProductController(getAllUseCase);
export const getByIdProductController = new GetByIdProductController(getByIdProductUseCase);
export const deleteProductController = new DeleteProductController(deleteProductUseCase);
export const updateProductController = new UpdateProductController(updateProductUseCase);
