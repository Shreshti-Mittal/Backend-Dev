import express from "express";

const app = express();
app.use(express.json());
let users = [
    { id: 1, email: "Shreshti@gmail.com", password: "1234", role: "Admin" },
    { id: 2, email: "Kittu@gmail.com", password: "5678", role: "User" }
];

let validTokens = [];
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const user = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    const token = "token_" + user.id;
    validTokens.push(token);

    res.json({
        message: "Login successful",
        token: token
    });
});
function authMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token || !validTokens.includes(token)) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    next();
}
app.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to Dashboard"
    });
});
app.get("/profile", authMiddleware, (req, res) => {
    res.json({
        message: "This is your profile"
    });
});
app.listen(3000, () => console.log("Server started on port 3000"));
