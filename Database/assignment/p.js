const express=require("express");
const mongoose=require("mongoose");

const app=express();

mongoose
    .connect("mongodb://localhost:27017/Middleware")
    .then(()=> console.log("MongoDb connected"))
    .catch((err)=> console.log("Error connecting to server" , err))

const emp_payroll=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:[2, 'Name must be atleast 2 charcter'],
            maxlength:[50,'Name cannot exceed 50 characters']
        },
        phonenumber:{
            type:String,
            required:true,
            match:[/^[0-9]{10}$/,"Please enter valid 10 number"]
            
        },
        Branch:{
            type:String,
            enum:["Noida","Banglore","Delhi"]
        },
        DDate:{
            type:Date,
        },


    },
    {timestamps:true}
);
const employee=mongoose.model('employee',emp_payroll);//employee is the collection name and office is the variable 

app.use(express.json());// help express to read req body
app.use(express.urlencoded({extended:false}));

app.post("/employee/api",async(req,res)=>{
    const body=req.body;
    if
        (!body||!body.name||!body.phone_number)
    {
        return req.status(400).json({message:"the required fields are required"});
    }
    const result=await employee.create({
        name:body.name,
        phonenumber:body.phone_number,
        Branch:body.branch,
        DDate:body.date
    });
    return res.status(201).json({
        message:"Employee created successfully",
        employee:result
    });

});