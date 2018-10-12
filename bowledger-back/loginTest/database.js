//postgreSQL
const {Client} = require('pg');
var config = require("./pgconfig.json");
var pgconfig = config.pg;

pgconfig = {
    "host": process.env.DATABASE_HOST         || pgconfig.host,
    "port": process.env.DATABASE_PORT         || pgconfig.port,
    "database": process.env.DATABASE_DATABASE || pgconfig.database,
    "username": process.env.DATABASE_USERNAME || pgconfig.username,
    "password": process.env.DATABASE_PASSWORD     || pgconfig.password

}

const connectionString =
    "postgresql://" +
    pgconfig.username +
    ":" +
    pgconfig.password +
    "@" +
    pgconfig.host +
    ":" +
    pgconfig.port +
    "/" +
    pgconfig.database;


const client = new Client(
    {connectionString: connectionString}
);

//데이터베이스 연결
function connectionDB(){
    
    client.connect((err,res) =>{
        console.log('connect start');
        if(err){
            console.log('connection false');
            setInterval(function(){
                connectionDB()
            },500);
        } else {
            console.log('connection success');  
                             
        }
    });
};

//데이터베이스 연결 중단
function closeConnectionDB(){

    client.end((err,res)=>{
        console.log('closeConnection start');
        if (err){
            console.log('closeConnection false');
            setInterval(function(){
                closeConnectionDB()
            },500);
        } else {
            console.log('closeConnection success');
        }
    });
};

//sql function
function sql(sql_query,callback){

    
    client.query(sql_query,(err,result)=>{
        
        if(err){
            console.log(err);                               
            callback(null,result);                               
        } else {            
            callback(null,result); 
                                                   
        }
    });
};

module.exports.connectionDB = connectionDB;
module.exports.closeConnectionDB = closeConnectionDB;
module.exports.sql = sql;