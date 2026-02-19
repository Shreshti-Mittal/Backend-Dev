const express = require('express');
const fs = require("fs");
const users = require('./MOCK_DATA.json');
const app = express();
app.use(express.urlencoded({ extended: false }));

app.get('/users', (req, res) => {
    const html = `
    <ul>
        ${users.map(user => `<li>${user.first_name} ${user.last_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

app.get('/api/users', (req, res) => {
    return res.json(users);
});

app.patch('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const { first_name, last_name, email, gender, job_title } = req.body;
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (gender) user.gender = gender;
    if (job_title) user.job_title = job_title;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
        res.json({
            msg: "User updated successfully",
            user: user,
        })
    });
});

app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index == -1) return res.status(404).json({ error: 'User not found' });

    const deletedUser = users.splice(index, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
        res.json({
            msg: "User Deleted successfully",
            deletedUser: deletedUser[0],
        })
    });
});

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
});

app.post('/api/users', (req, res) => {
    const { first_name, last_name, email, gender, job_title } = req.body;
    const newUser = {
        id: users.length + 1,
        first_name,
        last_name,
        email,
        gender,
        job_title,
    };
    users.push(newUser);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
        res.status(201).json({
            msg: "Users created successfully",
            user: newUser,
        })
    })
});

app.listen(8000, () => console.log('Server started'));