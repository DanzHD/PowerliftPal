async function createSetsTable({client}) {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS Sets (
            Warmup BOOLEAN NOT NULL,
            REST INTERVAL, 
            Reps SMALLINT NOT NULL,
            Intensity SMALLINT,
            NOTES VARCHAR,
            WorkoutID SERIAL NOT NULL,
            ExerciseName VARCHAR NOT NULL, 
            SetNumber SERIAL NOT NULL,
            PRIMARY KEY(SetNumber, WorkoutID, ExerciseName),
            FOREIGN KEY(WorkoutID)
                REFERENCES workouts(WorkoutID)

        );`)
    } catch(error) {
        console.log(error);
    }
};

module.exports = {createSetsTable};