import Text from "../../../../common/components/Text/Text.tsx";
import {useEffect, useState} from "react";
import {useAPIContext} from "../../../../Contexts/APIContext.tsx";
import Card from "../../../../common/components/Card/Card.tsx";
import {useNavigate} from "react-router-dom";

function Content() {
    const {getAllWorkouts} = useAPIContext();
    const [workouts, setWorkouts] = useState([])
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async function() {
            try {

                setLoading(true);
                setWorkouts(await getAllWorkouts());

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    console.log(workouts);

    return (
        <>
            <Text heading={true} styles={{textAlign: 'center'}} >Recent Workouts</Text>
            {
                loading ? <div> Loading </div> :

                    <div className='recent-workouts'>
                        {
                            workouts.map(workout => {
                                let date = new Date(workout.workoutdate).toDateString();
                                return (
                                    <Card
                                        onClick={() => navigate(`/workout/${workout['workoutid']}`)}
                                        key={workout['workoutid']}
                                        date={date}
                                        notes={workout['notes']}
                                    />
                                )
                            })
                        }
                    </div>
            }
        </>
    )
}

export default Content