let mongoose=require('mongoose')
let {ObjectId}=mongoose.Schema.Types

let eventSchema=new mongoose.Schema({
    eventname:{type:String,required:true},
    eventdate:{type:String,required:true},
    eventtime:{type:String,required:true},
    eventlocation:{type:String,required:true},
    eventdescription:{type:String,required:true},
    eventimage:{type:String,required:true},
    eventstatus:{type:String,required:true},
    eventcategory:{type:String,required:true}, 
    postedBy:{type:ObjectId,ref:"USER"},
    registermember:[{type:ObjectId,ref:"USER"}]
})

mongoose.model("EVENT",eventSchema);