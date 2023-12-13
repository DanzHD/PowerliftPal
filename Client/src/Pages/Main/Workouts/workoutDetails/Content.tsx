import {useParams} from "react-router-dom";
import workoutDetails from "./WorkoutDetails.tsx";
import {useEffect, useState} from "react";
import {useAPIContext} from "../../../../Contexts/APIContext.tsx";

function Content() {
    const {workoutID} = useParams();
    const {getExercisesFromWorkout} = useAPIContext();
    const [exercises, setExercises] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function() {

            try {
                setLoading(true)
                setExercises(await getExercisesFromWorkout({workoutID}));
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    console.log(exercises)


    return <div>Content</div>
}

export default Content;