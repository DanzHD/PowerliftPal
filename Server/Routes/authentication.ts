const express = require('express');
const app = express();
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../utils/Database.ts');
const bcrypt = require('bcrypt');

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {

            const user = (await db.query(`SELECT * FROM users WHERE username='${username}'`))['rows'][0];

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch(err) {
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    console.log(`Serializing ${user.username}`);
    done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
    console.log(`Deserializing user: ${username}`);
    try {
        const user = (await db.query(`SELECT * FROM users WHERE username='${username}'`))['rows'][0]

        done(null, user);
    } catch(err) {
        done(err);
    }
});

router.post('/log-in',
    passport.authenticate('local', {
        successRedirect: `/log-in/success`,
        failureRedirect: `/log-in/failure`
    })
);

router.get('/log-in/success', (req, res) => {
    res.sendStatus(200);
});

router.get('/log-in/failure', (req, res) => {
    res.sendStatus(401)
});

router.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
})

router.get('/authenticated', (req, res) => {
    console.log(req.user);
    if (req.isAuthenticated()) {
        res.sendStatus(200);
    } else {
        res.sendStatus(409);
    }
})

module.exports = router;

