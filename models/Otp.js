const mongoose=require('mongoose')
const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otpcode:Number
})

module.exports=mongoose.model('Otp',OtpSchema)