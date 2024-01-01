import Accordion from "../../../common/components/Accordion/Accordion.tsx";
import {useAPIContext} from "../../../Contexts/APIContext.tsx";
import Button from "../../../common/components/Button/Button.tsx";
import Text from "../../../common/components/Text/Text.tsx";
import './_exercise.scss'
import {useRef} from "react";

function Content() {

    const {muscleGroups, exercises} = useAPIContext();
    let dialogRef = useRef([]);


    return (

        <>
            <div className='exercise-list-container'>
                <div className='exercise-list-header'>
                    <Text subheading={true}>Exercise List</Text>
                </div>
                <div className='line'/>

                {muscleGroups.map((muscleGroup: string) => {
                    let exercise: Array<Object> = exercises.filter((exercise: any) => exercise['musclegroup'] === muscleGroup)
                    let accordionContent = DisplayExercise({exercises: exercise, dialogRef});

                    return <Accordion key={muscleGroup} title={muscleGroup} content={accordionContent}></Accordion>
                })}

            </div>
        </>
    )
}

function DisplayExercise({exercises, dialogRef}: {exercises: Array<Object>, dialogRef: any}) {
    
    function handleOpenModal(e: any) {

        let key: number = e.target.getAttribute('value');
        dialogRef.current[key].showModal();
    }

    function handleCloseModal(e: any) {
        let key: number = e.target.getAttribute('value');

        dialogRef.current[key].close();
    }


    return (
        <>
            <div className='exercise-container'>

                {exercises.map((exercise: any) => {

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