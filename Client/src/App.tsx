import './Styles/_index.scss'
import './Styles/_typography.scss'
import Dashboard from "./Pages/Main/Dashboard/Dashboard.tsx";
import PrivateRoutes from "./common/utils/PrivateRoutes.tsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./Pages/Home/Login/Login.tsx";
import {AuthContextProvider} from "./Contexts/AuthContext.tsx";
import {useAuthContext} from "./Contexts/AuthContext.tsx";
import {useEffect} from "react";


function App() {

    return (

        <>
            <Router>
                <AuthContextProvider>

                    <Routes>
                        <Route path='/login' element={<Login />} />

                        <Route  element={<PrivateRoutes />} >
                            <Route path='/dashboard' element={<Dashboard />} />

                        </Route>
                    </Routes>
                </AuthContextProvider>
            </Router>


        </>
    )
}

export default App
