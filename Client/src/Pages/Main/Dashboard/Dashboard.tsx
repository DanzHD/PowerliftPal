import Navbar from "../../../common/components/navbar/Navbar.tsx";
import Layout from "../../../common/components/Layout/Layout.tsx";
import Content from "./Components/Content.tsx";
import Header from "./Components/Header.tsx";
import RightSideBar from "./Components/RightSideBar.tsx";
import Footer from "./Components/Footer.tsx";
import {useAuthContext} from "../../../Contexts/AuthContext.tsx";

function Dashboard() {
    const {logoutUser} = useAuthContext();

    return (
    <>
        <Navbar >
            <div className='navbar-logo highlighted'>
                <span className="material-symbols-outlined">
                    Home
                </span>
                <div>Home</div>
            </div>

            <div className='navbar-logo '>

                <span className="material-symbols-outlined">
                    book_4
                </span>
                <div>Workouts</div>
            </div>

            <div className='navbar-logo'>

                <span className="material-symbols-outlined">
                    exercise
                </span>
                <div>Exercises</div>
            </div>

            <div className='navbar-logo'>

                <span className="material-symbols-outlined">
                    person
                </span>
                <div>Profile</div>
            </div>

        </Navbar>

        <Layout content={Content()} header={Header()} sideBar={RightSideBar()} footer={Footer()} >
        </Layout>



    </>
    )
}

export default Dashboard;