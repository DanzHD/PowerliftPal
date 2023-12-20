import Navbar from "../../../common/components/navbar/Navbar.tsx";
import {useNavigate} from "react-router-dom";

function Profile({children}) {
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

                <div className='navbar-logo ' onClick={() => navigate('/workout')}>

                    <span className="material-symbols-outlined">
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

                <div className='navbar-logo highlighted' onClick={() => navigate('/profile')}>

                    <span className="material-symbols-outlined">
                        person
                    </span>
                        <div>Profile</div>
                </div>

            </Navbar>
        </>
    )
}

export default Profile;