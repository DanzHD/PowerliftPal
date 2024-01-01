import Button from "../../../common/components/Button/Button.tsx";
import Text from "../../../common/components/Text/Text.tsx";
import {useAPIContext} from "../../../Contexts/APIContext.tsx";
import './_exercise.scss'
import {preventMinus, preventPasteNegative} from "../../../common/utils/FormValidation.tsx";

function Footer({createExerciseRef}: {createExerciseRef: any}) {

    const {muscleGroups, createExercise} = useAPIContext();

    const handleOpenModal = () => {
        createExerciseRef.current.showModal();
    }

    const handleCloseModal = () => {
        createExerciseRef.current.close();
    }

    const handleCreateExercise = async (e: any) => {
        e.preventDefault();
        const exerciseInfo = {exerciseName: e.target.name.value,
            personalRecord: e.target.personalRecord.value, muscleGroup: e.target.muscleGroup.value}
        await createExercise({exerciseInfo})
        handleCloseModal();

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
                                <div className='input-label-pair'>

                                    <label htmlFor='name'>Exercise Name</label>
                                    <input
                                        onKeyDown={preventMinus}
                                        onPaste={preventPasteNegative}
                                        type='text'
                                        name='name'
                                        className='exercise-input'
                                        required
                                    />
                                </div>
                                <div className='input-label-pair'>
                                    <label htmlFor='personalRecord'>Personal Record</label>
                                    <input
                                        type='number'
                                        name='personalRecord'
                                        className='exercise-input'
                                        onKeyDown={preventMinus}
                                        onPaste={preventPasteNegative}
                                        required
                                    />

                                </div>

                                <div className='input-label-pair'>

                                    <label htmlFor='muscleGroup'>Muscle Group</label>
                                    <select name='muscleGroup' >
                                        {muscleGroups.map((muscleGroup: string) => {
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