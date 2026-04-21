const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');~

mongoose
.connect("mongodb://localhost:27017/authDB")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("Mongo Error",err));

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);    

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered successfully" });
});

app.post("/login",async (req,res) =>{
    const {username,password} = req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    res.json({message:"Login successful"});

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});