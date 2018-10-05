var JWT_private = 'secret';
var jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    console.log(req.headers);
    try{
        const decoded = jwt.verify(req.headers.authentication,JWT_private);
        if(decoded)
        {
            req.userData = decoded;
        const data = jwt.decode(req.headers.authentication);
        req.adminYN = data.demi;
        console.log(data.admin);
        next();
        }
        
    }catch(error){
        return res.status(401).json({message:'auth failed'});

    }


   
};