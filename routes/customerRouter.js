const {getAllBooks,getStatusBooks,getBooksByGenre,getSearchBook,getCreate, postCreate,getUpdate,postUpdate,deletes}=require("../controllers/customerController");

const {Router}=require("express");
const customerRouter=Router();


customerRouter.get("/",(req,res)=>{
    res.send("Hii");

  

});

customerRouter.get('/:customer_id',async(req,res)=>{

    if(req.query.status){
        console.log("Here!!");
       return await getStatusBooks(req,res);
    }
    if(req.query.genre){
        return await getBooksByGenre(req,res);

    }
    if(req.query.search){
        return await getSearchBook(req,res);

    }
    if(req.query.delete){
    
        return await deletes(req,res);
    }
    return await getAllBooks(req,res);

});

customerRouter.get("/:customer_id/",(req,res)=>{ getCreate(req,res)});


customerRouter.get("/:customer_id/create",(req,res)=>{ getCreate(req,res)});
customerRouter.post("/:customer_id/create",(req,res)=>{postCreate(req,res)});
customerRouter.get("/:customer_id/update/:book_id",(req,res)=>{getUpdate(req,res) });
customerRouter.post("/:customer_id/update/:book_id",(req,res)=>{
    console.log(req.body);
    postUpdate(req,res)
});

module.exports=customerRouter;