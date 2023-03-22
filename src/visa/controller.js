const pool = require('../../db');

const getUsers = (req,res) => {
    console.log('getting users')
    pool.query("SELECT * FROM visa", (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
        const data = results.rows;
        // console.log(data);
    })
}

module.exports = {
    getUsers, 
};