const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/bodyPart/create', async (req, res) => {
    const { muscleGroup: newMuscleGroup} = req.body;

    try {
        if (!req.isAuthenticated()) {
            res.sendStatus(403);
        }

        await db.query(`INSERT INTO bodypart 
            VALUES ('${newMuscleGroup}')
        `);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }

})

router.get('/bodypart/readAll', async (req, res) => {
   try {
       if (!req.isAuthenticated()) {
           res.sendStatus(403);
       }

       let muscleGroups = await db.query(`SELECT * FROM bodypart`);
       res.json(muscleGroups);
   } catch(error) {
       console.log(error);
       res.sendStatus(400);
   }
});

module.exports = router;