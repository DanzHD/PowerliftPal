const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.get('/workout/:id', async (req, res) => {
   console.log(req.params.id);
   try {
       if (!req.isAuthenticated()) {
           return res.sendStatus(403);
       }

       let workouts = await db.query(`SELECT * FROM workouts
            WHERE username='${req.user.username}'
            AND workoutid='${req.params.id}'
       `);
       console.log(workouts.rows[0]);
       return res.json(workouts['rows'][0]);


   } catch(error) {
       console.log(error);
       res.sendStatus(400);
   }
});

router.get('/allworkouts', async (req, res) => {
    try {
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        let workouts = await db.query(`SELECT * FROM workouts
            WHERE username='${req.user.username}'
        `)
        return res.json(workouts['rows']);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});



module.exports = router;