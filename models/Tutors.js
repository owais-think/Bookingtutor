const mongoose=require('mongoose')
const scheduleschema=new mongoose.Schema({
    status:{type:String,default:"not booked"},
    day:String,
    Time:String
})
const TutorScehma=new mongoose.Schema({
    Authorize:{type:Boolean,default:false},
    email:String,
    name:String,
    city:String,
    phnumber:Number,
    Schedule:[scheduleschema]
})

module.exports=mongoose.model('tutorss')