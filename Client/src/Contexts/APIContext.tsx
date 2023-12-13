import {BACKEND} from "../common/utils/Constants.tsx";
import {createContext, useContext, useEffect, useState} from "react";

const APIContext = createContext('');

export function APIContextProvider({ children }) {
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
            const options = {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                },
                credentials: 'include'
            }

            const sevenDaysAgo: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
            const res = await fetch(`${BACKEND}/allworkouts`, options);
            let workouts = await res.json();

            workouts = workouts.filter(workout =>  new Date(workout['workoutdate']) > sevenDaysAgo);

            setWeeklyWorkouts(workouts.length);
        } catch(error) {
            console.error(error);
        }
        setLoading(false);
    }

    const getWeeklyLiftWeight = async () => {
        try {
            const options = {
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
            const options = {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                }

            }
            let res = await fetch(`${BACKEND}/bodypart/readAll`, options);
            let muscleGroups = await res.json();
            muscleGroups = muscleGroups.map(key => {

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
            const options = {
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

    const createExercise = async ({exerciseInfo}) => {
        try {

            const options = {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(exerciseInfo)
            }

            await fetch(`${BACKEND}/exercisetype/create`, options);

        } catch(err) {
            console.log(err);
        }


    }

    const getWorkoutsByDate = async ({fromDate, toDate}) => {
        try {
            const options: Object  = {
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
            const options: Object  = {
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

    const getExercisesFromWorkout = async ({workoutID}) => {
        try {
            const options: Object = {
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



    const contextData = {
        weeklyWorkouts,
        weeklyLiftWeight,
        getWeeklyWorkouts,
        muscleGroups,
        exercises,
        createExercise,
        getWorkoutsByDate,
        getAllWorkouts,
        getExercisesFromWorkout
    }

    return (
        <APIContext.Provider value={contextData}>
            {loading ? <p>loading...</p> : children}
        </APIContext.Provider>
    )
}

export function useAPIContext() {
    const context = useContext(APIContext);

    if (!context) {
        throw new Error('APIContext must be used inside a provider');
    }

    return context;
}
