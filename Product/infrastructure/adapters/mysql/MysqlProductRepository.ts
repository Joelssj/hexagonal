// MysqlSensorRepository.ts
import { query } from "../../../../database/mysql/mysql";
import { Product } from "../../../domain/Product";
import { ProductRepository } from "../../../domain/ProductRepository";

export class MysqlProductRepository implements ProductRepository {
  async getAll(): Promise<Product[] | null> {
    const sql = "SELECT * FROM product"; 
    try {
      const [data]: any = await query(sql, []);
      const dataProducts = Object.values(JSON.parse(JSON.stringify(data)));

      return dataProducts.map(
        (product: any) =>
          new Product(
            product.id,
            product.refresco,
            product.sabrita,
            product.galletas,
            product.dulces
          )
      );
    } catch (error) {
      console.error("Error al obtener datos del sensor desde MySQL:", error);
      return null;
    }
  }

  async getById(productId: string): Promise<Product | null> {
    const sql = "SELECT * FROM product WHERE id=?";
    const params: any[] = [productId];
    try {
      const [result]: any = await query(sql, params);
      return new Product(
        result[0].id,
        result[0].refresco,
        result[0].sabrita,
        result[0].galletas,
        result[0].dulces
      );
    } catch (error) {
      return null;
    }
  }

  async createProduct(
    refresco: string,
    sabrita: string,
    galletas: string,
    dulces: string,
  ): Promise<Product | null> {
    const sql =
      "INSERT INTO product (refresco, sabrita, galletas, dulces) VALUES (?, ?, ?, ?)";
    const params: any[] = [refresco, sabrita, galletas, dulces];
    try {
      const [result]: any = await query(sql, params);
      return new Product(
        result.insertId,
        refresco,
        sabrita,
        galletas,
        dulces
      );
    } catch (error) {
      return null;
    }
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const sql = "DELETE FROM product WHERE id=?";
    const params: any[] = [productId];
    try {
      const [result]: any = await query(sql, params);
      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }

  async updateProduct(id: string, refresco?: string, sabrita?: string, galletas?: string, dulces?: string): Promise<Product | null> {
    const fieldsToUpdate: string[] = [];
    const params: any[] = [];

    if (refresco) {
      fieldsToUpdate.push("refresco = ?");
      params.push(refresco);
    }
    if (sabrita) {
      fieldsToUpdate.push("sabrita = ?");
      params.push(sabrita);
    }
    if (galletas) {
      fieldsToUpdate.push("galletas = ?");
      params.push(galletas);
    }
    if (dulces) {
      fieldsToUpdate.push("dulces = ?");
      params.push(dulces);
    }
    
    params.push(id);

    const sql = `UPDATE product SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;

    try {
      const [result]: any = await query(sql, params);
      if (result.affectedRows === 0) return null;
      
      const updatedProduct: any = await this.getById(id);
      return updatedProduct;
    } catch (error) {
      console.error("Error in updateProduct:", error);
      return null;
    }
  }


}





