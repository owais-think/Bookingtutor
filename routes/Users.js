const mongoose=require('mongoose')
const express=require('express');
const router=express.Router();
const Otp=require('../models/Otp')
const checkauthorization=require('../checkauthorization')
const Users=require('../models/Users');


//get all user
router.get('/viewusers',(req,res)=>{
    Users.find((err,doc)=>{
    if(err){
        return res.json({message:"Failed",err})
    }
    else{
        return res.json({message:"Success",doc})
    }
    })
})



//user signup
router.post('/createuser',(req,res)=>{
            
                let otpno=Math.floor(100000 + Math.random() * 900000)
                console.log(otpno)

                let otp={
                    email:req.body.email,
                    otpcode:otpno
                }
                let data={
                    email:req.body.email,
                    name:req.body.name,
                    phnumber:req.body.phnumber,
                    password:req.body.password,
                    city:req.body.city
                }
                Otp.create(otp,(err,doc)=>{
                    if(err){
                        return res.json({message:"Failed",err})
                    }
                    else{
                        Users.create(data,(err,docc)=>{
                            if(err){
                                return res.json({message:"Failed",err})
                            }
                            else{
                                return res.json({message:"Successfull",docc})
                            }
                        })
                    }
                })      
    })
 
//Delete User
router.delete('/deleteuser',(req,res)=>{
    const id=req.body.id;
    const deletespecific=Users.findByIdAndDelete(id)
    res.json(deletespecific)
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

//Verify otp and update users array
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
                    Users.findOneAndUpdate({email:req.body.email},{Authorize:true},{new:true},(error,user)=>{
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



router.get('/login',checkauthorization,(req,res)=>{
            console.log("success")
    
})





router.get('/viewmyprofile',(req,res)=>{
    Users.findOne({_id:req.body.id},(err,data)=>{
        if(err){
            return res.json({message:"Failed",err})
        }
        else{
            return res.json({message:"Success",data})
        }
    })
})




  
module.exports=router;