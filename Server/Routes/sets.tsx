const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/set/create', async (req, res) => {
    const {warmUp, rest, reps, intensity, notes, workoutID, exerciseName, weight} = req.body;

    try {
        if (!req.isAuthentiated()) {
            return res.sendStatus(403);
        }
        let setNumber = await db.query(`SELECT MAX(setnumber) FROM sets
            WHERE 
                workoutID=${workoutID} AND
                exerciseName='${exerciseName}'
            
        `);
        setNumber = setNumber['rows'][0]['max'] + 1;

        await db.query(`INSERT INTO sets
            VALUES 
                (${warmUp}, NULLIF('${rest}', 'undefined')::interval, ${reps}, NULLIF('${intensity}', 'undefined')::smallint,
                NULLIF('${notes}', 'undefined'), ${workoutID}, '${exerciseName}', ${setNumber}, ${weight})
        `);

        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

router.post('/set/update', async (req, res) => {
    const {warmUp, rest, reps, intensity, notes, workoutID, exerciseName, setNumber, weight} = req.body;
    try {
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        await db.query(`UPDATE sets 
            SET
                warmup = COALESCE(NULLIF('${warmUp}', 'undefined'), warmup::text)::boolean,
                rest = COALESCE(NULLIF('${rest}', 'undefined'), rest::text)::interval,
                reps = COALESCE(NULLIF('${reps}', 'undefined'), reps::text)::smallint,
                intensity = COALESCE(NULLIF('${intensity}', 'undefined'), intensity::text)::smallint,
                notes = COALESCE(NULLIF('${notes}', 'undefined'), notes),
                weight = COALESCE(NULLIF('${weight}', 'undefined'), weight::text)::decimal(2)
            WHERE 
                workoutid = ${workoutID} AND
                exercisename = '${exerciseName}' AND
                setNumber = '${setNumber}'
        `)
        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

router.post('/set/delete', async (req, res) => {
    const {workoutID, exerciseName, setNumber} = req.body;

    try {
        if (!req.isAuthenticated()) {
            return res.sendStatus(403);
        }

        await db.query(`
            DELETE FROM sets
            WHERE
                workoutid = ${workoutID} AND
                exercisename = '${exerciseName}' AND
                setnumber = ${setNumber};
                
            UPDATE sets
            SET 
                setnumber = -(setnumber - 1)
            WHERE 
                setnumber >= ${setNumber};
                
            UPDATE sets
            SET 
                setnumber = -setnumber 
            WHERE
                setnumber <= -${setNumber};
            
        `);



        res.sendStatus(200);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

/*
    Gets 1 set from a workout's exercise
 */
router.get('/set/:workoutID/:exerciseName/:setNumber', async (req, res) => {
    const {workoutID, exerciseName, setNumber} = req.params;

    try {
        if (!req.isAuthentiated()) {
            return res.sendStatus(403);
        }

        let set = await db.query(`SELECT * FROM sets
            WHERE 
                workoutid = ${workoutID} AND
                exercisename = '${exerciseName}' AND
                setNumber = ${setNumber}
        `)

        res.json(set['rows'][0]);

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

/*
    Gets all sets from a workout
 */
router.get('/sets/:workoutID', async (req, res) => {
    const { workoutID, exerciseName } = req.params;

    try {
        if (!req.isAuthenticated()) {

            return res.sendStatus(403);
        }

        let sets = await db.query(`SELECT * FROM sets
            WHERE 
                workoutid = ${workoutID}
        `);
        res.json(sets['rows']);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

module.exports = router;