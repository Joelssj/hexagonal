import { storageInterface } from '../domain/ports/storageFiles';

export class FileUploadService {
  constructor(private storage: storageInterface) {}

  async uploadFile(archivo: Buffer, nombreArchivo: string): Promise<void> {
    await this.storage.upload(archivo, nombreArchivo);
  }
}
