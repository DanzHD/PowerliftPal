import './Styles/_index.scss'
import './Styles/_typography.scss'
import Dashboard from "./Pages/Main/Dashboard/Dashboard.tsx";
import PrivateRoutes from "./common/utils/PrivateRoutes.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./Pages/Home/Login/Login.tsx";
import {AuthContextProvider} from "./Contexts/AuthContext.tsx";

import APIRoutes from "./common/utils/APIRoutes.tsx";
import Workouts from "./Pages/Main/Workouts/Workouts.tsx";
import Exercise from "./Pages/Main/Exercises/Exercise.tsx";
import WorkoutDetails from "./Pages/Main/Workouts/workoutDetails/WorkoutDetails.tsx";


function App() {

    return (

        <>
            <Router>
                <AuthContextProvider>

                        <Routes>
                            <Route path='/login' element={<Login />} />


                            <Route element={<PrivateRoutes /> } >
                                <Route element={<APIRoutes />} >

                                    <Route path='/dashboard' element={<Dashboard />} />
                                    <Route path='/workout/:workoutID'  element={<WorkoutDetails />} />
                                    <Route path='/workout' element={<Workouts />} />
                                    <Route path='/exercise' element={<Exercise />} />
                                </Route>
                            </Route>

                        </Routes>


                </AuthContextProvider>
            </Router>


        </>
    )
}

export default App
