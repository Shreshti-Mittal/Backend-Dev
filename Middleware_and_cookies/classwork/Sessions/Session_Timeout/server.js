app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 } // 1 min
}));