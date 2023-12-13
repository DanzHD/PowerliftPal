import Text from "../../../common/components/Text/Text.tsx";
import Button from "../../../common/components/Button/Button.tsx";
import '../../../Styles/_vars.scss'
import {Fragment, useEffect, useRef, useState} from "react";
import {useAPIContext} from "../../../Contexts/APIContext.tsx";
import {useNavigate} from "react-router-dom";

function Content() {

    const navigate = useNavigate();

    const [displayDateSearch, setDisplayDateSearch] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    let [loading, setLoading] = useState(false);
    let [invalidFormInput, setInvalidFormInput] = useState(false);
    let {getWorkoutsByDate, getAllWorkouts} = useAPIContext();

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
                    <Text subheading={true}>My Workouts</Text>
                    <Button
                        styles={
                            {
                                borderRadius: '0',
                                padding: '10px',
                                fontSize: '13px',
                                fontWeight: '300',
                                border: 'none',
                                color: 'white',
                                backgroundColor: '#1ab394',
                                marginLeft: 'auto',
                                width: '150px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        }
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
                    <div className='line'></div>

                </div>
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
                        <div>Loading... </div>



                    }
                    {!(workouts.length) && !loading && <Text>No workouts found</Text>}
                </div>
            </div>

        </>
    )
}



export default Content;