//Gérer les données utilisateur avec Mongoos et MangoDB
//Fournir une interface à la base de donnée
const mongoose = require("mongoose");
const muv = require("mongoose-unique-validator");


const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true}
})

userSchema.plugin(muv)
module.exports = mongoose.model("User",userSchema)