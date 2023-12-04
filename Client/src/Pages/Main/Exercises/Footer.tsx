import Button from "../../../common/components/Button/Button.tsx";
import Text from "../../../common/components/Text/Text.tsx";
import {useAPIContext} from "../../../Contexts/APIContext.tsx";
import button from "../../../common/components/Button/Button.tsx";

function Footer({createExerciseRef}) {

    const {muscleGroups, createExercise} = useAPIContext();

    const handleOpenModal = () => {
        createExerciseRef.current.showModal();
    }

    const handleCloseModal = () => {
        createExerciseRef.current.close();
    }

    const handleCreateExercise = (e) => {
        e.preventDefault();
        const exerciseInfo = {exerciseName: e.target.name.value,
            personalRecord: e.target.personalRecord.value, muscleGroup: e.target.muscleGroup.value}
        console.log(exerciseInfo)
        createExercise({exerciseInfo})

    }


    return (
        <>
            <Button onClick={handleOpenModal}>Create Exercise</Button>
            <form onSubmit={handleCreateExercise}>
                <dialog ref={createExerciseRef}>
                    <div className='modal-container'>


                        <div className='modal-header'>
                            <Text heading={true}>Create new Exercise</Text>
                        </div>

                        <div className='modal-content'>
                                <div>

                                    <label htmlFor='name'>Exercise Name</label>
                                    <input type='text' name='name' />
                                </div>
                                <div>
                                    <label htmlFor='personalRecord'>Personal Record</label>
                                    <input type='number' name='personalRecord'/>

                                </div>

                                <div>
                                    <label htmlFor='muscleGroup'>Muscle Group</label>
                                    <select name='muscleGroup' >
                                        {muscleGroups.map(muscleGroup => {
                                            return <option value={muscleGroup} key={muscleGroup}>{muscleGroup}</option>
                                        })}
                                    </select>
                                </div>


                        </div>

                        <div className='modal-footer'>
                            <Button type='submit' >Create </Button>
                            <Button type='button' onClick={handleCloseModal}>Close</Button>
                        </div>

                    </div>
                </dialog>
            </form>
        </>
    )
}

export default Footer