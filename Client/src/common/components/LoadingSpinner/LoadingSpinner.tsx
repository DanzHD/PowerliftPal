import './_loadingSpinner.scss'
import {MoonLoader} from "react-spinners";


function LoadingSpinner({styles}) {

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