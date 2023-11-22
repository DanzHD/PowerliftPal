async function createBodyPartTable({client}) {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS bodypart (
            muscleGroup VARCHAR PRIMARY KEY NOT NULL
        )`)
    } catch(error) {
        console.log(error);
    }
}

module.exports = {createBodyPartTable}