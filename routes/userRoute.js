const {}=require("../controllers/userController");

const {Router}=require("express");
const userRouter=Router();

userRouter.get("/",console.log("Home Page Hello"));

userRouter.get("/:customer_name",console.log("Display All books "));
userRouter.get("/:customer_name/",console.log("Display All books broo"));