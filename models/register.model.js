const mongoose=require('mongoose')
const registerSchema=new mongoose.Schema({
    roll:Number,
    sname:String,
    marks:String
    
})
module.exports=mongoose.model('Std',registerSchema)