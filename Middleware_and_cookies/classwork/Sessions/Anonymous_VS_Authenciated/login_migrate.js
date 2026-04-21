app.post("/login", (req, res) => {
  req.session.user = { name: "user" };

  // migrate cookie cart
  if (req.cookies.cart) {
    req.session.cart = JSON.parse(req.cookies.cart);
    res.clearCookie("cart");
  }

  res.send("Logged in and cart migrated");
});