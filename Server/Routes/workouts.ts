const db = require('../utils/Database.ts');
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

router.post('/workout/create', async (req, res) => {
   let { date, notes } = req.body;

   try {
       if (!req.isAuthenticated()) {
           return res.sendStatus(403);
       }
       if (notes !== undefined) {
           await db.query(`INSERT INTO workouts
               VALUES (DEFAULT, '${date}', '${notes}', '${req.user.username}')
           `)
       } else {
           await db.query(`INSERT INTO workouts
               VALUES (DEFAULT, '${date}', NULL, '${req.user.username}')
           `)
       }

       return res.sendStatus(200);
   } catch (error) {
       console.log(error);
       return res.sendStatus(400);
   }
});

router.post('/workout/deleteOne', async (req, res) => {
    const workoutID = req.body.ID;
    try {
        if (!req.isAuthenticated()) {
            res.sendStatus(403)
        }

        await db.query(`DELETE  FROM workouts
            WHERE workoutid = '${workoutID}';
        `)
        res.sendStatus(200);

    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }
})

router.post('/workout/deleteMultiple', async (req, res) => {

    try {

        let workoutIDs = req.body.IDs.toString();
        workoutIDs = workoutIDs.replace('[', '(').replace(']', ')');

        if (!req.isAuthenticated()) {
            res.sendStatus(403);
        }

        await db.query(`DELETE FROM workouts 
            WHERE workoutid in (${workoutIDs})
        `)
        res.sendStatus(200);

    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }


})

router.post('/workout/update', async (req, res) => {
    const { date: newDate, notes: newNotes } = req.body;

    try {
        if (!req.isAuthenticated()) {
            res.sendStatus(403);
        }

        await db.query(`UPDATE workouts SET
            workoutdate = COALESCE(NULLIF('${newDate}', 'undefined'), workoutdate::text)::date,
            notes = COALESCE(NULLIF('${newNotes}', 'undefined'), notes)
            WHERE workoutid=${req.body.ID}
        `)
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }

});

module.exports = router;