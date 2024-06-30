import { storageInterface } from '../../../../domain/ports/storageFiles';
import { S3Client, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    sessionToken: process.env.AWS_SESSION_TOKEN!, // Puede ser opcional si no estás usando sesiones temporales
  },
});

export class s3Storage implements storageInterface {
  async upload(archivo: Buffer, nombreArchivo: string): Promise<void> {
    const params: PutObjectCommandInput = {
      Bucket: 'mantessj',
      Key: nombreArchivo,
      Body: archivo,
    };

    try {
      const parallelUploads3 = new Upload({
        client: s3Client,
        params: params,
      });

      parallelUploads3.on('httpUploadProgress', (progress: any) => {
        console.log(progress);
      });

      await parallelUploads3.done();
      console.log('File uploaded to S3 successfully');
    } catch (err) {
      console.error('Error uploading to S3:', err);
      throw err;
    }
  }
}
