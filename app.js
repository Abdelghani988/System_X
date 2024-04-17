const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const allRouters = require("./Router/allRouters");
const addUser = require("./Router/addUser");
const methodOverride = require("method-override"); //For used put request
app.use(methodOverride("_method"));

//Auto refresh
app.use(express.static("public"));
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
    liveReloadServer.refresh("/");
    }, 100);
});
// Connection to server
mongoose
    .connect(
        "mongodb+srv://mokhtarstory1:Q7JjL6uUM2Xaq4Ii@mekha.k67c9zy.mongodb.net/all-data"
    )
    .then(() => {
        app.listen(port, () => {
        console.log(`http://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

app.use(allRouters, addUser);
