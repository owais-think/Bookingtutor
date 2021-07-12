const express=require('express')
const Booking=require('../models/Booking')
const router=express.Router()
router.get('/viewbookings',(req,res)=>{
    Booking.find((err,docs)=>{
        if(err){
            return res.json({message:"Failed",err})
        }
        else{
            return res.json({message:"Bookings",docs})
        }
    })
})
module.exports=router