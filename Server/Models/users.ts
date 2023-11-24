async function createUserTable({ client }) {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS users (
            username VARCHAR PRIMARY KEY UNIQUE NOT NULL, 
            password VARCHAR NOT NULL
        );`);
        
        
    } catch(err) {
        console.log(err);
    }
}

module.exports = {createUserTable};