import {BACKEND} from "../common/utils/Constants.tsx";
import {createContext, useContext, useEffect, useState} from "react";
import Loading from "../Pages/Loading.tsx";

interface IAPIContext {
    weeklyWorkouts: String
    weeklyLiftWeight: String
    getWeeklyWorkouts: Function
    muscleGroups: Array<string>,
    exercises: Array<Object>,
    createExercise: Function,
    getWorkoutsByDate: Function,
    getAllWorkouts: Function,
    getExercisesFromWorkout: Function,
    createWorkoutWithExercises: Function,
    getWorkout: Function,
    getSets: Function,
    deleteWorkout: Function
}

const APIContext = createContext<IAPIContext>({} as IAPIContext);

export function useAPIContext() {
    const context = useContext(APIContext);

    if (!context) {
        throw new Error('APIContext must be used inside a provider');
    }

    return context;
}

export function APIContextProvider({ children }: {children: any}) {
    const [loading, setLoading] = useState(true);
    const [weeklyWorkouts, setWeeklyWorkouts] = useState(null);
    const [weeklyLiftWeight, setWeeklyLiftWeight] = useState(null);
    const [muscleGroups, setMuscleGroups] = useState([]);
    const [exercises, setExercises] = useState([]);

    // Set initial values
    useEffect(() => {
        Promise.all([
        getWeeklyLiftWeight(),
        getWeeklyWorkouts(),
        getMuscleGroups(),
        getExercises(),
        ])

    }, []);

    const getWeeklyWorkouts = async () => {
        setLoading(true);
        try {
            const options: RequestInit = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            }

            const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const res: Response = await fetch(`${BACKEND}/allworkouts`, options);
            let workouts = await res.json();

            workouts = workouts.filter((workout: {workoutid: String, workoutdate: Date, notes: String, username: String}) =>  new Date(workout['workoutdate']) > sevenDaysAgo);

            setWeeklyWorkouts(workouts.length);
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    }

    const getWeeklyLiftWeight = async () => {
        try {
            const options: RequestInit = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            }

            const res = await fetch(`${BACKEND}/query/weeklyWeightLifted`, options);
            const lifts = await res.json();
            setWeeklyLiftWeight(lifts[0]['totalweight']);


        } catch(error) {
            console.error(error);
        }
    }
    const getMuscleGroups = async () => {
        setLoading(true);
        try {
            const options: RequestInit = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }

            }
            let res = await fetch(`${BACKEND}/bodypart/readAll`, options);
            let muscleGroups = await res.json();
            muscleGroups = muscleGroups.map((key: {musclegroup: String}) => {

                return key['musclegroup'];
            })
            muscleGroups.sort();
            setMuscleGroups(muscleGroups);


        } catch(error) {
            console.log(error);
        }
        setLoading(false);
    }

    const getExercises = async () => {
        setLoading(true);
        try {
            const options: RequestInit = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }

            }
                let res = await fetch(`${BACKEND}/exercisetype/readAll`, options);
                let exercises = await res.json();

                setExercises(exercises);


        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    const createExercise = async ({exerciseInfo}: {exerciseInfo: Object}) => {
        try {
            setLoading(true)
            const options: RequestInit = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(exerciseInfo)
            }

            await fetch(`${BACKEND}/exercisetype/create`, options);
            await getExercises();

        } catch(err) {
            console.log(err);
        } finally {
            setLoading(false);
        }

    }

    const getWorkoutsByDate = async ({fromDate, toDate}: {fromDate: Date, toDate: Date}) => {
        try {
            const options: RequestInit  = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            }
            let res = await fetch(`${BACKEND}/workouts/${fromDate}/${toDate}`, options);
            return await res.json();

        } catch (error) {
            console.error(error);
        }

    }

    const getAllWorkouts = async () => {
        try {
            const options: RequestInit  = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            }

            let res = await fetch(`${BACKEND}/allworkouts`, options);
            return await res.json();

        } catch (err) {
            console.error(err);
        }
    }

    const getExercisesFromWorkout = async ({workoutID}: {workoutID: String}) => {
        try {
            const options: RequestInit = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            }

            let res = await fetch(`${BACKEND}/exercise/${workoutID}`, options);
            return await res.json();


        } catch (err) {
            console.error(err);
        }
    }

    const createWorkoutWithExercises = async ({exerciseSets, date, notes}: {exerciseSets: Object, date: Date, notes: String}) => {
        try {
            const options: RequestInit = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    exerciseSets: exerciseSets,
                    date: date,
                    notes: notes
                })
            }

            await fetch(`${BACKEND}/query/createFullWorkout`, options);
            await getExercises();



        } catch (err) {
            console.error(err);
        }
    }

    const getWorkout = async ({workoutID}: {workoutID: String}) => {
        try {
            const options: RequestInit = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            }

            let res = await fetch(`${BACKEND}/workout/${workoutID}`, options);
            let workout = await res.json();
            return workout;

        } catch (err) {
            console.error(err);

        }
    }

    const getSets = async ({workoutID}: {workoutID: String}) => {
        try {
            const options: RequestInit = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }
            }

            let res = await fetch(`${BACKEND}/sets/${workoutID}`, options);
            let sets = await res.json();
            return sets;

        } catch (err) {
            console.error(err);
        }
    }

    const deleteWorkout = async ({workoutID}: {workoutID: String}) => {
        try {
            setLoading(true)
            const options: RequestInit = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    workoutID: workoutID
                })

            }

            await fetch(`${BACKEND}/workout/deleteOne`, options);
            setLoading(false);
        } catch (err) {
            throw err;
        }
    }

    const contextData: IAPIContext = {
        weeklyWorkouts,
        weeklyLiftWeight,
        getWeeklyWorkouts,
        muscleGroups,
        exercises,
        createExercise,
        getWorkoutsByDate,
        getAllWorkouts,
        getExercisesFromWorkout,
        createWorkoutWithExercises,
        getWorkout,
        getSets,
        deleteWorkout
    }

    return (
        <APIContext.Provider value={contextData}>
            {loading ? <Loading /> : children}
        </APIContext.Provider>
    )
}


