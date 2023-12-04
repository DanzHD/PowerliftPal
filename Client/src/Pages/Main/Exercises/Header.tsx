import Text from "../../../common/components/Text/Text.tsx";



function Header() {
    return (
        <>
            <div className='logo'>

                <Text heading={true}>PowerliftPal </Text>
            </div>

            <Text className='section' heading={true}>Exercises</Text>
        </>
    )
}

export default Header;