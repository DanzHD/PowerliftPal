import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import Navbar from "../../../../common/components/navbar/Navbar.tsx";
import Layout from "../../../../common/components/Layout/Layout.tsx";
import Header from "../Header.tsx";
import Content from "./Content.tsx";



function WorkoutDetails() {

    const navigate = useNavigate();


    return (
        <>
            <Navbar >
                <div className='navbar-logo' onClick={() => navigate('/Dashboard')}>
                    <span className="material-symbols-outlined">
                        Home
                    </span>
                    <div>Home</div>
                </div>

                <div className='navbar-logo highlighted' onClick={() => navigate('/workout')}>

                    <span className="material-symbols-outlined ">
                        book_4
                    </span>
                    <div>Workouts</div>
                </div>

                <div className='navbar-logo' onClick={() => navigate('/exercise')}>

                    <span className="material-symbols-outlined">
                        exercise
                    </span>
                    <div>Exercises</div>
                </div>

                <div className='navbar-logo' onClick={() => navigate('/profile')}>

                    <span className="material-symbols-outlined">
                        person
                    </span>
                    <div>Profile</div>
                </div>

            </Navbar>
            <Layout classNames='workout' header={Header()} content={Content()} />
        </>
    )
}

export default WorkoutDetails;