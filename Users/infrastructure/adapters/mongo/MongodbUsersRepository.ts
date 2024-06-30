import { db } from "../../../../database/mongodb/mongodb";
import { Users } from "../../../domain/Users";
import { UsersRepository } from "../../../domain/UsersRepository";
import { ObjectId } from "mongodb";

export class MongodbUsersRepository implements UsersRepository {
  async login(correo: string, password: string): Promise<Users | null> {
    try {
      const user = await db.collection('users').findOne({ correo, password });
      if (!user) return null;
      return new Users(user._id.toString(), user.nombre, user.correo, user.password);
    } catch (error) {
      console.error("Error in login:", error);
      return null;
    }
  }

  async getById(id: string): Promise<Users | null> {
    try {
      const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
      if (!user) return null;
      return new Users(user._id.toString(), user.nombre, user.correo, user.password);
    } catch (error) {
      console.error("Error in getById:", error);
      return null;
    }
  }

  async getAll(): Promise<Users[] | null> {
    try {
      const users = await db.collection('users').find().toArray();
      return users.map(user => new Users(user._id.toString(), user.nombre, user.correo, user.password));
    } catch (error) {
      console.error("Error in getAll:", error);
      return null;
    }
  }

  async createUsers(nombre: string, correo: string, password: string): Promise<Users | null> {
    try {
      const newUser = { nombre, correo, password };
      const result = await db.collection('users').insertOne(newUser);
      const userId = result.insertedId;
      const savedUser = await db.collection('users').findOne({ _id: userId });
      if (!savedUser) return null;
      return new Users(savedUser._id.toString(), savedUser.nombre, savedUser.correo, savedUser.password);
    } catch (error) {
      console.error("Error in createUsers:", error);
      return null;
    }
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error in deleteUser:", error);
      return false;
    }
  }

  async updateUsers(id: string, nombre?: string, correo?: string, password?: string): Promise<Users | null> {
    try {
      const updateData: any = {};
      if (nombre) updateData.nombre = nombre;
      if (correo) updateData.correo = correo;
      if (password) updateData.password = password;

      const result = await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) return null;

      const updatedUser = await db.collection('users').findOne({ _id: new ObjectId(id) });
      if (!updatedUser) return null;
      return new Users(updatedUser._id.toString(), updatedUser.nombre, updatedUser.correo, updatedUser.password);
    } catch (error) {
      console.error("Error in updateUsers:", error);
      return null;
    }
  }

}




