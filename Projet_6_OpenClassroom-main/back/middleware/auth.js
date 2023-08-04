const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


module.exports = (req,res,next)=>{
    try{
        //recuperer le TOKEN dans le headers authorization (bearer)
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.KEY_TOKEN)
        //recuperer le userId a linterieur du token
            const userIdDecoded = decoded.userId;
        //si cest bon pass au middleware suivant
            if(req.body.userId && req.body.userId !== userIdDecoded){
                throw "UserId non valable"
            }else{
                next()
            }
    }catch (err){
        res.status(403).json({err})
    }
}