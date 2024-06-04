
require('dotenv').config()
const jwt = require("jsonwebtoken")


const authMiddleware = (req, res, next) =>{


    const authHeader = req.headers.authorization;
   
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg:"worrng"});
    }

    const token = authHeader.split(' ')[1];


   

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET);
    if(decode.userId)
    {
        req.userId = decode.userId
        next()  
    }
       
     
    }
    catch(err){
        return res.status(403).json({msg:"worrng 2"})
    }

};


module.exports = {authMiddleware}