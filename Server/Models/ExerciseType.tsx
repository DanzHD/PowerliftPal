async function createExerciseTypeTable({client}) {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS ExerciseType (
            NAME VARCHAR PRIMARY KEY NOT NULL, 
            PersonalRecord DECIMAL(2),
            muscleGroup VARCHAR NOT NULL,
            FOREIGN KEY(muscleGroup)
                REFERENCES bodypart(muscleGroup)
                
        )`)
    } catch(error) {
        console.log(error);
    }
}

module.exports = {createExerciseTypeTable}