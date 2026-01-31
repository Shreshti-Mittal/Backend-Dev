// const http=require('http');
const express=require('express');
const app=express();

// app.get("/",(req,res)=>{
//     const log = `${Date.now()}: ${req.method}  ${req.url} New Req Received\n`;
//     return res.send(" /n ");

// });
// app.get("/about",(req,res)=>{
//     const username=req.query.username;
//     const age=req.query.age;
//     return res.send("Hi "+username+" your age is "+age);
// });
// // const myServer=http.createServer(app);//we don't need to import the http module and still our code will run.
// app.listen(8000,()=>{console.log("Server started");});

// app.get("/student",(req,res)=>{
//     constlog=`${Date.now()}: ${req.method}  ${req.url} New Req Received\n`;
//     return res.send(" hello");
// });
// app.get("/name",(req,res)=>{
//     const username=req.query.username;
//     return res.send("Hi "+username);
// });
// app.get("./marks",(req,res)=>{
//     const marks=req.query.marks;
//     if(marks<=40){
//         return res.send("Fail");
//     }else{
//         return res.send("Pass");
//     }});

//create a attendance directory and apllly some rule to calculate attendance and tell if attendanncce is short
app.get("/attendance",(req,res)=>{
    const username=req.query.username;
    const username2=req.query.username2;    
    const state=req.query.state;
    // const totaldays=req.query.totaldays;
    // const dayspresent=req.query.dayspresent;
   if(state==="present"){
    return res.send("Hi "+username+" your attendance is marked present");
   }else{
    return res.send("Hi "+username2+" your attendance is marked absent");
   }
});

app.listen(8000,()=>{console.log("Server started");});

