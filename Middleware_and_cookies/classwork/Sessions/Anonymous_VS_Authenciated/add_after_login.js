app.get("/cart/add/:item", (req, res) => {
  if (!req.session.cart) req.session.cart = [];

  req.session.cart.push(req.params.item);

  res.send("Added to session cart");
});