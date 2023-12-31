import Navbar from "../../../common/components/navbar/Navbar.tsx";
import {useNavigate} from "react-router-dom";
import Layout from "../../../common/components/Layout/Layout.tsx";
import Header from "../../../common/components/Header/Header.tsx";
import './_exercise.scss'
import Content from "./Content.tsx";
import Footer from "./Footer.tsx";
import {useRef} from "react";
import {useAuthContext} from "../../../Contexts/AuthContext.tsx";

function Exercise() {
    const createExerciseRef = useRef(null);
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

                <div className='navbar-logo ' onClick={() => navigate('/workout')}>

                    <span className="material-symbols-outlined">
                        book_4
                    </span>
                    <div>Workouts</div>
                </div>

                <div className='navbar-logo highlighted'>

                    <span className="material-symbols-outlined">
                        exercise
                    </span>
                    <div>Exercises</div>
                </div>

                <div className='navbar-logo' onClick={() => logoutUser()}>

                    <span className="material-symbols-outlined">
                        logout
                    </span>
                    <div>Logout</div>
                </div>

            </Navbar>

            <Layout content={Content()} header={<Header title='Exercises' />} footer={Footer({createExerciseRef})} classNames='exercise' />
        </>
    )
}

export default Exercise;