import { query } from "../../../../database/mysql/mysql";
import { Users } from "../../../domain/Users";
import { UsersRepository } from "../../../domain/UsersRepository";

export class MysqlUsersRepository implements UsersRepository {
  async login(correo: string, password: string): Promise<Users | null> {
    const sql = "SELECT * FROM users WHERE correo=? and password=?";
    const params: any[]=[correo, password];
    try {
      const result: any= await query(sql, params);
      const user = result[0][0];
      console.log(user)
      return user;
    } catch (error) {
      return null;
    }
  }
  async getById (id: string): Promise<Users | null> {
    const sql = "SELECT * FROM users WHERE id=?";
    const params: any[] = [id];
    try {
      const result: any = await query(sql, params);
      const user = result[0][0]
      console.log(user)
      return new Users(
        user.id,
        user.nombre,
        user.correo,
        user.password
      );
    } catch (error) {
      return null;
    }
  }
  async getAll(): Promise<Users[] | null> {
    const sql = "SELECT * FROM users";
    try {
      const [data]: any = await query(sql, []);
      const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
      return dataUsers.map(
        (user: any) =>
          new Users(
            user.id,
            user.nombre,
            user.correo,
            user.password
          )
      );
    } catch (error) {
      return null;
    }
  }

  async createUsers(
    nombre: string,
    correo: string,
    password: string,
  ): Promise<Users | null> {
    const sql = "INSERT INTO users (nombre, correo, password) VALUES (?, ?, ?)";
    const params: any[] = [nombre, correo, password];
    try {
      const [result]: any = await query(sql, params);
      return new Users(result.insertId, nombre, correo, password);
    } catch (error) {
      return null;
    }
  }

  async deleteUser(userId: string): Promise<boolean> {
    const sql = "DELETE FROM users WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }

  async updateUsers(id: string, nombre?: string, correo?: string, password?: string): Promise<Users | null> {
    const fieldsToUpdate: string[] = [];
    const params: any[] = [];

    if (nombre) {
      fieldsToUpdate.push("nombre = ?");
      params.push(nombre);
    }
    if (correo) {
      fieldsToUpdate.push("correo = ?");
      params.push(correo);
    }
    if (password) {
      fieldsToUpdate.push("password = ?");
      params.push(password);
    }
    
    params.push(id);

    const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows === 0) return null;
      
      const updatedUser: any = await this.getById(id);
      return updatedUser;
    } catch (error) {
      return null;
    }
  }

}