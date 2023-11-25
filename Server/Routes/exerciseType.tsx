const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/exercisetype/create', async (req, res) => {
   const {pr, name, muscleGroup} = req.body;
   const username = req.user.username;
   try {
       if (!req.isAuthenticated()) {
           res.sendStatus(403);
       }

       await db.query(`INSERT INTO exercisetype 
            VALUES ('${name}', NULLIF('${pr}', 'undefined')::decimal(2), '${muscleGroup}', '${username}')
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
    console.log(newMuscleGroup);
    try {
        if (!req.isAuthenticated()) {
            res.sendStatus(403);
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

module.exports = router;