const mongoose=require('mongoose')
const BookingSchema=new mongoose.Schema({
    tutorid:{type:mongoose.Schema.Types.ObjectId,ref:""},
    userid:{type:mongoose.Schema.Types.ObjectId,ref:""},
    slotid:String,
    status:String,
    day:String,
    time:String
})
module.exports=mongoose.model('bookings',BookingSchema)