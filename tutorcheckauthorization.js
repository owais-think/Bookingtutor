const Tutors=require('./models/Tutors')
const tutorcheckauthorization=(req,res,next)=>{
    if(req.body.email!==undefined)
    {
        Tutors.findOne({email:req.body.email,Authorize:true},(err,doc)=>{
            if(err) return res.json({message:"Failed",err})
            else
            {
                if(doc!==null)
                {
                   // const updatespecific= Tutor.updateOne({email:req.body.email},{$set:{Authorize:{$eq:true}}})
                    //res.json(updatespecific)
                    Tutors.findOneAndUpdate({email:req.body.email},{Authorize:true},{new:true},(error,data)=>{
                        if(error)return res.json({message:"Failed",error})
                        else{
                            return res.json({messageL:"success",tutor:data})
                        }
                    })
                }
                else
                {
                    return res.json("Not authorized")
                }
            }})}}
module.exports=tutorcheckauthorization