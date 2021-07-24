const mongoose=require('mongoose')
const express=require('express');
const router=express.Router();
const Otp=require('../models/Otp')
const tutorcheckauthorization=require('../tutorcheckauthorization')
const Tutors=require('../models/Tutors');
const data=require('../dant.json')


//get all user
router.get('/viewTutors',(req,res)=>{
    Tutors.find((err,doc)=>{
    if(err){
        return res.json({message:"Failed",err})
    }
    else{
        return res.json({message:"Success",doc})
    }
    })
})



//user signup
router.post('/createtutor',(req,res)=>{
    let i;
    let days=[]
    for (i = 1; i <=30; i++) {
        
        Schedule={slotnumber:i}
        days.push(Schedule)
        
    }
           
                let otpno=Math.floor(100000 + Math.random() * 900000)
                console.log(otpno)

                // let time={
                //     tutorid:req.body.tutorid
                // }

                let otp={
                    email:req.body.email,
                    otpcode:otpno
                }
                let data={
                    email:req.body.email,
                    name:req.body.name,
                    password:req.body.password,
                    phnumber:req.body.phnumber,
                    city:req.body.city,
                    language:req.body.language,
                    Country:req.body.country,
                    priceperhour:req.body.priceperhour,
                    availability:req.body.availability,
                    Schedule:days,
                }
                Otp.create(otp,(err,doc)=>{
                    if(err){
                        return res.json({message:"Failed",err})
                    }
                    else{
                        Tutors.create(data,(err,docc)=>{
                            if(err){
                                return res.json({message:"Failed",err})
                            }
                            else{
                                let dataa={
                                    tutorid:docc._id
                                }
                                Tutors.findByIdAndUpdate(dataa.tutorid,{"Time.tutorid":dataa.tutorid},{new:true},(err,time)=>{
                                    if(err){
                                        return res.json({message:"Failed",err})
                                    }
                                    else{
                                        return res.json({message:"Success",time})
                                    }
                                })
                                // return res.json({message:"Successfull",docc})
                            }
                        })
                    }
                })      
    })
 
//Delete Tutor
router.delete('/deletetutor',(req,res)=>{
    const id=req.body.id;
   Tutors.findByIdAndDelete(id,(err,doc)=>{
       if(err){
           return res.json({message:"Failed",err})
       }
       else{
           return res.json({message:"Tutor Deleted",doc})
       }
   })
})

//View otp
router.get('/viewotpcodes',(req,res)=>{
    Otp.find((err,doc)=>{
        if(err){
            return res.json({message:"Failed",err})
        }
        else{
            return res.json({message:"Success",doc})
        }
    })
})

//Verify otp and update Tutors array
router.put('/verify',(req,res)=>{
    console.log('body->',req.body)
    if(req.body.email!==undefined && req.body.otpnumber!==undefined)
    {
        Otp.findOne({email:req.body.email,otpcode:req.body.otpnumber},(err,doc)=>{
            if(err) return res.json({message:"Failed",err})
            else
            {
                if(doc!==null)
                {
                   // const updatespecific= User.updateOne({email:req.body.email},{$set:{Authorize:{$eq:true}}})
                    //res.json(updatespecific)
                    Tutors.findOneAndUpdate({email:req.body.email},{Authorize:true},{new:true},(error,user)=>{
                        if(error)return res.json({message:"Failed",error})
                        else{
                            return res.json({messageL:"success",otp:doc,user:user})
                        }
                    })
                }
                else
                {
                    return res.json("Invalid OTP or email")
                }
            }
        })
    }
    else
    {
        return res.json({message:"Failed",Error:"OTP and Email are required"})
    }
})



router.get('/login',tutorcheckauthorization,(req,res)=>{
            console.log("success")
    
})





router.get('/viewmyprofile',(req,res)=>{
    Tutors.findOne({_id:req.body.id},(err,data)=>{
        if(err){
            return res.json({message:"Failed",err})
        }
        else{
            return res.json({message:"Success",data})
        }
    })
})


router.post('/createschedule',(req,res)=>{
    Tutors.findOne({_id:req.body.id},(err,doc)=>{
        if(err){
            return res.json({message:"Failed",err})
        }
        else{
           let _id=req.body.id
           doc.availability.forEach(a=>{
            let i   
            for(i=1;i<=4;i++){

            }
           })


            // let _id=req.body.id
            // let i
            // for(i=0;i<=3;i++){
            //     doc.availability.forEach(a=>{
            //         let data={
            //             status:"not booked",
            //             day:a,
            //             time:"3:00"
            //         }
            //             console.log(a)
            //             Tutors.findByIdAndUpdate(_id,{$push:{Schedule:data}},{new:true},(err,tutor)=>{
            //                 if(err){
            //                     return res.json({message:"Failed",err})
            //                 }
            //                 else{
            //                     console.log(tutor)
            //                 }
            //             })
                        
            //             })
            //         }
                  
            }
          
        
    })
})

router.get('/viewtutortimings',(req,res)=>{
    Tutors.find((err,docs)=>{
    if(err){
        return res.json({message:"Failed",err})
    }
    else{
        return res.json({message:"Sucess",docs})
    }
    })
})

router.post('/bulktutors',(req,res)=>{
    data.forEach(dat=>{
        let days=["monday","tuesday","wednesday","thursday","friday"]
         availability=days.slice(0,Math.floor(Math.random() * 6) + 1)
        console.log(availability)
        let i;
        let dayss=[]
        for (i = 1; i <=30; i++) {
            
            Schedule={slotnumber:i}
            dayss.push(Schedule)
            
        }
        let data={
            email:dat.email,
            name:dat.name,
            password:dat.password,
            phnumber:dat.phnumber,
            city:dat.city,
            language:dat.language,
            Country:dat.country,
            priceperhour:dat.priceperhour,
            availability:availability,
            Schedule:dayss,
        }
     
           
                let otpno=Math.floor(100000 + Math.random() * 900000)
                console.log(otpno)

                // let time={
                //     tutorid:req.body.tutorid
                // }

                let otp={
                    email:dat.email,
                    otpcode:otpno
                }
                
                Otp.create(otp,(err,doc)=>{
                    if(err){
                        return res.json({message:"Failed",err})
                    }
                    else{
                        Tutors.create(data,(err,docc)=>{
                            if(err){
                                return res.json({message:"Failed",err})
                            }
                            else{
                                let dataa={
                                    tutorid:docc._id
                                }
                                Tutors.findByIdAndUpdate(dataa.tutorid,{"Time.tutorid":dataa.tutorid},{new:true},(err,time)=>{
                                    if(err){
                                        return res.json({message:"Failed",err})
                                    }
                                    else{
                                        setTimeout(() => {
                                            return res.json({message:"Success",time})
                                        }, 9000);
                                    }
                                })
                                // return res.json({message:"Successfull",docc})
                            }
                        })
                        
                    }
                })      

    })
})
module.exports=router;