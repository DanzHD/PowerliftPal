const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/exercise/create', async (req, res) => {

    try {
        const { workoutid, name, intensity } = req.body;
        const username = req.user.username;
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
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

   try {
       const {workoutid, name} = req.body;
       const username = req.user.username;
       if (!req.isAuthenticated()) {
           return res.sendStatus(403);
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

    try {
        const {workoutid, name, intensity} = req.body;
        const username = req.user.username;
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        await db.query(`UPDATE exercise 
            SET
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

router.get('/exercise/:id', async (req, res) => {

    try {
        const workoutID = req.params.id;
        const username = req.user.username;

        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        const exercises = await db.query(`SELECT * FROM exercise
            WHERE
                workoutid = ${workoutID} AND 
                username = '${username}'
        `)
        res.json(exercises['rows']);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

module.exports = router;