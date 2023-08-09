const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const path =require("path");
const bodyParser = require("body-parser");
const routeUser = require("./route/user_route");
const routeSauce = require("./route/sauce_route");


const app = express();

console.log("URL " + process.env.MONGODB_URL)

//Gérer la connexion MongoDB, afin de pouvoir récup les données dans MongoDB 
mongoose.connect(process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.log('Connexion à MongoDB échouée ! ' + err));


app.use((req, res, next) => {
  //Accéder au code d'origine 
  res.header("Access-Control-Allow-Origin", "*"); // FOR DEVELOPMENT PURPOSES ONLY
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Expose-Headers", "X-Total-Count");
  //Pour le fichier ROUTE
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// fonction pour appeler les different middlwear spécifié
app.use(express.json());
app.use("/images/", express.static(path.join(__dirname, "images")))
app.use("/api/auth", routeUser)
app.use("/api/sauces", routeSauce)



module.exports = app;

