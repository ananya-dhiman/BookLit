const pool=require("./pool");
const { format } = require('date-fns');

function addDate(){
    const today = new Date();
    const formattedDate = format(today, 'yyyy-MM-dd');
    return formattedDate;
}

async function loginUser(){

}


async function AllBooks(customer_id){
    const {rows}=await pool.query(`SELECT (book_name,book_source,author,read_status,genre_name,added_date) FROM books JOIN genre ON books.genre_id=genre.id WHERE customer_id=$1`,[customer_id]);
    console.log("All books :",rows);
    return rows;

}
async function getABook(customer_id,book_id){
    const {rows}=await pool.query(`SELECT (book_name,book_source,author,read_status,genre_name) FROM books JOIN genre ON books.genre_id=genre.id WHERE customer_id=$1`,[customer_id]);
    console.log("Got Book :",rows);
    return rows;

}


async function StatusBooks(customer_id,read_stat){
    const {rows}=await pool.query(`SELECT * FROM books JOIN genre ON books.genre_id=genre.id WHERE customer_id=$1 AND read_status=$2`,[customer_id,read_stat]);
    console.log(`All These Books Have ${read_stat} Status :`,rows);
    return rows;
    


}

async function BooksByGenre(customer_id,genre_name) {
    //!Check query
    const {rows}=await pool.query(`SELECT (book_name,book_source,author,read_status,genre_name,add_date) FROM books JOIN genre ON books.genre_id=genre.id= WHERE customer_id=$1 AND =$2`,[customer_id,genre_name]);
    console.log(`All These Books Have Status :`,rows);
    return rows;
    
 
    
}

async function searchBooks(customer_id,input){
    // Search by name or author
    const {rows}=await pool.query(`SELECT (book_name,book_source,author,read_status,genre_name,add_date) FROM books JOIN genre ON books.genre_id=genre.id WHERE customer_id=$1 AND book_name LIKE '%$2%' OR author LIKE '%$2%' `,[customer_id,input]);
    console.log(`Found Books :`,rows);
    return rows;

    
}
async function createGenre(genre_name) {
    genre_name=genre_name.toLowerCase();
    await pool.query(`INSERT INTO genre (genre_name,book_number) VALUES ($1,$2);`,[genre_name,0]);
    console.log("BOOK DELETED!");
    
}


async function createBook(customer_id,
    {   
         book_name,
         book_source,
         author,
         read_status,
         customer_id,
         genre_name 
    })
{
    const add_date=addDate();
    const check=await pool.query("SELECT COUNT(*) FROM GENRE WHERE genre_name=$1;",[genre_name]);
    if(check==0){
        createGenre(genre_name);


    }

        const genre_id=await pool.query("SELECT id FROM genre WHERE LOWER(genre_name)=LOWER($1)",[genre_name]);


       await pool.query('INSERT INTO books ( book_name,book_source,author, read_status,customer_id,genre_id,add_date) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        [  
            book_name,
            book_source,
            author,
            read_status,
            customer_id,
            genre_id,
            add_date
        ]
    
    );
    await pool.query('UPDATE genre SET book_number=book_number+1 WHERE id=$1',[genre_id]);
   
    console.log("BOOK INSERTED!");

}

async function updateBook(customer_id,
    {    id ,
         book_name,
         book_source,
         author,
         read_status,
         customer_id,
         
    })
{
    await pool.query('UPDATE books SET (book_name,book_source, author, read_status,customer_id) ($2,$3,$4,$5,$6); WHERE id="$1',
        [   
            id ,
            book_name,
            book_source,
            author,
            read_status,
            customer_id
            
        ]
    );
    console.log("BOOK UPDATED!");

}
async function deleteBook(customer_id,book_id){
    await pool.query("DELETE FROM books WHERE id = $1",[book_id]);
    const genre_id=await pool.query("SELECT genre_id FROM books WHERE id=[$1]",[book_id]);
    await pool.query("UPDATE genre SET book_number=book_number-1 WHERE id=$1",[genre_id]);//UPDATE book_number

    console.log("BOOK DELETED!");


   
}


module.exports=[
    AllBooks,
    getABook,
    StatusBooks,
    BooksByGenre,
    searchBooks,
    createBook,
    updateBook,
    deleteBook,
    createGenre

]