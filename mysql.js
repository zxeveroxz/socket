const res = require('express/lib/response');
const mysql = require('mysql2');
const mysql2 = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'BD_SEDAPAL',
  charset:'utf8mb4'
}

const connection = mysql.createConnection(config);

let consulta_aviso = async (NUM_AVISO) => {

  const pool = mysql2.createPool(config);
  try {
   
    let sql = `select * from tbl_avisos where NUM_AVISO=?`;
    let valores = [NUM_AVISO];
    let [rows] =   await pool.query(sql, valores);

   // console.log("Aviso encontrado ", rows);
  } catch (err) {
    console.error("Error en realizar el query:", err);
  }
  pool.end();

}

module.exports = { connection, consulta_aviso };