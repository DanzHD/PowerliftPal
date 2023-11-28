const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

router.post('/sign-up', async (req, res) => {
    if (req.body.username.length < 1 || !req.body.username) {
        return res.sendStatus(422);
    }
    if (req.body.password.length < 8 || !req.body.password) {
        return res.sendStatus(422);
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {

            if (err) {
                console.log(err);
            } else {
                await db.query(`INSERT INTO users 
                    VALUES 
                        ('${req.body.username}', '${hashedPassword}')`
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

router.get('/username', (req, res) => {

    if (req.user) {

        res.json({username: req.user.username});
    } else {
        res.json({username: false})
    }
});

module.exports = router;

