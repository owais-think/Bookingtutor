const express=require('express')
const app=express()
const mongoose=require('mongoose')
const url='mongodb://localhost/BookingTutor'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection
db.once('open',()=>{
    console.log('connected to mongodb database')
})
app.get('/',(req,res)=>{
    res.send('<h1>Hello owais</h1>')
})
const Port=process.nextTick.Port || 3000
app.listen(Port,()=>{console.log(`Server Started at PORT ${Port}`)})