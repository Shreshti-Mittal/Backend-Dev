import express from "express";

const app = express();
app.use(express.json());
let students=[
    {id:1,name:"Aman",marks:60,city:"Hyderabad"},
    {id:2,name:"Aditya",marks:70,city:"Agra"},
];
app.get("/students",(req,res)=>{
    res.json(students);
});
//patch-update any one field(marks or city)
app.patch("/students/:id",(req,res)=>{
    const id=req.params.id;
    const updates=req.body;
    
    const student=students.find((s)=>s.id==id);
    if(!student){
        return res.status(404).json({message:"student not found"});
    }
    //Apply partial update
    Object.assign(student,updates);
    res.json({message: "Students update Succesfully", student});
});
app.listen(5000, () => console.log("Server Started on port 8000"));