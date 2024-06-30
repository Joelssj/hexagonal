import { Router } from 'express';
import multer from 'multer';
import { FileUploadController } from '../api-rest/controllers/fileUploadController';

const sharedRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('Received fieldname:', file.fieldname); 
    if (file.fieldname === 'file') {
      cb(null, true);
    } else {
      console.error(`Unexpected field: ${file.fieldname}`);
      cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
    }
  }
});

const fileUploadController = new FileUploadController();

sharedRouter.post('/upload', (req, res) => {
  console.log('Handling /upload route');
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.error(`MulterError: ${err.message}`);
      return res.status(400).send(`MulterError: ${err.message}`);
    } else if (err) {
      console.error(`Error: ${err.message}`);
      return res.status(500).send(`Error: ${err.message}`);
    }

    // Subida exitosa
    console.log('File uploaded successfully');
    fileUploadController.upload(req, res);
  });
});

export default sharedRouter;



