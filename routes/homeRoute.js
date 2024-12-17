const {}=require("../controllers/userController");

const {Router}=require("express");
const homeRouter=Router();

homeRouter.get("/",login());
