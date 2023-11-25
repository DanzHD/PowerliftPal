const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/exercise/create', async (req, res) => {
    const { workoutid, name, intensity } = req.body;
    const username = req.user.username;

    try {
        if (!req.isAuthenticated()) {
            res.sendStatus(403);
        }

        await db.query(`INSERT INTO exercise
            VALUES (${workoutid}, '${name}', ${intensity}, '${username}')
        `)
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

router.post('/exercise/delete', async (req, res) => {
   const {workoutid, name} = req.body;
   const username = req.user.username;

   try {
       if (!req.isAuthenticated()) {
           res.sendStatus(403);
       }

       await db.query(`DELETE FROM exercise
           WHERE 
           workoutid = ${workoutid} AND
           name = '${name}' AND
           username = '${username}'
       `)
       res.sendStatus(200);

   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

router.post('/exercise/update', async (req, res) => {
    const {workoutid, name, intensity} = req.body;
    const username = req.user.username;

    try {
        if (!req.isAuthenticated()) {
            res.sendStatus(403);
        }

        await db.query(`UPDATE exercise SET
            intensity = COALESCE(NULLIF('${intensity}', 'undefined'), '${intensity}')::smallint
            WHERE 
            workoutid = ${workoutid} AND
            name = '${name}' AND 
            username = '${username}'
        `);
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

module.exports = router;