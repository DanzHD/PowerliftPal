const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')


router.post('/sign-up', async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {

            if (err) {
                console.log(err);
            } else {
                await db.query(`INSERT INTO users 
                    VALUES ('${req.body.username}', '${hashedPassword}')`
                );
            }

            res.sendStatus(200);

        } catch (err) {
            console.error(err);

            if (err.code === "23505") {
                /* Duplicate username */
                res.sendStatus(409);
            } else {
                res.sendStatus(400);
            }

        }
    });

});


module.exports = router;

