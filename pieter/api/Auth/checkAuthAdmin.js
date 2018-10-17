
console.log('checkAuthAdmin');
var JWT_private = 'secret';
var jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    
    try{
        const decoded = jwt.verify(req.headers.authorization,JWT_private);
        if(decoded)
        {
            req.userData = decoded;
        const data = jwt.decode(req.headers.authorization);
        if(data.admin===1)
        {
            console.log(data.admin);
            next();
        }
        else{
            return res.status(401).json({message:'auth failed'});
        }
        
        
        }
        
        
    }catch(error){
        return res.status(401).json({message:'auth failed'});

    }


   
};