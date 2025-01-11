const {Pool}=require("pg");
require('dotenv').config();
try{
    module.exports=new Pool({
        connectionString: process.env.DATABASE_URL
    });
}
catch(e){
    console.log("Error: ",e);

}