
app.get("/users", (req, res) => {
    const name = req.query.name;

    if (name) {
        const filteredUsers = users.filter((u) =>
            u.name.toLowerCase().includes(name.toLowerCase())
        );
        return res.json(filteredUsers);
    }

    res.json(users);
});
