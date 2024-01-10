const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'Image/'); // Spécifiez le répertoire où vous souhaitez stocker les images téléchargées
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Utilisez un horodatage et le nom de fichier d'origine comme nouveau nom de fichier
    },
  });

const upload = multer({ storage: storage });

module.exports = upload;