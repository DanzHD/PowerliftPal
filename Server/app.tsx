const app = require('express')();
const { Client } = require('pg');
require('dotenv').config();


const client = new Client({
    user: process.env.USER,
    host: process.env.HOST, 
    password: process.env.PASSWORD, 
    port: process.env.PORT,
    connectionString: process.env.DATABASE_URL, 
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect(); 

const PORT = process.env.APP_PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
