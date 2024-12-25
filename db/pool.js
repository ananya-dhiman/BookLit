const {Pool}=require("pg");
try{
    module.exports=new Pool({
        connectionString: process.env.NEON
    });
}
catch(e){
    console.log("Error: ",e);

}