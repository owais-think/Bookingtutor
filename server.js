const express=require('express')
const app=express()
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const userroute=require('./routes/Users')
const tutorroute=require('./routes/Tutors')
const bookingroute=require('./routes/Booking')
const url='mongodb://localhost/BookingTutor'
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection
db.once('open',()=>{
    console.log('connected to mongodb database')
})

app.use(bodyParser.json())
app.use('/user',userroute)
app.use('/tutor',tutorroute)
app.use('/booking',bookingroute)

app.get('/',(req,res)=>{
    res.send('<h1>Hello owais</h1>')
})
const Port=process.env.Port || 3000
app.listen(Port,()=>{console.log(`Server Started at PORT ${Port}`)})