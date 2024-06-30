import { storageInterface } from '../../../domain/ports/storageFiles';
import { localStorage } from '../../adapters/storage/local-ec2/localStorage';
import { s3Storage } from '../../adapters/storage/s3/s3Storage';

export class compositeStorage implements storageInterface {
  private local: storageInterface;
  private s3: storageInterface;

  constructor() {
    this.local = new localStorage();
    this.s3 = new s3Storage();
  }

  async upload(archivo: Buffer, nombreArchivo: string): Promise<void> {
    await Promise.all([
      this.local.upload(archivo, nombreArchivo),
      this.s3.upload(archivo, nombreArchivo),
    ]);
  }
}
