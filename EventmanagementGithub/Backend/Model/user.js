let mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true}
})

mongoose.model("USER",userSchema)