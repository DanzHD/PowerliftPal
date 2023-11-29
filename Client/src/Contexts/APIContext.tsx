import {BACKEND} from "../common/utils/Constants.tsx";
import {createContext, useContext, useEffect, useState} from "react";

const APIContext = createContext('');

export function APIContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [weeklyWorkouts, setWeeklyWorkouts] = useState(null);
    const [weeklyLiftWeight, setWeeklyLiftWeight] = useState(null);

    // Set initial values
    useEffect(() => {
        getWeeklyLiftWeight();
        getWeeklyWorkouts();
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


    const contextData = {
        weeklyWorkouts,
        weeklyLiftWeight,
        getWeeklyWorkouts
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
