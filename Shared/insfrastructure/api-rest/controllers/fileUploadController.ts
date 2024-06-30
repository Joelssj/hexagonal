import { Request, Response } from 'express';
import { FileUploadService } from '../../../application/fileUploadService';
import { compositeStorage } from '../compositeStorage/compositeStorage';

const storage = new compositeStorage();
const fileUploadService = new FileUploadService(storage);

const fileNameCounters: { [key: string]: number } = {}; // Contador en memoria

function generateUniqueName(baseName: string, extension: string): string {
  if (!fileNameCounters[baseName]) {
    fileNameCounters[baseName] = 1;
  } else {
    fileNameCounters[baseName]++;
  }
  return `${baseName}-${fileNameCounters[baseName]}.${extension}`;
}

export class FileUploadController {
  async upload(req: Request, res: Response): Promise<void> {
    try {
      console.log('Received file:', req.file);
      if (!req.file) {
        console.log('No file uploaded');
        res.status(400).send({ status: 'error', message: 'No file uploaded' });
        return;
      }

      const archivo = req.file.buffer;
      const originalName = req.file.originalname;
      const fileExtension = originalName.split('.').pop(); // Obtener la extensión del archivo
      const baseName = originalName.replace(`.${fileExtension}`, ''); // Obtener el nombre base sin extensión
      const uniqueName = generateUniqueName(baseName, fileExtension!); // Generar un nombre único basado en el contador

      await fileUploadService.uploadFile(archivo, uniqueName);
      res.status(200).send({ status: 'success', message: 'File uploaded successfully', fileName: uniqueName });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send({ status: 'error', message: 'File upload failed', error });
    }
  }
}
