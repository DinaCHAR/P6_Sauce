//Ce fichier permet de  vérifier la l'authentification des sauces 
const Sauce = require("../model/sauce_model");

exports.createSauce = (req,res)=>{
    
    const sauceValue = JSON.parse(req.body.sauce);
    
    const sauce = new Sauce({
        ...sauceValue,
        //Recup l'id de l'utilisateur
        userId : req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })

    sauce.save()
        .then((sauce)=> res.status(201).json({message: sauce}))
        .catch((err)=>res.status(401).json({err}))
}

exports.getOneSauce = (req,res)=>{

    Sauce.findOne({_id: req.params.id})
    .then((sauce)=> res.status(200).json(sauce))
    .catch((err)=>res.status(401).json({err}))
}
exports.getAllSauce = (req,res)=>{

    Sauce.find()
    .then((sauces)=> res.status(200).json(sauces))
    .catch((err)=>res.status(401).json({err}))
}

    
exports.modifySauce = (req,res)=>{
   

    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        if (sauce.userId != req.auth.userId){
		res.status(401).json({message: "Not authorized"});
    }else {
       //Ajouter une image a la sauce 
    const ProductObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    } : { ...req.body };

    //Supp l'id de la sauce
     delete ProductObject._id;
    //Pour sécurisé l'utilisateur, on supp l'id de la personne qui crée la sauce 
     delete ProductObject.userId;

    console.log(ProductObject._userID);
    //Avoir la possibiliter de modifier la sauce crée 
    const id = req.params.id
    Sauce.updateOne({_id: id}, {...ProductObject, _id: id})
     .then(()=>res.status(200).json({message: "Produit modifié"}))
     .catch((err)=> res.status(403).json({err}))
        }
    })
}

//Permettre à l'uiliateur de supprimer une sauce 
exports.deleteSauce = (req,res)=>{

    Sauce.findOne({_id: req.params.id})
    .then(sauce => {
        if (sauce.userId != req.auth.userId){
		res.status(401).json({message: "Not authorized"});
    }else{
    Sauce.deleteOne({_id: req.params.id})
    .then(()=> res.status(201).json({message: "Sauce supprimé" }))
    .catch((err)=>res.status(401).json({err}))
        }
    })
}

exports.likeSauce = (req,res)=> {


Sauce.findOne({_id: req.params.id})
    .then((prod)=> {
        //Pour permettre de liker un sauce
        if (!prod.usersLiked.includes(req.auth.userId) && req.body.like === 1) {
            
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: 1}, $push: {usersLiked: req.auth.userId}} )
                .then(()=>res.status(200).json({message: "Utilisateur like +1"}))
                .catch((err)=> res.status(403).json({err}))  
        }
        
        if (prod.usersLiked.includes(req.auth.userId) && req.body.like === 0) {
            Sauce.updateOne({_id: req.params.id}, {$inc: {likes: -1}, $pull: {usersLiked: req.auth.userId}} )
                .then(()=>res.status(200).json({message: "Utilisateur supprime like 0"}))
                .catch((err)=> res.status(403).json({err}))     
        }


        //Pour permettre de disliker la sauce 
        if (!prod.usersDisliked.includes(req.auth.userId) && req.body.like === -1) {
            
            Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: 1}, $push: {usersDisliked: req.auth.userId}} )
                .then(()=>res.status(200).json({message: "Utilisateur dislike +1"}))
                .catch((err)=> res.status(403).json({err}))  
        }
        
        if (prod.usersDisliked.includes(req.auth.userId) && req.body.like === 0) {
            Sauce.updateOne({_id: req.params.id}, {$inc: {dislikes: -1}, $pull: {usersDisliked: req.auth.userId}} )
                .then(()=>res.status(200).json({message: "Utilisateur supprime dislike 0"}))
                .catch((err)=> res.status(403).json({err}))     
        }
     
})
    .catch((err)=>res.status(404).json({err}))
}
