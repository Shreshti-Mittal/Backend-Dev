//Delete only student marks less than 70
import express from 'express';
const app=express();
app.use(express.json());
//delete data from server
let students=[{id:1,name:'Rahul',marks:59,city:'Delhi'},
    {id:2,name:'AK',marks:70,city:'Agra'},
    {id:2,name:'Shreshti',marks:80,city:'Agra'},
    {id:3,name:'Aditya',marks:85,city:'Bihar'},
    
];
//view Student
app.get("/students",(req,res)=>{
    res.json(students);
});
//delete student
//deletion like array

app.delete("/students/:id",(req,res)=>{
    const id=req.params.id;
    const index=students.findIndex((s)=>s.id==id);
    console.log('index',index);
    if(index===-1){
        return res.status(404).json({message:"Student not found"});
    }if(students[index].marks < 70){
    const deletedStudent=students.splice(index,1);
    res.json({
        message:"Student deleted successfully",
        deletedStudent:deletedStudent[0],

    });
}
});
app.listen(3000, () => console.log("Server Started on port 3000"));