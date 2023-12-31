const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/exercisetype/create', async (req, res) => {
   const {personalRecord, exerciseName, muscleGroup} = req.body;
   const username = req.user.username;
   try {
       if (!req.isAuthenticated()) {
           return res.sendStatus(403);
       }

       await db.query(`INSERT INTO exercisetype 
            VALUES ('${exerciseName}', NULLIF('${personalRecord}', 'undefined')::numeric(7, 2), '${muscleGroup}', '${username}')
        `);
       res.sendStatus(200);
   } catch (error) {
       console.log(error);
       res.sendStatus(400);
   }
});

router.post('/exercisetype/update', async (req, res) => {
    const {pr: newPr, newName, oldName, muscleGroup: newMuscleGroup} = req.body;
    const username = req.user.username;

    try {
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        await db.query(`UPDATE exercisetype 
            SET 
                name = COALESCE(NULLIF('${newName}', 'undefined'), name),
                personalrecord = COALESCE(NULLIF('${newPr}', 'undefined'), personalrecord::text)::decimal(2),
                musclegroup = COALESCE(NULLIF('${newMuscleGroup}', 'undefined'), musclegroup)
            WHERE
                username = '${username}' AND
                name = '${oldName}'
        `)
        res.sendStatus(200);

    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }

})

router.post('/exercisetype/delete', async (req, res) => {
   const { name } = req.body;
   const username = req.user.username;

   try {
       if (!req.isAuthenticated()) {
           return res.sendStatus(403);
       }

       await db.query(`DELETE FROM exercisetype
            WHERE 
                name='${name}' AND username='${username}'
       `)
       res.sendStatus(200);
   } catch(error) {
       console.log(error);
       res.sendStatus(400);
   }
});

router.get('/exercisetype/readAll', async (req, res) => {
    let username = req.user.username;

    try {
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        let exerciseTypes = await db.query(`
            SELECT 
                exercisetype.name, exercisetype.musclegroup, COALESCE(COUNT(sets.setnumber), 0) AS Totalsets, 
                    COALESCE(SUM(sets.reps), 0) AS Totalreps, COALESCE(SUM(reps * weight), 0) AS totalWeight, 
                    exercisetype.username, COALESCE(personalrecord, 0) AS personalrecord
            FROM 
                exercisetype LEFT JOIN exercise
                ON 
                    exercisetype.name = exercise.name AND
                    exercisetype.username = exercise.username
                LEFT JOIN sets 
                ON 
                    sets.exercisename = exercisetype.name AND sets.workoutid = exercise.workoutid
            WHERE
                exercisetype.username = '${username}'
            GROUP BY 
                exercisetype.name, 
                musclegroup,
                personalrecord,
                exercisetype.username
            HAVING
                exercisetype.username = '${username}'
            ORDER BY exercisetype.name ASC

        `)
        res.json(exerciseTypes['rows']);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
});

router.get(`/exercisetype/:muscleGroup`, async (req, res) => {
    let username = req.user.username;

    try {
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        let exercises = await db.query(`SELECT * FROM exercisetype
            WHERE 
                musclegroup = '${req.params.muscleGroup}' AND
                username = '${username}'
        `);
        res.json(exercises['rows']);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
})

module.exports = router;