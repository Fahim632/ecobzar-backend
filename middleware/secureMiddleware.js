const jwt = require("jsonwebtoken");

let secureMiddleware = (req,res,next)=>{
    let token = req.headers.authorization
    jwt.varify(token,process.env.ACCESS_TOKEN_SECRET,function(err,decoded){
        if(err){
            res.send({message: "Unauthorizd"});
        }else{
            next();
        }
    })
}

module.exports = secureMiddleware