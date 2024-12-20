require('dotenv').config();

const express=require('express');
const app=express();

const path = require("node:path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.locals.message1 = null;
    res.locals.message2 = null; // Default to null
    res.locals.customer_id=1; //User 1
    next();
});
const customerRouter=require("./routes/customerRouter");
app.use(customerRouter);

const PORT=8080;
app.listen(PORT,()=>{
    console.log('Express app at 8080');
});