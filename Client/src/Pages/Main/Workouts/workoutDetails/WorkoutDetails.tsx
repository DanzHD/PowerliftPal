import {useNavigate} from "react-router-dom";
import Navbar from "../../../../common/components/navbar/Navbar.tsx";
import Layout from "../../../../common/components/Layout/Layout.tsx";
import Header from "../../../../common/components/Header/Header.tsx";
import Content from "./Content.tsx";
import {useAuthContext} from "../../../../Contexts/AuthContext.tsx";



function WorkoutDetails() {

    const navigate = useNavigate();
    const {logoutUser} = useAuthContext();


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

                {/*
                    @ts-ignore */}
                <div className='navbar-logo' onClick={logoutUser}>

                    <span className="material-symbols-outlined">
                        logout
                    </span>
                    <div>Logout</div>
                </div>

            </Navbar>
            <Layout classNames='workout workout-details' header={<Header title='Workout Details' />} content={Content()} />
        </>
    )
}

export default WorkoutDetails;