const mongoose=require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/college',{
    useNewUrlParser:true
})
.then(()=>{
    console.log("Database Connected");
})
.catch((err)=>{
    console.log("Problem in Connection :"+err);
})      