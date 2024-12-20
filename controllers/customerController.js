const db=require("../db/queries");
const asyncHandler = require("express-async-handler");

const customer_id=1;
async function getGen(){
    
    const {rows}=await db.getGenres(customer_id);
    console.log("Genre: ",rows);
    return rows;



};

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
    const genres=await getGen();
    if(isObjectEmpty(books) && isObjectEmpty(genres)){
        res.render("index",{ message1:"No books added", message2:"No genres added" });
        
    }
    else if(isObjectEmpty(books)){
        res.render("index",{ message1:"No books added" ,genres:genres });
        
    }else if(isObjectEmpty(genres)){
        res.render("index",{books:books, message2:"No genres added" });
        
    }
    else{
        console.log(books);
        res.render("index",{ books:books,genres:genres });
    

    }
   
    return books;

    
    
});

const getStatusBooks=asyncHandler(async (req,res)=>{
    const read_stat=req.query.status;
  
    console.log(req.query);
    const books=await db.StatusBooks(customer_id,read_stat);
    const genres=await getGen();
    if(!read_stat){
        res.status(404).render("error",{message:"Status not found"});


    }
    else if(isObjectEmpty(books) && isObjectEmpty(genres)){
        res.render("index",{ message1:"No books added", message2:"No genres added" });
        
    }
    else if(isObjectEmpty(books)){
        res.render("index",{ message1:"No books added" ,genres:genres });
        
    }else if(isObjectEmpty(genres)){
        res.render("index",{books:books, message2:"No genres added" });
        
    }
    else{
        console.log(books);
        res.render("index",{ books:books,genres:genres  });
    

    }
   
    
});

const getBooksByGenre=asyncHandler(async (req,res)=>{
    const genre_name=req.query.genre;
    console.log(genre_name);
    const books=await db.BooksByGenre(customer_id,genre_name);
    const genres=await getGen();
    if(!genre_name){
        res.status(404).render("error",{message:"Genre not found"});


    }
    else if(isObjectEmpty(books) && isObjectEmpty(genres)){
        res.render("index",{ message1:"No books added", message2:"No genres added" });
        
    }
    else if(isObjectEmpty(books)){
        res.render("index",{ message1:"No books added" ,genres:genres });
        
    }else if(isObjectEmpty(genres)){
        res.render("index",{books:books, message2:"No genres added" });
        
    }
    else{ 
        console.log(books);
        res.render("index",{ books:books,genres:genres });
    

    }
    

});

const getSearchBook=asyncHandler(async (req,res)=>{
    const input=req.query.input;
    const books=await db.searchBooks(customer_id,input);
    const genres=await getGen();
    if(!input){
        res.status(404).render("error",{message:"No input error"});


    }
    else if(isObjectEmpty(books) && isObjectEmpty(genres)){
        res.render("index",{ message1:"No books added", message2:"No genres added" });
        
    }
    else if(isObjectEmpty(books)){
        res.render("index",{ message1:"No books added" ,genres:genres });
        
    }else if(isObjectEmpty(genres)){
        res.render("index",{books:books, message2:"No genres added" });
        
    }
    else{ 
        console.log(books);
        res.render("index",{ books:books,genres:genres });
    

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
    const book_id=req.params.book_id
    console.log(req.body);
  
    if(!req.body){
        res.status(404).render("error",{message:"Something went wrong with the input"});


    }
    else {
        await db.updateBook(book_id,customer_id,req.body);
        console.log("UPDATED!!");
        res.redirect("/:customer_id");
    

    }
    
});


const deletes=asyncHandler(async (req,res)=>{
    try{
        const book_id=req.query.delete;
        await db.deleteBook(customer_id,book_id);
        getAllBooks(req,res);
    }
    catch(error){
        res.render("error",{message:error})
    }
    
  
    

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