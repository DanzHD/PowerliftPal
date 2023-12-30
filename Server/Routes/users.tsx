const db = require('../utils/Database.tsx');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

router.post('/sign-up', async (req, res) => {
    const MINIMUM_PASSWORD_LENGTH = 8;
    const MINIMUM_USERNAME_LENGTH = 1;

    if (req.body.username.length < MINIMUM_USERNAME_LENGTH || !req.body.username) {
        return res.sendStatus(422);
    }
    if (req.body.password.length < MINIMUM_PASSWORD_LENGTH || !req.body.password) {
        return res.sendStatus(422);
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        try {

            if (err) {
                console.log(err);
            } else {
                try {


                    await db.query('BEGIN');

                    await db.query(`INSERT INTO users 
                    VALUES 
                        ('${req.body.username}', '${hashedPassword}')`
                    );

                    await db.query(`INSERT INTO exercisetype
                        VALUES
                        ('Arnold Press', 0, 'Shoulder', '${req.body.username}'),
                        ('Barbell Upright Row', 0, 'Shoulder', '${req.body.username}'),
                        ('Cable Front Raise', 0, 'Shoulder', '${req.body.username}'),
                        ('Cable Lateral Raise', 0, 'Shoulder', '${req.body.username}'),
                        ('Cable Rear Delt Fly', 0, 'Shoulder', '${req.body.username}'),
                        ('Cable Shoulder Press', 0, 'Shoulder', '${req.body.username}'),
                        ('Dumbbell Front Raise', 0, 'Shoulder', '${req.body.username}'),
                        ('Dumbbell Lateral Raise', 0, 'Shoulder', '${req.body.username}'),
                        ('Dumbbell Rear Delt Fly', 0, 'Shoulder', '${req.body.username}'),
                        ('Dumbbell Shoulder Press', 0, 'Shoulder', '${req.body.username}'),
                        ('Face Pull', 0, 'Shoulder', '${req.body.username}'),
                        ('Bar Pullover', 0, 'Back', '${req.body.username}'),
                        ('Barbell Incline Row', 0, 'Back', '${req.body.username}'),
                        ('Cable Row', 0, 'Back', '${req.body.username}'),
                        ('Chin Up', 0, 'Back', '${req.body.username}'),
                        ('Dumbbell Row', 0, 'Back', '${req.body.username}'),
                        ('Hyperextension', 0, 'Back', '${req.body.username}'),
                        ('Pendlay Row', 0, 'Back', '${req.body.username}'),
                        ('Pull Up', 0, 'Back', '${req.body.username}'),
                        ('Barbell Bench Press', 0, 'Chest', '${req.body.username}'),
                        ('Cable Chest Press', 0, 'Chest', '${req.body.username}'),
                        ('Cable Fly', 0, 'Chest', '${req.body.username}'),
                        ('Close Grip Bench Press', 0, 'Chest', '${req.body.username}'),
                        ('Decline Dumbbell Press', 0, 'Chest', '${req.body.username}'),
                        ('Dumbbell Bench Press', 0, 'Chest', '${req.body.username}'),
                        ('Incline Bench Press', 0, 'Chest', '${req.body.username}'),
                        ('Push up', 0, 'Chest', '${req.body.username}'),
                        ('Bar Cable Curl', 0, 'Biceps', '${req.body.username}'),
                        ('Barbell Bicep Curl', 0, 'Biceps', '${req.body.username}'),
                        ('Dumbbell Bicep Curl', 0, 'Biceps', '${req.body.username}'),
                        ('EZ Bar Curl', 0, 'Biceps', '${req.body.username}'),
                        ('Barbell Skullcrusher', 0, 'Triceps', '${req.body.username}'),
                        ('Rope Pushdown', 0, 'Triceps', '${req.body.username}'),
                        ('Farmer''s Carry', 0, 'Forearms', '${req.body.username}'),
                        ('Crunch', 0, 'Abdominals', '${req.body.username}'),
                        ('Leg Raise', 0, 'Abdominals', '${req.body.username}'),
                        ('Sit Up', 0, 'Abdominals', '${req.body.username}'),
                        ('Barbell Back Squat', 0, 'Quadriceps', '${req.body.username}'),
                        ('Barbell Front Squat', 0, 'Quadriceps', '${req.body.username}'),
                        ('Hack Squat', 0, 'Quadriceps', '${req.body.username}'),
                        ('Leg Extension', 0, 'Quadriceps', '${req.body.username}'),
                        ('Leg Press', 0, 'Quadriceps', '${req.body.username}'),
                        ('Deadlift', 0, 'Hamstrings', '${req.body.username}'),
                        ('Leg Curl', 0, 'Hamstrings', '${req.body.username}'),
                        ('Hip Thrust', 0, 'Glutes', '${req.body.username}'),
                        ('Calf Raises', 0, 'Calves', '${req.body.username}'),
                        ('Clean and Press', 0, 'Other', '${req.body.username}')
                        
                    `)

                    await db.query('COMMIT');
                } catch(err) {
                    console.log(err);
                    await db.query('ROLLBACK');
                    if (err.code === '23505') {
                        return res.sendStatus(409);
                    }
                    return res.sendStatus(400);

                }

            }

            return res.sendStatus(200);

        } catch (err) {
            console.error(err);

            if (err.code === "23505") {
                /* Duplicate username */
                return res.sendStatus(409);
            } else {
                return res.sendStatus(400);
            }

        }
    });

});

router.get('/username', (req, res) => {

    if (req.user) {

        res.json({username: req.user.username});
    } else {
        res.json({username: false})
    }
});

module.exports = router;

