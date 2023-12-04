import Accordion from "../../../common/components/Accordion/Accordion.tsx";
import {useAPIContext} from "../../../Contexts/APIContext.tsx";
import Button from "../../../common/components/Button/Button.tsx";
import Text from "../../../common/components/Text/Text.tsx";
import {useRef} from "react";
import './_exercise.scss'

function Content() {

    const {muscleGroups, exercises} = useAPIContext();
    let dialogRef = useRef([]);


    return (

        <>
            <div className='accordion-container'>
                {muscleGroups.map((muscleGroup) => {
                    let exercise = exercises.filter(exercise => exercise['musclegroup'] === muscleGroup)
                    let accordionContent = DisplayExercise({exercises: exercise, dialogRef});


                    return <Accordion title={muscleGroup} key={muscleGroup} content={accordionContent}></Accordion>
                })}

            </div>
        </>
    )
}

function DisplayExercise({exercises, dialogRef}) {
    
    function handleOpenModal(e) {

        let key: String = e.target.getAttribute('value');
        dialogRef.current[key].showModal();
    }

    function handleCloseModal(e) {
        let key: String = e.target.getAttribute('value');

        dialogRef.current[key].close();
    }


    return (
        <>
            <div className='exercise-container'>

                {exercises.map((exercise) => {

                    return (
                        <div key={exercise['name']}>
                            <Text value={exercise['name']} className='exercise-name' onClick={handleOpenModal} key={exercise['name']}>{exercise['name']}</Text>
                            <dialog ref={el => dialogRef.current[exercise['name']] = el}>
                                <div className='modal-container'>
                                    <div className='modal-header'>
                                        <Text heading={true}>{exercise['name']}</Text>
                                    </div>

                                    <div className='modal-content'>

                                        <Text> Total Weight Moved: {exercise['totalweight']}</Text>
                                        <Text>Total reps: {exercise['totalreps']}</Text>
                                        <Text>Total sets: {exercise['totalsets']} </Text>
                                        <Text>Personal Record: {exercise['personalrecord']}</Text>
                                    </div>
                                    <div className='modal-footer'>

                                        <Button value={exercise['name']} onClick={handleCloseModal}>Close</Button>
                                    </div>
                                </div>


                            </dialog>

                        </div>
                    )

                    })
                }
            </div>

        </>
    )
}


export default Content;