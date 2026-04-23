import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));

app.post('/api/uploads', upload.single('image'), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: 'No file uploaded'})
    return;
  }
res.json({
    imageUrl: `http://localhost:3000/uploads/${req.file.filename}`,
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
