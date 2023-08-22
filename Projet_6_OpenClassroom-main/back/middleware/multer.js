//Ce fichier est utilisé pour récupéré le téléchargement des fichiers tel que les images ajouté 
//Sa méthode diskStorage() configure le chemin et le nom de fichier pour les fichiers entrants
//Ce qui permet d'enregistrer les images dans un dossier a part
const multer = require('multer');

//Le format d'img qui peut être télécharger
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Stockage des images
const storage = multer.diskStorage({
  //dest indique d'enregistrer les fichiers dans le dossier img
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //indique d'utiliser le nom d'origine, remplacer des espaces par '_' et ajouter Date.now comme nom de fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    //Resoudre l'ext du fichier app
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Passer la constante storage et indiqué qu'on gère uniquement les téléch des fichier img
module.exports = multer({storage: storage}).single('image');