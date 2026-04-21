app.get("/dashboard", (req, res) => {
  res.send(`
    <h1>Dashboard</h1>
    <script>
      setTimeout(()=>{
        alert("Session expiring soon!");
      }, 50000); // 10 sec before
    </script>
  `);
});