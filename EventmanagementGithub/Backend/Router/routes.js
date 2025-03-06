let express=require('express');
let router=express.Router();
let mongoose=require('mongoose');
let USER=mongoose.model('USER');
let EVENT=mongoose.model('EVENT');
let JWT=require('jsonwebtoken');
let {JWT_secret}=require('../key')
let requirelogin=require('../Middleware/requirelogin')


router.get("/",(req,res)=>{
    res.send("Hello from chat app")
})
const requireloginadmin=(req,res,next)=>{
    if(req.user && req.user.role==='admin'){
        next();
    }
    else{
        res.status(401).send({message:"You are not authorized to access this page"})
    }
}
router.get("/add",requirelogin,(req,res)=>{
    res.send('Hello middleware')
})
router.post("/signup",(req,res)=>{
    let {name,username,email,password,role}=req.body;
    if(!name||!username||!email||!password||!role){
        return res.status(404).send('Not sign up')
    }
    let user=new USER({
        name,
        username,
        email,
        password,
        role
    })
    let result=user.save();
    console.log(result);
    res.send(result);
})
router.post("/signin",(req,res)=>{
    let {username,password}=req.body;
    if(!username||!password){
        return res.status(404).send('Not sign in') 
    }
    USER.findOne({username:username}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send('Not a user')  
        }
        console.log(savedUser);
    })
    USER.findOne({password:password}).then((savedUser)=>{
        if(!savedUser){
            return res.status(404).send('Not a user')  
        }
        console.log(savedUser);
        let token=JWT.sign({_id:savedUser._id},JWT_secret);
        console.log(token);
        let currentUserid=savedUser._id;
        let role=savedUser.role;
        res.json({token,currentUserid,role})

    })
})
router.post("/addevent",requirelogin,requireloginadmin,(req,res)=>{
    let {eventname,
    eventdate,
    eventtime,
    eventlocation,
    eventdescription,
    pic,
    eventstatus,
    eventcategory }=req.body;
    if(!eventname||!eventcategory||!eventdate||!eventdescription||!pic||!eventlocation||!eventtime||!eventstatus){
        return res.status(404).send('Not add event')
    }
    let event=new EVENT({
        eventname,
        eventdate,
        eventtime,
        eventlocation,
        eventdescription,
        eventimage:pic,
        eventstatus,
        eventcategory,
        postedBy:req.user
    })
    let result=event.save();
    res.send(result);
    console.log(result);
    })
    router.get("/allevents",async(req,res)=>{
        let result=await EVENT.find().populate("postedBy");
        if(!result){
            return res.status(404).send('Not found')
        }
        console.log(result);
        res.send(result);
    })
    router.get("/geteventdetail/:id",requirelogin,async(req,res)=>{
        let result=await EVENT.findById({_id:req.params.id}).populate("postedBy");
        if(!result){
            return res.status(404).send('Not found')
        }
        console.log(result);
        res.send(result);
    })
    router.put("/paticipateevent/:id",requirelogin,async(req,res)=>{
        try {
            let result=await EVENT.findByIdAndUpdate(req.params.id,{
                $push:{ registermember:req.user._id}
            },{
                new:true
            }).populate("registermember")
            console.log(result);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    })
    router.get("/mypaticipatedevent",requirelogin,async(req,res)=>{
        try {
            let result=await EVENT.find({registermember:req.user._id}).populate("registermember");
            if(!result){
                return res.status(404).send('Not found')
            }
            console.log(result);
            res.send(result);
            
        } catch (error) {
            console.log(error);
        }
    })
    router.get("/numberofpaticipate/:id",requirelogin,requireloginadmin,async(req,res)=>{
        try {
            let result=await EVENT.find({_id:req.params.id}).populate("registermember")
            if(!result){
                return res.status(404).send('Not found')
            }
            console.log(result[0].registermember);
            res.send(result[0].registermember);
        } catch (error) {
            console.log(error)
        }
    })
    router.put("/updateevent/:id",requirelogin,requireloginadmin,async(req,res)=>{
        try {
            let result=await EVENT.findByIdAndUpdate({_id:req.params.id},{
                eventdescription:req.body.eventdesc,
                eventname:req.body.eventname,
                eventdate:req.body.eventdate,
                eventtime:req.body.eventtime,
            })
            if(!result){
                return res.status(404).send('Not found')
            }
            console.log(result);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    })

module.exports=router