import Navbar from "../common/components/navbar/Navbar.tsx";
import '../Styles/_index.scss'
import '../Styles/_typography.scss'

function App() {

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
            <div className='content'>



            </div>


        </>
    )
}

export default App
