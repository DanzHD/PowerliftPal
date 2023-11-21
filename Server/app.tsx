const app = require('express')();
require('dotenv').config();

let PORT = process.env.APP_PORT || 5000; 


app.listen(PORT, (err) => {
    console.log(`Server is running on port ${PORT}`);
});
