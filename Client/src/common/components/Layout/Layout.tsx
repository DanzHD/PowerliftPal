import './_layout.scss';
import {useAuthContext} from "../../../Contexts/AuthContext.tsx";
function Layout({
    header: Header,
    content: Content,
    sideBar: SideBar,
    footer: Footer
}) {

    const {logoutUser} = useAuthContext();

    return (
        <>
            <div className='main'>
                <div className='header'>
                    {Header}
                </div>

                <div className='main-content'>
                    {Content}
                </div>

                <div className='right-sidebar'>
                    {SideBar}
                </div>

                <div className='footer'>
                    {Footer}
                </div>
            </div>
        </>
    )
}

export default Layout