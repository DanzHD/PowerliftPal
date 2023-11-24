const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();

router.post('/bodyPart/create', async (req, res) => {
    const { muscleGroup: newMuscleGroup} = req.body;

    try {
        await db.query(`INSERT INTO bodypart 
            VALUES ('${newMuscleGroup}')
        `);
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        res.sendStatus(400);
    }

})

module.exports = router;