let express=require('express');
let cors=require('cors')
let mongoose=require('mongoose');


let app=express();
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1/eventmanagement")
.then(()=>{console.log('connect to db')})
.catch((err)=>{console.log(err)})


require('./Model/user')
require('./Model/event')
app.use(require('./Router/routes'))
app.get("/",(req,res)=>{
    res.send("Hello World")
})


let port=process.env.PORT||8080;
app.listen(port,()=>{console.log(`App. is Running at port ${port}`)})