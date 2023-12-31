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

router.post('/createFullWorkout', async (req, res) => {
    const {exerciseSets, date, notes} = req.body;
    const username = req.user.username;
    try {

        const response = await db.query(`INSERT INTO workouts
            VALUES 
                (DEFAULT, '${date}', '${notes}', '${username}')
            RETURNING workoutID
        `)
        const workoutID = response['rows'][0]['workoutid'];

        await Promise.all(exerciseSets.map(async (exerciseSet) => {
            let exerciseName = Object.keys(exerciseSet).toString();
            let sets = Object.values(exerciseSet)[0];

            let personalRecord = (await db.query(`SELECT * FROM exercisetype 
                WHERE username='${username}' AND
                name='${exerciseName}'
            `))['rows'][0]['personalrecord'];

            // Insert the exercises
            await db.query(`INSERT INTO exercise 
                VALUES
                    (${workoutID}, '${exerciseName}', '${username}');
            `);

            // Connect the sets to the exercises
            await Promise.all(sets.map(async (set) => {
                await db.query(`INSERT INTO sets
                    VALUES
                        (${set['warmup']}, ${set['reps']}, ${set['intensity']}, '${workoutID}', '${exerciseName}', 
                            ${set['setNumber']}, ${set['weight']});
                `);

                // Update the personal record if set contains a weight higher than current personal record
                if (set['weight'] > personalRecord) {
                    await db.query(`UPDATE exercisetype 
                        SET personalrecord = ${set['weight']}
                        WHERE username = '${username}' AND
                        name = '${exerciseName}'
                    `);
                    personalRecord = set['weight'];
                }


            }));
        }));



        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});


module.exports = router;
