const cookieParser = require("cookie-parser");

app.use(cookieParser());

// set language
app.get("/set-lang/:lang", (req, res) => {
  res.cookie("language", req.params.lang, { maxAge: 900000 });
  res.send("Language saved");
});

// use language
app.get("/", (req, res) => {
  const lang = req.cookies.language || "en";

  if (lang === "hi") res.send("नमस्ते");
  else res.send("Hello");
});