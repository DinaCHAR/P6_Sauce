//Ce fichier est utiliser, afin de vérifier l'auth de l'auth de l'utilisateur

const User = require("../model/user_model");
//Hachage
const bcrypt = require("bcrypt");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");


exports.signup = (req,res, next)=>{


    //crypter l'email pour plus de securité
    const emailCrypto = cryptoJs.HmacSHA1(req.body.email, `process.env.SECRET_EMAIL`).toString();

    //crypter password et créer nouvelle utilisateur
    bcrypt.hash(req.body.password, 10)
        .then((hash)=>{
            const user = new User({
                email: emailCrypto,
                password: hash
            })

            user.save()
                .then(()=> res.status(201).json({message: "Utilisateur créé"}))
                .catch((err)=>res.status(400).json({err}))
        })
        .catch((err)=>res.status(500).json({err}))
 
}

exports.login = (req,res)=>{

    //crypter l'email
    const emailCrypto = cryptoJs.HmacSHA1(req.body.email, `process.env.SECRET_EMAIL`).toString();
    //controller si l'email est dans la base de donnée findOne sert a allez chercher dans la base de donnée (MongoDB)
    User.findOne({ email:emailCrypto})
    .then((user)=> {
        //si l'utilisateur' n'existe pas dans la base de donnée alors un message d'erreur à été mis en place 
        if (!user) {
            return res.status(401).json({error: "Utilisateur non trouvé"})
        }
        //compare le password
            bcrypt.compare(req.body.password, user.password)
                .then((password)=>{
                    
                    //Vérification du mp, si ce dernier n'est pas correct alors un message d'erreur apparaît
                    if (!password) {
                        return res.status(401).json({error: "Mot de passe non valide"})
                    }
                    //si le mot de passe est correct, création du token et assignation du l' userId
                    res.status(200).json({
                        userId: user._id,
                        //crée le token
                        token: jwt.sign(
                            //Clé valeur
                            {userId: user._id},
                            process.env.KEY_TOKEN,
                            {expiresIn: "24h"}
                        )
                    })
                })
                .catch((err)=> res.status(500).json({err}))
    })
    .catch((err)=> res.status(500).json({err}))

    
}