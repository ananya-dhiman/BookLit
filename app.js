const express=require('express');
const app=express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const customerRouter=require("./routes/customerRouter");
app.use(customerRouter);

const PORT=8080;
app.listen(PORT,()=>{
    console.log('Express app at 8080');
});