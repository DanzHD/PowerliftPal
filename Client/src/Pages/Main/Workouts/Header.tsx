import Text from "../../../common/components/Text/Text.tsx";
import './_workouts.scss'

function Header() {
    return (
        <>
            <div className='logo'>

                <Text heading={true}>PowerliftPal</Text>
            </div>

            <Text className='section' heading={true}>Workouts</Text>
        </>
    )
}

export default Header;