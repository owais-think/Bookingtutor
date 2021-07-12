const mongoose=require('mongoose')






const scheduleschema=new mongoose.Schema({
    status:{type:String,default:"not booked"},
    day:String,
    slotnumber:Number,
    Time:[String],
    userids:[{type:mongoose.Schema.Types.ObjectId,ref:"users"}]
})
const TutorScehma=new mongoose.Schema({
    Authorize:{type:Boolean,default:false},
    email:String,
    name:String,
    password:String,
    city:String,
    phnumber:Number,
    Schedule:[scheduleschema],
    language:String,
    Country:String,
    priceperhour:Number,
    availability:[String]
})

module.exports=mongoose.model('tutors',TutorScehma)