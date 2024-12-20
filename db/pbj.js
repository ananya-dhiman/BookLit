const {Client} =require("pg");

const SQL=`
CREATE TABLE IF NOT EXISTS books(
         id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
         book_name VARCHAR(100),
         book_source VARCHAR(10),
         author VARCHAR(100),
         read_status VARCHAR(10) NOT NULL,
         customer_id INTEGER NOT NULL,
         genre_id INTEGER NOT NULL,
         add_date DATE,
         CHECK (read_status IN ('UNREAD','READ','READING'))


);

CREATE TABLE IF NOT EXISTS genre(
         genre_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
         genre_name VARCHAR(100),
         book_number INTEGER

);
CREATE TABLE IF NOT EXISTS customer(
         customer_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
         customer_name VARCHAR(100),
         customer_pass VARCHAR(10)
         

);
`
async function main(){
    console.log("Populate database....");
    const client=new Client({
        host: "localhost",
        user: "postgres",
        database: "booklit",
        password: "postgres",
        port: 5432 

    });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();