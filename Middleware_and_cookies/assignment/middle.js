const express=require("express");
const app=express();

app.use((req,res,next)=>{
    console.log("Middleware1")
    next();
})

app.use((req,res,next)=>{
    console.log("Middleware2")
    next();
})
app.get("/test",(req,res)=>{
    res.send("Route executed");
});

app.listen(5000,()=> console.log("Server started"));