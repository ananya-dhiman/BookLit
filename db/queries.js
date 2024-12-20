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
    const {rows}=await pool.query(`SELECT 
        books.id AS book_id,
        book_name,
        book_source,
        author,
        read_status,
        genre_name,
        add_date
        FROM books JOIN genre ON books.genre_id=genre.genre_id WHERE customer_id=$1`,[customer_id]);
    console.log("All books :",rows);
    return rows;

}
async function getABook(customer_id,book_id){
    const {rows}=await pool.query(`SELECT 
        books.id AS book_id,
        book_name,
        book_source,
        author,
        read_status,
        genre_name,
        add_date FROM books JOIN genre ON books.genre_id=genre.genre_id WHERE customer_id=$1 AND id=$2`,[customer_id,book_id]);
    console.log("Got Book :",rows);
    return rows;

}


async function StatusBooks(customer_id,read_stat){
    console.log("In queries");
    console.log(read_stat);
    const {rows}=await pool.query(`SELECT 
        books.id AS book_id,
        book_name,
        book_source,
        author,
        read_status,
        genre_name,
        add_date FROM books JOIN genre ON books.genre_id=genre.genre_id WHERE customer_id=$1 AND read_status=$2`,[customer_id,read_stat]);
    console.log(`All These Books Have ${read_stat} Status :`,rows);
    return rows;
    


}

async function BooksByGenre(customer_id,genre_name) {
    //!Check query
    
    const {rows}=await pool.query(`SELECT 
        books.id AS book_id,
        book_name,
        book_source,
        author,
        read_status,
        genre_name,
        add_date FROM books JOIN genre ON books.genre_id=genre.genre_id WHERE customer_id=$1 AND genre_name=$2`,[customer_id,genre_name]);
    console.log(`All These Books Have ${genre_name} :`,rows);
    return rows;
    
 
    
}

async function searchBooks(customer_id,input){
    // Search by name or author
    const {rows}=await pool.query(`SELECT
        books.id AS book_id,
        book_name,
        book_source,
        author,
        read_status,
        genre_name,
        add_date FROM books JOIN genre ON books.genre_id=genre.genre_id WHERE customer_id=$1 AND book_name ILIKE '%${input}%' OR author ILIKE   '%${input}%'`,[customer_id]);
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
         genre_name 
    })
{
    const add_date=addDate();
    genre_name=genre_name.toUpperCase();
    const check=await pool.query("SELECT COUNT(*) FROM GENRE WHERE UPPER(genre_name)=$1;",[genre_name]);
    console.log(check.rows[0].count);
    if(parseInt(check.rows[0].count)==0){
        createGenre(genre_name);


    }

        const genre_id_table=await pool.query("SELECT genre_id FROM genre WHERE LOWER(genre_name)=LOWER($1)",[genre_name]);
       
        const genre_id=genre_id_table.rows[0].genre_id;

       await pool.query('INSERT INTO books ( book_name,book_source,author, read_status,customer_id,genre_id,add_date) VALUES ($1,$2,$3,$4,$5,$6,$7);',
        [  
            book_name,
            book_source,
            author,
            read_status.toUpperCase(),
            customer_id,
            genre_id,
            add_date
        ]
    
    );
    await pool.query('UPDATE genre SET book_number=book_number+1 WHERE genre_id=$1',[genre_id]);
   
    console.log("BOOK INSERTED!");

}

async function updateBook(book_id,customer_id,
    {    
         book_name,
         book_source,
         author,
         read_status,
         
        
         
    })
{
    console.log(book_name);
    await pool.query('UPDATE books SET book_name=$2,book_source=$3, author=$4, read_status=UPPER($5), customer_id=$6 WHERE id=$1;',
        [   
            book_id,
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
    
    const {rows}=await pool.query("SELECT genre_id FROM books WHERE id=$1 AND customer_id=$2",[book_id,customer_id]);
    console.log(rows);
    const genre_id=rows[0].genre_id;
    
    await pool.query("UPDATE genre SET book_number=book_number-1 WHERE genre_id=$1",[genre_id]);//UPDATE book_number
    await pool.query("DELETE FROM books WHERE books.id=$1;",[book_id]);
    console.log("BOOK DELETED!");



   
}
//* When another user adds a genre it shouldnt be visible for some other user in the sidedrawer thing-Done

async function getGenres(customer_id){
    const genre_for_user=await pool.query("SELECT DISTINCT genre_name,book_number FROM books JOIN genre ON books.genre_id=genre.genre_id  WHERE books.customer_id=$1",[customer_id]);
    return genre_for_user;



   
}


module.exports={
    AllBooks,
    getABook,
    StatusBooks,
    BooksByGenre,
    searchBooks,
    createBook,
    updateBook,
    deleteBook,
    createGenre,
    getGenres

}