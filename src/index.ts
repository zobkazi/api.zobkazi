import express from "express";
import userData from "./userData";
import userHtmlData from "./user.html";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());


// API Endpoint to return user data
app.get("/api/user/zobkazi", (req, res) => {
  res.json(userData);
});

// html page for root

app.get('/', (req, res) => {
  res.send(`${userHtmlData}`)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;