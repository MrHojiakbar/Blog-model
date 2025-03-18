const pool = require("../config/db.config");


async function create_tables() {
    try {
        pool.query(`
            CREATE TABLE IF NOT EXISTS messages(
                id SERIAL PRIMARY KEY,
                content TEXT NOT NULL
            )
            `)
            return "Database da tabellar yaratildi"
    } catch (error) {
        console.log(error);
        throw new Error('Jadval yaratishda xatolik => ',error);
    }
}
module.exports=create_tables