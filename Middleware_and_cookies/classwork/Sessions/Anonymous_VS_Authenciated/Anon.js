app.get("/add-to-cart/:item", (req, res) => {
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  cart.push(req.params.item);

  res.cookie("cart", JSON.stringify(cart));
  res.send("Item added");
});