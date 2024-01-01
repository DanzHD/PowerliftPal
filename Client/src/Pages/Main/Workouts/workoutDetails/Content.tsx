import {useParams} from "react-router-dom";
import './_workoutdetails.scss'
import {useEffect, useState} from "react";
import {useAPIContext} from "../../../../Contexts/APIContext.tsx";
import Button from "../../../../common/components/Button/Button.tsx";
import {useNavigate} from "react-router-dom";
import Accordion from "../../../../common/components/Accordion/Accordion.tsx";
import Text from "../../../../common/components/Text/Text.tsx";
import exercise from "../../Exercises/Exercise.tsx";
import LoadingSpinner from "../../../../common/components/LoadingSpinner/LoadingSpinner.tsx";

function Content() {
    const {workoutID} = useParams();
    const {getExercisesFromWorkout} = useAPIContext();
    const [exercises, setExercises] = useState(null);
    const [sets, setSets] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const {getWorkout, getSets, deleteWorkout} = useAPIContext();

    const handleDelete = async () => {
        try {
            await deleteWorkout({workoutID});
            navigate('/workout');
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        // Validation checking the user owns this workoutID
        (async function() {
            try {

                await getWorkout({workoutID});

            } catch (err) {
                navigate('/workout')
            }

        }())
    }, []);

    useEffect(() => {
        (async function() {

            try {
                setLoading(true)
                setExercises(await getExercisesFromWorkout({workoutID}));
                setSets(await getSets({workoutID}));
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        })();
    }, []);



    if (loading) {
        return <LoadingSpinner />
    }
    if (!exercise) {
        return <div>Nothing logged for this workout</div>
    }

    return (
        <>
            <div className='workout-details-container'>
                <div className='workout-details-header'>

                    <Button className='workout-details-button' onClick={() => navigate('/workout')}>
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span>
                        <span>
                            Back
                        </span>

                    </Button>
                    <span style={{marginLeft: "auto", marginRight: 'auto'}}>

                        <Text subheading={true}>Workout Details</Text>
                    </span>



                </div>
                <div className='line' />


                {
                    exercises.map((exercise: any) => {

                        let exerciseSets: any = sets.filter((set: any) => {


                            return set['exercisename'] === exercise['name']
                        });

                        exerciseSets.sort((set1: any, set2: any) => set1['setnumber'] > set2['setnumber'] ? 1 : -1 )

                        return (

                            <Accordion key={exercise['name']} title={<Text>{exercise['name']}</Text>}
                                content={
                                    <div className='set-container sets-information' >
                                        <div className='set-entry'>
                                            <Text>Set</Text>
                                            <Text>Reps</Text>
                                            <Text>Weight</Text>
                                            <Text>Intensity</Text>
                                            <Text>Warmup Set</Text>
                                        </div>

                                        {
                                            exerciseSets.map((exerciseSet: any) => {
                                                return (
                                                    <div key={exerciseSet['setnumber']} className='set-entry'>
                                                        <Text>{exerciseSet['setnumber']}</Text>
                                                        <Text>{exerciseSet['reps']}</Text>
                                                        <Text>{exerciseSet['weight']}</Text>
                                                        <Text>{exerciseSet['intensity']}</Text>

                                                        {exerciseSet['warmup'] ?
                                                            <span className="material-symbols-outlined">
                                                                check
                                                            </span>
                                                            :
                                                            <div>No </div>
                                                        }

                                                    </div>

                                                )
                                            })
                                        }
                                    </div>
                                }
                            >

                            </Accordion>
                        )
                    })
                }
                <Button styles=
                    {
                        {
                            backgroundColor: 'red',
                            display: 'block',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            marginTop: '10rem'
                        }
                    }
                    className='workout-details-button'
                    onClick={handleDelete}
                >
                    Delete Workout
                </Button>
            </div>
        </>
    )
}

export default Content;
