import './_loadingSpinner.scss'
import {MoonLoader} from "react-spinners";

interface ILoadingSpinner {
    styles?: Object
}
function LoadingSpinner({styles}: ILoadingSpinner) {

    return (
        <>

            <div className='loading' style={styles}>
                <MoonLoader size={45} />
                <div>Loading...</div>
            </div>
        </>
    )
}

export default LoadingSpinner;