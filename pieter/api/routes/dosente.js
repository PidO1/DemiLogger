const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{res.status(200)
  .json({message:'hanteer dosente GET requests'})}
);

router.post('/',(req,res,next)=>{res.status(201)
  .json({message:'hanteer dosente POST requests'})}
);
router.get('/:dosentID',(req,res,next)=>
{const id = req.params.dosentID
  if(id==='special')
  {
      res.status(200).json({message:'you discovered the ID',id:id})
  }
  else {
    res.status(200).json({message:'you sent the non special ID',id:id})
  }
}
);

router.patch('/:dosentID',(req,res,next)=>
{res.status(200).json({message:'updated lecturer'});
});

router.delete('/:dosentID',(req,res,next)=>
{res.status(200).json({message:'DELETED lecturer'});
});

module.exports = router;
