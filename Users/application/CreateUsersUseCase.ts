import { Users } from "../domain/Users";
import { UsersRepository } from "../domain/UsersRepository";

export class CreateUsersUseCase{
    constructor(readonly usersRepository: UsersRepository ){}

    async run(
        nombre:string,
        correo: string,
        password: string
    ): Promise<Users | null> {
        try {
        const user = await this.usersRepository.createUsers(
          nombre,
          correo,
          password  
        );
         return user;   
        } catch (error) {
         return null;  
        }
    }

}