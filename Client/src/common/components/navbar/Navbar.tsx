import './_navbar.scss';
import {ReactNode} from "react";


function Navbar({ children }: {children: ReactNode}) {

    return <div className='navbar'>
        {children}
    </div>


}

export default Navbar;