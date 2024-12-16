const [ getAllBooks,getStatusBooks,getBooksByGenre,getSearchBook,getCreate, postCreate,getUpdate,postUpdate,deletes,]=require("../controllers/customerController");

const {Router}=require("express");
const customerRouter=Router();

customerRouter.get("/:customer_id",async(req,res)=>{

    if(req.query.status){
       await getStatusBooks();
    }
    if(req.query.genre){
        await getBooksByGenre();

    }
    if(req.query.search){
        await getSearchBook();

    }
    await getAllBooks() 

});

customerRouter.get("/:customer_id/create",(req,res)=>{ getCreate()});
customerRouter.post("/:customer_id/create",(req,res)=>{postCreate()});
customerRouter.get("/:customer_id/update",(req,res)=>{getUpdate() });
customerRouter.post("/:customer_id/update",(req,res)=>{postUpdate()});
