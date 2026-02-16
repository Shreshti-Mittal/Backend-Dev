import express from "express";

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
let users = [
    { id: 1, name: "Aditya", email: "Aditya@gmail.com", role: "Admin" },
    { id: 2, name: "Shreshti", email: "shreshti@gmail.com", role: "User" }
];
function validateUser(req, res, next) {
    const { name, email, role } = req.body;

    if (!name || !email || !role) {
        return res.status(400).json({
            message: "Name, email and role are required"
        });
    }

    next();
}
app.get("/users", (req, res) => {
    res.json(users);
});

app.get("/users/:id", (req, res) => {
    const id = req.params.id;
    const user = users.find((u) => u.id == id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
});
app.post("/users", validateUser, (req, res) => {
    const { name, email, role } = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        email,
        role
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});
app.put("/users/:id", validateUser, (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((u) => u.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users[index] = {
        id: users[index].id,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    res.json({
        message: "User updated successfully",
        user: users[index]
    });
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const index = users.findIndex((u) => u.id == id);

    if (index === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = users.splice(index, 1);
    res.json({
        message: "User deleted successfully",
        user: deletedUser[0]
    });
});
app.listen(3000, () => console.log("Server started on port 3000"));
