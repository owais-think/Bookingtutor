const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    Authorize:{type:Boolean,default:false},
    email:{type:String,unique:true},
    name:String,
    password:String,
    city:String,
    phnumber:String,
})
module.exports=mongoose.model('users',UserSchema)