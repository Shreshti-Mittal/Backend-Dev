import express from "express";

const app = express();
app.use(express.json());

const credentials = [
  { email: "aman@gmail.com", password: "Amannnnn" },
  { email: "yash@gmail.com", password: "Yash1234" },
];

function isValidPassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@])[A-Za-z0-9@]{8,}$/;
  return regex.test(password);
}

app.post("/auth/register", (req, res) => {
  const { email, password } = req.body;

  const existingUser = credentials.find(
    (cred) => cred.email === email
  );
  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  if (!isValidPassword(password)) {
    return res.status(400).send(
      "Password must contain uppercase, lowercase, number, and be at least 8 characters"
    );
  }

  credentials.push({ email, password });
  res.send("Registered Successfully");
});

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = credentials.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (!user) {
    return res.status(401).send("Invalid Credentials");
  }

  res.send({ message: "Login Successful", user });
});

app.listen(8000, () => console.log("Server Started on port 8000"));
