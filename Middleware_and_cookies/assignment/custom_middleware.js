const express = require("express");
const app = express();
app.use(express.json());


//LOGGER MIDDLEWARE
const logger=(req,res,next)=>{
    console.log("method",req.method);
    console.log("URL",req.url);
    next();
};

//Apply globally
app.use(logger);


//VALIDAtION MIDDLEWARE
const validate=(req,res,next)=>{
    const name = req.body;
    if(!name){
        return res.status(400).json({message:"name is requires"});
    }
    next();
};

//ROUTE SPECIFIC MIDDLEWARE
const checkadmin =(req,res,next)=>{
    //dummy check (JWT se token aata h)
    const isAdmin=true;

    if(!isAdmin){
        return res.status(403).json({message:"access denied"});
    }
    next();
};

//home route
app.get("/",(req,res)=>{
    res.send("welcome to homepage");
});


//validation middleware use
app.post("/user",validate,(req,res)=>{
    res.json({
        message:"user created successfully",
        data:req.body,
    });
});


//route specific middleware

app.get("/admin", checkadmin,(req,res)=>{
    res.send("welcome admin");
});


app.listen(8000, ()=>{
    console.log("server started")
});

// login
const isMath=await bcrypt.compare("123456",hashedpassword);
console.log(isMath);
//salt
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();

    const salt=await bcrypt.gensalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
});
