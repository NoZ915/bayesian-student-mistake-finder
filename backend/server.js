const express = require("express");
require("dotenv").config();
const app = express();

app.get("/", (req, res) => {
    res.json({mssg: "Welcome to tha app"})
})

app.listen(process.env.PORT, () => {
    console.log("listen to port 4000!", process.env.PORT)
})