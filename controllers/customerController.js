const db=require("../db/queries");
const asyncHandler = require("express-async-handler");

const customer_id=1;

const isObjectEmpty=(obj)=>
{
    for(let prop in obj){
        if(obj.hasOwnProperty(prop)){
            return false;
        }
    }
    return true;
}

const getAllBooks=asyncHandler(async (req,res)=>{
    const books=await db.AllBooks(customer_id);
    if(isObjectEmpty(books)){
        res.render("index",{ message:"No books added" });
        
    }
    else{
        console.log(books);
        res.render("index",{ books:books });
    

    }
   
    return books;

    
    
});

const getStatusBooks=asyncHandler(async (req,res)=>{
    const read_stat=req.query.stat;
    const books=await db.StatusBooks(customer_id,read_stat);
    if(!read_stat){
        res.status(404).render("error",{message:"Status not found"});


    }
    else if(isObjectEmpty(books)){
        res.render("index",{ message:"No book found :(" });
        
    }
    else{
        res.render("index",{ books:books });
    

    }
   
    
});

const getBooksByGenre=asyncHandler(async (req,res)=>{
    const genre_name=req.query.genre;
    const books=await db.BooksByBooks(customer_id,genre_name);
    if(!genre){
        res.status(404).render("error",{message:"Genre not found"});


    }
    else if(isObjectEmpty(books)){
        res.render("index",{ message:"No books available for this genre" });
        
    }
    else{ 
        res.render("index",{ books:books});
    

    }
    

});

const getSearchBook=asyncHandler(async (req,res)=>{
    const input=req.query.input;
    const books=await db.searchBooks(customer_id,input);
    if(!input){
        res.status(404).render("error",{message:"No input error"});


    }
    else if(isObjectEmpty(books)){
        res.render("index",{message:"No book found :(" });
        
    }
    else{ 
        res.render("index",{ books:books});
    

    }
    

});

const getCreate=asyncHandler(async (req,res)=>{
    res.render("create");
 
});

const postCreate=asyncHandler(async (req,res)=>{
    console.log(req.body);
 
    if(!req.body){
        res.status(404).render("error",{message:"Something went wrong with the input"});


    }
    else {
        console.log(req.body);
        await db.createBook(customer_id,req.body);
        res.redirect("/:customer_id");
    

    }
     


    
});

//*"/:customer_id/update/:book_id
const getUpdate=asyncHandler(async (req,res)=>{
    const book_id=req.params.book_id;
    if(!book_id){
        res.status(404).render("error",{message:"Something went wrong"});
        


    }
    else {
        res.render("update",{book:await db.getABook(customer_id,book_id)}); //*values for input
    

    }
     

 
 
});


const postUpdate=asyncHandler(async (req,res)=>{
    console.log(req.body);
    await db.updateBook(req.body);
    if(!req.body){
        res.status(404).render("error",{message:"Something went wrong with the input"});


    }
    else {
        await db.updateBook(customer_id,req.body);
        res.redirect("/:customer_id");
    

    }
    
});


const deletes=asyncHandler(async (req,res)=>{
    const book_id=req.query.delete;
    await db.deleteBook(customer_id,book_id);
  
    

});

module.exports={
    getAllBooks,
    getStatusBooks,
    getBooksByGenre,
    getSearchBook,
    getCreate,
    postCreate,
    getUpdate,
    postUpdate,
    deletes

};