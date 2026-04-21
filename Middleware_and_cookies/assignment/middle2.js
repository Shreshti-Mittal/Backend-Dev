const express = require('express');
const session = require('express-session');
const app = express();

// built-in-middleware
app.use(express.json());
app.use(express.urlencoded({extended:false})); 

//session setup
app.use(
    session({
        secret:"mySecretkaey15", // encrypted session id
        resave: false, // session ko har request pe save nahi karega jab tak ki session data change na ho
        saveUninitialized:false, // jab tak session me data nahi hoga tab tak session create nahi karega
        cookie:{
            maxAge: 1000 * 60 * 60, // 1 hour
            httponly: true, // client side js se access nahi hoga
        },
    }),
);

//login (create session)
app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    // Dummy Authentication (real me DB se aayega)
    if(username === "admin" && password === "12345"){
        req.session.user = { 
            username: username,
            role: "admin",
        }; // session me user data store karna
        return res.json({ message: "Login successful", sessionId: req.sessionID });
    }
    return res.status(401).json({ message: "Invalid credentials" });

});

//profie (protected route)
app.get("/profile", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({ message: "Please login first to access your profile" });
    }
    res.json({ message: "Profile accessed successfully", user: req.session.user });
});

//dashboard (protected route)
app.get("/dashboard", (req, res) => {
    if(!req.session.user){
        return res.status(401).json({ message: "Unauthorized user" });
    }
    res.json({ message: `Welcome ${req.session.user.username}` });

});

//logout (destroy session)
app.get("/logout", (req,res) => {
    req.session.destroy((err) => {
        if(err){
            return res.status(500).json({ message: "Error occurred while logging out" });
        }
        res.clearCookie("connect.sid"); // session cookie ko clear karna / default cookie name "connect.sid" hota hai
        res.json({ message: "Logged out successfully" });
    });
});

// check session
app.get("/check-session", (req, res) => {
    if(req.session.user){
        return res.json({ message: "Session is active", user: req.session.user });
    }
    else{
        return res.json({ message: "No active session" });
    }
});

app.listen(3000,() => {
    console.log("Server is running on port 3000");
});