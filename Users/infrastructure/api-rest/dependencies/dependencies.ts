import { MysqlUsersRepository } from "../../adapters/mysql/MysqlUsersRepository";
import { MongodbUsersRepository } from "../../adapters/mongo/MongodbUsersRepository";
import { CreateUsersUseCase } from "../../../application/CreateUsersUseCase";
import { GetByIdUsersUseCase } from "../../../application/GetByIdUsersUseCase";
import { GetAllUsersUseCase } from "../../../application/GetAllUsersUseCase";
import { LoginUseCase } from "../../../application/LoginUseCase";
import { DeleteUsersUseCase } from "../../../application/DeleteUserCase"; 
import { CreateUsersController } from "../controllers/CreateUsersController";
import { GetAllUsersController } from "../controllers/GetAllUsersController";
import { GetByIdUsersController } from "../controllers/GetByIdUsersController";
import { LoginController } from "../controllers/LoginController";
import { DeleteUsersController } from "../controllers/DeleteUserController"; 
import { UsersRepository } from "../../../domain/UsersRepository";
import { UpdateUsersController } from "../controllers/UpdateUsersControllers";
import { UpdateUsersUseCase } from "../../../application/UpdateUsersCaseUse";
import dotenv from 'dotenv';

dotenv.config(); 

let usersRepository: UsersRepository;

const userRepository = process.env.DB_TYPE; 

if (userRepository === "mysql") {
  usersRepository = new MysqlUsersRepository();
} else {
  usersRepository = new MongodbUsersRepository(); 
}

export const createUserUseCase = new CreateUsersUseCase(usersRepository);
export const getAllUseCase = new GetAllUsersUseCase(usersRepository);
export const getByIdUserUseCase = new GetByIdUsersUseCase(usersRepository);
export const loginUseCase = new LoginUseCase(usersRepository);
export const deleteUserUseCase = new DeleteUsersUseCase(usersRepository); 
export const updateUserUseCase = new UpdateUsersUseCase(usersRepository); 

export const createUserController = new CreateUsersController(createUserUseCase);
export const getAllController = new GetAllUsersController(getAllUseCase);
export const getByIdUserController = new GetByIdUsersController(getByIdUserUseCase);
export const loginController = new LoginController(loginUseCase);
export const deleteUserController = new DeleteUsersController(deleteUserUseCase); 
export const updateUserController = new UpdateUsersController(updateUserUseCase);