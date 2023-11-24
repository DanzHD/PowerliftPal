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

module.exports = router;