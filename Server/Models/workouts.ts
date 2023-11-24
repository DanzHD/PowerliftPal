async function createWorkoutsTable({client}) {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS workouts (
            WorkoutID SERIAL PRIMARY KEY NOT NULL, 
            WorkoutDate DATE NOT NULL,
            Notes VARCHAR,
            username VARCHAR NOT NULL,
            FOREIGN KEY(username)
                REFERENCES users(username)
        );`);
    } catch(error) {
        console.log(error);
    }
}

module.exports = {createWorkoutsTable}