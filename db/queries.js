const pool=require("./pool");

async function loginUser(){

}

async function AllBooks(customer_id){
    const {rows}=await pool.query(`SELECT * FROM books WHERE customer_id=$1`,[customer_id]);
    console.log("All books :",rows);
    return rows;



}

async function StatusBooks(customer_id,read_stat){
    const {rows}=await pool.query(`SELECT * FROM books JOIN genre ON books.genre_id=genre.id WHERE customer_id=$1 AND read_status=$2`,[customer_id,read_stat]);
    console.log(`All These Books Have ${read_stat} Status :`,rows);
    return rows;
    


}

async function BooksByGenre(customer_id,genre) {
    const {rows}=await pool.query(`SELECT *,genre_name FROM books JOIN genre ON books.genre_id=genre.id= WHERE customer_id=$1 AND read_status=$2`,[customer_id,read_stat]);
    console.log(`All These Books Have Status :`,rows);
    return rows;
    
 
    
}

async function searchBooks(customer_id,input){
    // Search by name or author
    const {rows}=await pool.query(`SELECT * FROM books JOIN genre ON books.genre_id=genre.id WHERE customer_id=$1 AND book_name LIKE '%$2%' OR author LIKE '%$2%' `,[customer_id,input]);
    console.log(`Found Books :`,rows);
    return rows;

    
}
async function createGenre(genre_name) {
    await pool.query(`INSERT INTO genre (genre_name,book_number) VALUES ($1,$2);`,[genre_name,0]);
    console.log("BOOK DELETED!");
    
}


async function createBook(customer_id,
    {   id ,
         book_name,
         book_source,
         author,
         read_status,
         customer_id,
         genre_name ,
    })
{
    const check=await pool.query("SELECT COUNT(*) FROM GENRE WHERE genre_name=$1;",[genre_id]);
    if(check==0){
        createGenre(genre_name);


    }
    else if(check==1){

       await pool.query('INSERT INTO books ( book_name,book_source,author, read_status,customer_id,genre_name) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        [   id ,
            book_name,
            book_source,
            author,
            read_status,
            customer_id,
            genre_id 
        ]
    
    );
    await pool.query('UPDATE genre SET book_number');
   }
    console.log("BOOK INSERTED!");

}

async function updateBook(customer_id,
    {    id ,
         book_name,
         book_source,
         author,
         read_status,
         customer_id,
         genre_id ,
    })
{
    await pool.query('UPDATE books SET (book_name,book_source, author, read_status,customer_id,genre_id) ($1,$2,$3,$4,$5,$6);',
        [   id ,
            book_name,
            book_source,
            author,
            read_status,
            customer_id,
            genre_id ,
        ]
    );
    console.log("BOOK UPDATED!");

}
async function deleteBook(customer_id,book_id){
    await pool.query("DELETE FROM books WHERE id= book_id");
    console.log("BOOK DELETED!");


   
}


module.exports=[
    AllBooks,
    StatusBooks,
    BooksByGenre,
    searchBooks,
    createBook,
    updateBook,
    deleteBook,
    createGenre

]