console.log('checkAuth');
var JWT_private = 'secret';
var jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    
    try{
        const decoded = jwt.verify(req.headers.authorization,JWT_private);
        if(decoded)
        {
            req.userData = decoded;
        const data = jwt.decode(req.headers.authorization);
        if(data.demi===1)
        {
            req.demi = data.NwuNumber;
            
            next();
        }
        else{
            return res.status(401).json({message:'auth failed please check that you are logged in or registered'});
        }
        
        
        }
        
        
    }catch(error){
        return res.status(401).json({message:'auth failed'});

    }


   
};