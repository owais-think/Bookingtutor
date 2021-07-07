const User=require('./models/Users')
const checkauthorization=(req,res,next)=>{
    if(req.body.email!==undefined)
    {
        User.findOne({email:req.body.email,Authorize:true},(err,doc)=>{
            if(err) return res.json({message:"Failed",err})
            else
            {
                if(doc!==null)
                {
                   // const updatespecific= User.updateOne({email:req.body.email},{$set:{Authorize:{$eq:true}}})
                    //res.json(updatespecific)
                    User.findOneAndUpdate({email:req.body.email},{Authorize:true},{new:true},(error,data)=>{
                        if(error)return res.json({message:"Failed",error})
                        else{
                            return res.json({messageL:"success",user:data})
                        }
                    })
                }
                else
                {
                    return res.json("Not authorized")
                }
            }})}}
module.exports=checkauthorization