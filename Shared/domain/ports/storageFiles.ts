export interface storageInterface {
    upload(
        archivo: Buffer,
        nombreArchivo: string): 
        Promise<void>;
  }
  