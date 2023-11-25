const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/set/create', async (req, res) => {
    const {warmUp, rest, reps, intensity, notes, workoutID, exerciseName} = req.body;

    try {
        let setNumber = await db.query(`SELECT MAX(setnumber) FROM sets
            WHERE 
                workoutID=${workoutID} AND
                exerciseName='${exerciseName}'
            
        `);
        setNumber = setNumber['rows'][0]['max'] + 1;

        await db.query(`INSERT INTO sets
            VALUES (${warmUp}, NULLIF('${rest}', 'undefined')::interval, ${reps}, NULLIF('${intensity}', 'undefined')::smallint,
            NULLIF('${notes}', 'undefined'), ${workoutID}, '${exerciseName}', ${setNumber})
        `);

        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

router.post('/set/update', async (req, res) => {

});

router.post('/set/delete', async (req, res) => {

});

/*
    Gets 1 set from a workout's exercise
 */
router.get('/set/:workoutid/:exercisename/:setnumber', async (req, res) => {

})

/*
    Gets all sets from a workout's exercise
 */
router.get('/set/:workoutid/:exercisename', async (req, res) => {

})

module.exports = router;