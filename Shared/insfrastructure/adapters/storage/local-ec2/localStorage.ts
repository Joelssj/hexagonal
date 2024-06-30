import { storageInterface } from '../../../../domain/ports/storageFiles';
import * as fs from 'fs';
import * as path from 'path';

export class localStorage implements storageInterface {
  async upload(archivo: Buffer, nombreArchivo: string): Promise<void> {
    const uploadDir = path.join(__dirname, 'uploads');
    const localPath = path.join(uploadDir, nombreArchivo);

    // Crear el directorio si no existe
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    return new Promise((resolve, reject) => {
      fs.writeFile(localPath, archivo, (err) => {
        if (err) {
          console.error('Error uploading to local storage:', err);
          reject(err);
        } else {
          console.log('File uploaded to local storage:', localPath);
          resolve();
        }
      });
    });
  }
}
