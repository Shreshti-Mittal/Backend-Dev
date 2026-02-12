// put: we update the data old password -> new password -> confirm password
import express from "express";

const app = express();
app.use(express.json());

let credentials = [
    { email: "Shreshti@gmail.com", password: "123" },
    { email: "Aditya@gmail.com", password: "1234" },
];

// get data
app.get("/auth/users", (req, res) => {
    res.json({ message: "User Fetch successfully", credentials });
});

// Reset password route
app.put("/auth/reset", (req, res) => {
    const { email, password, newpassword, confirmPassword } = req.body;

    const user = credentials.find(
        (cred) => cred.email === email && cred.password === password
    );

    if (!user) {
        return res.status(400).json({ message: "Invalid Email or password" });
    }

    user.password = newpassword;
    res.json({ message: "password updated successfully", user });
});

// forgot password route
app.put("/auth/forgot", (req, res) => {
    const { email, newpassword } = req.body;

    const user = credentials.find((cred) => cred.email === email);

    if (!user) {
        return res.status(400).json({ message: "email not found" });
    }

    user.password = newpassword;
    res.json({ message: "password reset successfully", user });
});

app.listen(8000, () => console.log("Server Started on port 8000"));
