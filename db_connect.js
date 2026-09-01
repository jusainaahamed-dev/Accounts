const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'accounts'
});

db.connect((err) => {
    if (err) {
        console.log("Connection failed:", err);
        return;
    }

    console.log("Connected to MySQL!");
});
module.exports = db ;