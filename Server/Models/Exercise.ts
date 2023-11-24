async function createExerciseTable({client}) {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS Exercise (
            WorkoutID SERIAL NOT NULL,
            Name VARCHAR NOT NULL,
            Intensity SMALLINT NOT NULL,
            PRIMARY KEY (WorkoutID, Name),
            FOREIGN KEY(WorkoutID)
                REFERENCES workouts(WorkoutID),
            FOREIGN KEY(Name)
                REFERENCES ExerciseType(NAME)
        )`)
    } catch(error) {
        console.log(error);
    }
}

module.exports = {createExerciseTable}