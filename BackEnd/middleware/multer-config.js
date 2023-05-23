const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const maxSize = 2 * 1024 * 1024;
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },

});

const resizeImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const filePath = req.file.path;

  sharp(filePath)
    .resize({ width: 800, height: 600 }) // Spécifiez les dimensions souhaitées ici
    .toBuffer()
    .then((buffer) => {
      // Remplacez le fichier d'origine par l'image redimensionnée
      fs.writeFile(filePath, buffer, (writeErr) => {
        if (writeErr) {
          return next(writeErr);
        }
        next();
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = (req, res, next) => {
  multer({ storage: storage, limits: { fileSize: maxSize } }).single('image')(req, res, (err) => {
    if (err) {
      return next(err);
    }
    resizeImage(req, res, next);
  });
};