require("dotenv").config();
const mssql = require("mssql");

const config = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

const pool = new mssql.ConnectionPool(config);
const db_connection = pool
    .connect()
    .then(() => {})
    .catch((err) => {
        // treat the connection error
        console.error(err);
    });

const executeQuery = async function (query) {
    await db_connection;
    try{
        let query_result = await pool.request().query(query);
        return query_result.recordset;
    }
    catch(err){
        // treat the query execution error
        console.error(err);
    }
};

const executeUpdate = async function (query) {
    await db_connection;
    try{
        let query_result = await pool.request().query(query);
        return query_result.rowsAffected[0];
    }
    catch(err){
        // treat the query execution error
        console.error(err);
    }
};

module.exports.executeQuery = executeQuery;
module.exports.executeUpdate = executeUpdate;