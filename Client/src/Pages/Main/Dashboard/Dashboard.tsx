import Navbar from "../../../common/components/navbar/Navbar.tsx";
import Layout from "../../../common/components/Layout/Layout.tsx";
import Content from "./Components/Content.tsx";
import Header from "../../../common/components/Header/Header.tsx";
import RightSideBar from "./Components/RightSideBar.tsx";
import {useNavigate} from "react-router-dom";
import './_dashboard.scss'
import {useAuthContext} from "../../../Contexts/AuthContext.tsx";

function Dashboard() {
    const {user, logoutUser} = useAuthContext();
    const navigate = useNavigate();

    return (
    <>
        <Navbar >
            <div className='navbar-logo highlighted'>
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

            <div className='navbar-logo' onClick={() => logoutUser()}>

                <span className="material-symbols-outlined">
                    logout
                </span>
                <div>Logout</div>
            </div>

        </Navbar>

        <Layout classNames='dashboard'
                content={Content()}
                header={<Header styles={{opacity: '1'}} title={`Hello ${user}`} />}
                sideBar={RightSideBar()}
        />


    </>
    )
}

export default Dashboard;