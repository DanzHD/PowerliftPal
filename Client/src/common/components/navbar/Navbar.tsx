import './_navbar.scss';
import { Children } from "react";

function Navbar({ children }) {

    return <div className='navbar'>
        {children}
    </div>


}

export default Navbar;