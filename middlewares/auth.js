const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    try {
         let token=req.headers.authorization.split(" ")[1];
         if(token){
            var decoded = jwt.verify(token, 'blog')
            if(decoded){
                next()
            }else{
                res.staus(201).send({"msg":"Please Login first"})

            }
         }else{
            res.staus(201).send({"msg":"Please Login first"})
         }
    } catch (error) {
        res.staus(404).send({"msg":error.message})
    }
}
module.exports={auth}