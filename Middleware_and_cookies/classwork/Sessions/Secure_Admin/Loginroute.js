app.post("/login", (req, res) => {
  const { username } = req.body;

  // fake roles
  const role = username === "admin" ? "admin" : "user";

  req.session.user = { username, role };

  res.send("Logged in");
});