import { db } from "../../../../database/mongodb/mongodb";
import { Product } from "../../../domain/Product";
import { ProductRepository } from "../../../domain/ProductRepository";
import { ObjectId } from "mongodb";

export class MongodbProductRepository implements ProductRepository {

  async getById(id: string): Promise<Product | null> {
    try {
      const product = await db.collection('product').findOne({ _id: new ObjectId(id) });
      if (!product) return null;
      return new Product(product._id.toString(), product.refresco, product.sabrita, product.galletas, product.dulces);
    } catch (error) {
      console.error("Error in getById:", error);
      return null;
    }
  }

  async getAll(): Promise<Product[] | null> {
    try {
      const products = await db.collection('product').find().toArray();
      return products.map(product => new Product(product._id.toString(), product.refresco, product.sabrita, product.galletas, product.dulces));
    } catch (error) {
      console.error("Error in getAll:", error);
      return null;
    }
  }

  async createProduct(refresco: string, sabrita: string, galletas: string, dulces: string): Promise<Product | null> {
    try {
      const newProduct = { refresco, sabrita, galletas, dulces };
      const result = await db.collection('product').insertOne(newProduct);
      const productId = result.insertedId;
      const savedProduct = await db.collection('product').findOne({ _id: productId });
      if (!savedProduct) return null;
      return new Product(savedProduct._id.toString(), savedProduct.refresco, savedProduct.sabrita, savedProduct.galletas, savedProduct.dulces);
    } catch (error) {
      console.error("Error in createProduct:", error);
      return null;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const result = await db.collection('product').deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error in deleteProduct:", error);
      return false;
    }
  }
 
  async updateProduct(id: string, refresco?: string, sabrita?: string, galletas?: string, dulces?: string): Promise<Product | null> {
    try {
      const updateData: any = {};
      if (refresco) updateData.refresco = refresco;
      if (sabrita) updateData.sabrita = sabrita;
      if (galletas) updateData.galletas = galletas;
      if (dulces) updateData.dulces = dulces;

      const result = await db.collection('product').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );

      if (result.matchedCount === 0) return null;

      const updatedProduct = await db.collection('product').findOne({ _id: new ObjectId(id) });
      if (!updatedProduct) return null;
      return new Product(updatedProduct._id.toString(), updatedProduct.refresco, updatedProduct.sabrita, updatedProduct.galletas, updatedProduct.dulces);
    } catch (error) {
      console.error("Error in updateProduct:", error);
      return null;
    }
  }


}








