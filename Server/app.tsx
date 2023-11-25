const express = require('express');
const app = express();
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authenticationRoute = require('./Routes/authentication.tsx');
const userRoute = require('./Routes/users.tsx');
const workoutsRoute = require(`./Routes/workouts.tsx`);
const exerciseTypeRoute = require('./Routes/exerciseType.tsx');
const exercisesRoute = require('./Routes/exercises.tsx');
const bodyPartRoute = require('./Routes/bodyPart.tsx');
const setsRoute = require('./Routes/sets.tsx');

app.use(cors({
    origin: `${process.env.FRONTEND_ENDPOINT}`,
    credentials: true
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Authentication middleware
app.use(cookieParser('secretCode'));
app.use(session({ secret: "secretCode", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));


app.use('/', authenticationRoute);
app.use('/', userRoute);
app.use(`/`, workoutsRoute);
app.use('/', exercisesRoute);
app.use('/', bodyPartRoute);
app.use('/', exerciseTypeRoute);
app.use('/', setsRoute);


const PORT = process.env.APP_PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


