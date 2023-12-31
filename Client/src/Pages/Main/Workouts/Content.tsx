import Text from "../../../common/components/Text/Text.tsx";
import Button from "../../../common/components/Button/Button.tsx";
import '../../../Styles/_vars.scss'
import '../../../common/components/Modal/_Modal.scss'
import './_workouts.scss'
import {Fragment, useEffect, useRef, useState} from "react";
import {useAPIContext} from "../../../Contexts/APIContext.tsx";
import {useNavigate} from "react-router-dom";
import Accordion from "../../../common/components/Accordion/Accordion.tsx";
import Select from "react-select";
import LoadingSpinner from "../../../common/components/LoadingSpinner/LoadingSpinner.tsx";

function Content() {

    const navigate = useNavigate();
    const logWorkoutRef = useRef(null);

    const [displayDateSearch, setDisplayDateSearch] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [invalidFormInput, setInvalidFormInput] = useState(false);
    const {getWorkoutsByDate, getAllWorkouts, createWorkoutWithExercises} = useAPIContext();

    const [exerciseSets, setExerciseSets] = useState([]);
    const [addingExercise, setAddingExercise] = useState(false);
    const [newSelectedExercises, setNewSelectedExercises] = useState([]);
    const {exercises} = useAPIContext();
    const [selectingDate, setSelectingDate] = useState(false);

    const handleOpenModal = () => {
        logWorkoutRef.current.showModal()
    }

    const handleCloseModal = () => {
        setExerciseSets([]);
        logWorkoutRef.current.close();
    }


    useEffect(() => {

        (async function () {
            setLoading(true)
            setWorkouts(await getAllWorkouts());
            setLoading(false);
        })();

    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            let fromDate: String = e.target['fromDate'].value;
            let toDate: String = e.target['toDate'].value;

            if (!fromDate && !toDate) {
                setInvalidFormInput("Missing to date and from date");
                return;
            } else if (!fromDate) {
                setInvalidFormInput("Missing from date");
                return;

            } else if (!toDate) {
                setInvalidFormInput("Missing to date");
                return;

            } else {
                setInvalidFormInput(false);
            }

            let w = await getWorkoutsByDate({fromDate, toDate});
            setWorkouts(w);

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }

    const handleResetFilters = async () => {
        setLoading(true);
        try {
            let workouts = await getAllWorkouts();
            setDisplayDateSearch(false);
            setWorkouts(workouts)
            setInvalidFormInput(false);

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>

            <div className='workouts-list'>
                <div className='workouts-list-header'>
                    <Text className='workouts-title' subheading={true}>My Workouts</Text>
                    <Button
                        className='workouts-title-button'
                        onClick={() => setDisplayDateSearch(!displayDateSearch)}
                    >
                        Search by date range
                    </Button>

                    {displayDateSearch &&
                        <div>
                            <form onSubmit={handleSearch}>

                                <div className='date-filter-entry'>
                                    <label htmlFor='fromDate'>From Date</label>
                                    <input name='fromDate' type="date" className='date-input'  />
                                </div>
                                <div className='date-filter-entry'>
                                    <label htmlFor='toDate'>To Date</label>
                                    <input name='toDate' type='date' className='date-input'  />
                                </div>
                                {invalidFormInput && <Text styles={{color: 'red'}}>{invalidFormInput}</Text>}
                                <div>

                                    <Button
                                        className='workout-button'
                                        type='submit'
                                    >
                                        Search
                                    </Button>

                                    <Button
                                        type='button'
                                        className='workout-button'
                                        onClick={handleResetFilters}
                                        styles={{marginLeft: '20px', backgroundColor: '#ADD8E6'}}
                                    >
                                        Reset
                                    </Button>
                                </div>
                            </form>
                        </div>
                    }

                </div>
                <div className='line'></div>

                {!loading &&
                    <Button
                        styles={
                            {
                                marginBottom: '2em',
                                width: '10em',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                height: '3em',
                                backgroundColor: '#BF90EE'
                            }
                        }
                        className='workout-button'
                        onClick={handleOpenModal}
                    >
                        Add Workout
                    </Button>}

                <dialog className='log-workout' ref={logWorkoutRef}>
                    <div className='modal-container log-workout'>

                        {
                            selectingDate ?
                                <WorkoutDateModal
                                    setSelectingDate={setSelectingDate}
                                    setLoading={setLoading}
                                    exerciseSets={exerciseSets}
                                    setExerciseSets={setExerciseSets}
                                    handleCloseModal={handleCloseModal}
                                    createWorkoutWithExercises={createWorkoutWithExercises}
                                    getallWorkouts={getAllWorkouts}
                                    setWorkouts={setWorkouts}


                                /> :

                                addingExercise ?
                                    <AddExercisesModal
                                        setAddingExercise={setAddingExercise}
                                        exercises={exercises}
                                        exercisesSelected={exerciseSets.map(exerciseSet => Object.keys(exerciseSet).toString())}
                                        setExercisesSelected={setExerciseSets}
                                        newSelectedExercises={newSelectedExercises}
                                        setNewSelectedExercises={setNewSelectedExercises}
                                        setAddingExercises={setAddingExercise}


                                    /> :
                                    <AddingWorkoutsModal
                                        setAddingExercise={setAddingExercise}
                                        exerciseSets={exerciseSets}
                                        setExerciseSets={setExerciseSets}
                                        handleCloseModal={handleCloseModal}
                                        setLoading={setLoading}
                                        setSelectingDate={setSelectingDate}
                                    />
                        }
                    </div>
                </dialog>

                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {
                        (!loading) ? workouts.map(workout => {
                            let date = new Date(workout.workoutdate).toDateString();

                            return (
                                <Fragment key={workout.workoutid}>
                                    <div className='workout-entry' >

                                        <span style={{display: 'flex'}} >
                                            {date}
                                            <Button
                                                value={workout.workoutid}
                                                onClick={() => navigate(`/workout/${workout.workoutid}`)}
                                                styles={
                                                    {
                                                        borderRadius: '0',
                                                        padding: '10px',
                                                        fontSize: '13px',
                                                        fontWeight: '300',
                                                        border: 'none',
                                                        color: 'white',
                                                        backgroundColor: '#1ab394',
                                                        width: '100px',
                                                        display: 'inline-flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        marginLeft: 'auto'

                                                    }
                                                }
                                            >
                                                View Details
                                            </Button>

                                        </span>

                                        <div style={{paddingLeft: '20px'}}>
                                            Notes: {workout.notes ? workout.notes : <Text >No notes</Text>}
                                        </div>

                                    </div>
                                </Fragment>
                            )
                        })
                        :
                        <LoadingSpinner />



                    }
                    {!(workouts.length) && !loading && <Text>No workouts found</Text>}
                </div>
            </div>

        </>
    )
}

function AddingWorkoutsModal({
    handleCloseModal,
    exerciseSets,
    setExerciseSets,
    setAddingExercise,
    setSelectingDate
}) {
    let [warning, setWarning] = useState(null);

    const handleSetChange = (e, exercise, setNumber, property) => {
        try {

            let exerciseChange = exerciseSets.find(exerciseSet => Object.keys(exerciseSet).toString() === exercise);

            setExerciseSets(exerciseSets => {
                if (property === 'warmup') {

                    exerciseChange[exercise][setNumber][property] = e.target.checked;

                } else {
                    exerciseChange[exercise][setNumber][property] = e.target.value;
                }
                return exerciseSets;
            });
        } catch (err) {
            console.error(err)
        }

    };

    const preventMinus = (e) => {
        if (e.code === 'Minus') {
            e.preventDefault();
        }
    };

    const preventPasteNegative = (e) => {
        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedData = parseFloat(clipboardData.getData('text'));

        if (pastedData < 0) {
            e.preventDefault();
        }
    };

    const addSet = (exercise) => {

        let exerciseIndex: number = exerciseSets.findIndex(exerciseSet => Object.keys(exerciseSet).toString() === exercise);

        let setNumber: number = exerciseSets[exerciseIndex][exercise].length + 1;

        let exerciseSetsCopy = exerciseSets.slice();
        exerciseSetsCopy[exerciseIndex][exercise].push({setNumber: setNumber, reps: 5, weight: 100, intensity: 1, warmup: false});

        setExerciseSets(exerciseSetsCopy);

    }

    const removeSet = (exercise) => {
        let exerciseIndex: number = exerciseSets.findIndex(exerciseSet => Object.keys(exerciseSet).toString() === exercise);
        let exerciseSetsCopy = exerciseSets.slice();
        exerciseSetsCopy[exerciseIndex][exercise].pop();
        setExerciseSets(exerciseSetsCopy);
    }

    const removeExercise = (exercise) => {
        let exerciseIndex: number = exerciseSets.findIndex(exerciseSet => Object.keys(exerciseSet).toString() === exercise);
        let exerciseSetsCopy = exerciseSets.slice();
        exerciseSetsCopy.splice(exerciseIndex, 1)
        setExerciseSets(exerciseSetsCopy);
    }

    const handleLogWorkout = () => {
        let emptyFields: String = "";
        for (let i = 0; i < exerciseSets.length; i++) {
            let exercise = Object.keys(exerciseSets[i]).toString();
            exerciseSets[i][exercise].forEach(set => {
               if (!set['reps'] || !set['weight']) {
                   emptyFields += `${exercise}\n`;
                   return;
               }
            });
        }
        if (emptyFields) {
            setWarning(`The following exercises contain empty fields: ${emptyFields} `);
            return;
        } else {

            setSelectingDate(true);
            setWarning(null);
            return;
        }
    }

    return (
        <>
            <div className='modal-header log-workout' style={{display: 'flex', justifyContent: 'space-between'}}>
                <span onClick={handleCloseModal} className="material-symbols-outlined" style={{fontSize: '32px', cursor: 'pointer'}}>
                    close
                </span>

                <Text heading={true}>Log Workout</Text>
                <span
                    className="material-symbols-outlined"
                    style={{fontSize: '32px', cursor: 'pointer'}}
                    onClick={handleLogWorkout}
                >
                    done
                </span>

            </div>


            <div className='modal-content'>
                <div className='line' />

                {
                    exerciseSets.map((exerciseSet, i) => {
                        let exercise = Object.keys(exerciseSet).toString();

                        return (
                            <Fragment key={exercise}>
                                <div className='exercise-entry'>
                                    <Accordion
                                        title= {

                                            <>
                                                <span style={{ color: "lightblue"}}>{i+1}</span>
                                                <span> {exercise} </span>
                                            </>

                                        }
                                        content={

                                            <>
                                                <form id='exerciseForm'>

                                                    <div className='set-container'>
                                                        <div className='set-entry'>

                                                            <Text>Set</Text>
                                                            <Text>Reps</Text>
                                                            <Text>Weight</Text>
                                                            <Text>Intensity</Text>
                                                            <Text>Warmup Set</Text>
                                                        </div>
                                                        {

                                                            exerciseSet[exercise].map((set, i) => {

                                                                return (

                                                                    <div className='set-entry' key={set['setNumber']}>
                                                                        <div>{set['setNumber']}</div>
                                                                        <input
                                                                            onChange={(e) =>
                                                                                handleSetChange(e, exercise, i, 'reps')}
                                                                            defaultValue={set['reps']}
                                                                            type='number'
                                                                            name='reps'
                                                                            onKeyDown={preventMinus}
                                                                            onPaste={preventPasteNegative}

                                                                        />

                                                                        <input
                                                                            onChange={e =>
                                                                                handleSetChange(e, exercise, i, 'weight')}
                                                                            defaultValue={set['weight']}
                                                                            name='weight'
                                                                            type='number'
                                                                            onKeyDown={preventMinus}
                                                                            onPaste={preventPasteNegative}
                                                                        />
                                                                        <select
                                                                            onChange={(e) =>
                                                                                handleSetChange(e, exercise, i, 'intensity')}
                                                                            name='intensity'
                                                                            defaultValue={set['intensity']}>

                                                                            <option value='1'>1</option>
                                                                            <option value='2'>2</option>
                                                                            <option value='3'>3</option>
                                                                            <option value='4'>4</option>
                                                                            <option value='5'>5</option>

                                                                        </select>
                                                                        <input
                                                                            onChange={(e) =>
                                                                                handleSetChange(e, exercise, i, 'warmup')}
                                                                            value={set['warmup']}
                                                                            name='warmup'
                                                                            type='checkbox'
                                                                            defaultChecked={set['warmup']}
                                                                        />
                                                                    </div>

                                                                )
                                                            })
                                                        }
                                                        <Text
                                                            onClick={() => addSet(Object.keys(exerciseSet).toString())}
                                                            className='add-set-button'
                                                        >
                                                            Add Set
                                                        </Text>

                                                        <Text
                                                            className='remove-set-button'
                                                            onClick={() => removeSet(Object.keys(exerciseSet).toString())}
                                                        >
                                                            Remove Set
                                                        </Text>

                                                        <Text
                                                            className='remove-exercise-button'
                                                            onClick={() => removeExercise(Object.keys(exerciseSet).toString())}
                                                            styles={{color: 'red', paddingTop: '20px'}}
                                                        >
                                                            Remove Exercise
                                                        </Text>


                                                    </div>
                                                </form>
                                            </>

                                        }
                                    />

                                </div>
                            </Fragment>
                        )
                    })
                }

                {warning && <Text styles={{color: 'red'}}>{warning}</Text>}
                <Button onClick={() => setAddingExercise(true)}>Add Exercise</Button>
            </div>

        </>
    )
}

function AddExercisesModal({
    setAddingExercise,
    exercises,
    exercisesSelected,
    setExercisesSelected,
    newSelectedExercises,
    setNewSelectedExercises,
    setAddingExercises
}) {

    let exerciseOptions = exercises.filter(exercise => {

        return !exercisesSelected.includes(exercise['name'])
    });



    const handleSelectionChange = (selectedOption) => {
        setNewSelectedExercises(selectedOption);

    }

    const handleSubmit = () => {

        const newSelectedExercisesCopy = newSelectedExercises.map(exercise => {
            return {[exercise['value']]: []}
        });

        setExercisesSelected(exercisesSelected => [...exercisesSelected, ...newSelectedExercisesCopy]);
        setNewSelectedExercises([])
        setAddingExercises(false);
    }

    return (
        <>
            <div className='modal-header log-workout' style={{display: 'flex', justifyContent: 'space-between'}}>
                <span onClick={() => setAddingExercise(false)} className="material-symbols-outlined" style={{cursor: 'pointer'}}>
                    arrow_back
                </span>

                <Text heading={true}>Add Exercises</Text>
                <span
                    className="material-symbols-outlined"
                    style={{fontSize: '32px', cursor: 'pointer'}}
                    onClick={handleSubmit}
                >
                    done
                </span>

            </div>

            <div className='modal-content'>
                <div className='line' />
                <Text subheading={true} styles={{textAlign: 'center'}}>Add Exercises</Text>
                <Select
                    options={exerciseOptions.map(exercise => {
                        return {value: exercise['name'], label: exercise['name']}
                    })}
                    isMulti={true}
                    isClearable={true}
                    isSearchable={true}
                    onChange={handleSelectionChange}

                />

            </div>


        </>
    )
}

function WorkoutDateModal({
    setLoading,
    handleCloseModal,
    setSelectingDate,
    exerciseSets,
    createWorkoutWithExercises,
    getallWorkouts,
    setWorkouts
}) {
    const handleFormSubmit = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            handleCloseModal();
            let date = e.target.workoutDate.value;
            let notes = e.target.notes.value;

            await createWorkoutWithExercises({exerciseSets, date, notes});


        } catch (err) {
            console.error(err)
        } finally {
            setSelectingDate(false);
            setWorkouts(await getallWorkouts());
            setLoading(false);
        }
    }

    return (
        <>
            <div className='modal-header log-workout' style={{display: 'flex', justifyContent: 'space-between'}}>
                <span onClick={() => setSelectingDate(false)} className="material-symbols-outlined" style={{cursor: 'pointer'}}>
                    arrow_back
                </span>

                <Text subheading={true}>Add Date</Text>

                <button
                    className="material-symbols-outlined"
                    style={{fontSize: '32px', cursor: 'pointer', border: "none", backgroundColor: 'inherit'}}
                    type='submit'
                    form='workoutDateForm'
                >
                    done
                </button>

            </div>

            <div className='modal-content' >
                <div className='line' />
                <form onSubmit={handleFormSubmit} id='workoutDateForm'>
                    <div className='workout-input'>
                        <label>Date</label>
                        <input name='workoutDate' id='workout-date' type='date' required/>
                    </div>

                    <div className='workout-input' style={{marginBottom: '3em'}}>
                        <label>Notes</label>
                        <input name='notes' type='text' placeholder='Enter Notes'/>
                    </div>

                    <Button type='submit'> Log Workout! </Button>
                </form>

            </div>


        </>
    )
}

export default Content;