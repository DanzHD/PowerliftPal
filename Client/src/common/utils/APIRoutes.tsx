import {Outlet} from 'react-router-dom'

import {APIContextProvider} from "../../Contexts/APIContext.tsx";

const APIRoutes = () => {
    return (
        <APIContextProvider>
            <Outlet />
        </APIContextProvider>
    )
}

export default APIRoutes;
