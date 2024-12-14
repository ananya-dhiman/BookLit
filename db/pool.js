const {Pool}=require("pg");
try{
    module.exports=new Pool({
    host: "localhost",
    user: "postgres",
    database: "booklit",
    password: "postgres",
    port: 5432 
    });
}
catch(e){
    console.log("Error: ",e);

}