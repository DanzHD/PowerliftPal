const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.get('/weeklyWeightLifted', async (req, res) => {
   try {

       if (!req.isAuthenticated()) {
           return res.sendStatus(403);
       }
       const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
       let totalLifted = await db.query(`SELECT COALESCE(SUM(reps * weight), 0) AS totalWeight
            FROM sets INNER JOIN exercise 
                ON 
                    sets.exerciseName = exercise.name AND
                    sets.workoutid = exercise.workoutid
                INNER JOIN workouts ON workouts.workoutid = exercise.workoutid
            WHERE 
                workouts.username = '${req.user.username}' AND
                workouts.workoutdate >= '${sevenDaysAgo}'
       `)
       res.json(totalLifted['rows']);

   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

module.exports = router;
