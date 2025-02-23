import app from "./app";



app.get("/", (req, res) => {
  res.send("Hello World!");
})


export default app;






const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
