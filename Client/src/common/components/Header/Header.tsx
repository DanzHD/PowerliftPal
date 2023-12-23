import Text from "../Text/Text.tsx";
import './_header.scss'

function Header({title}) {
    return (
        <>
            <div className='logo'>

                <Text heading={true}>PowerliftPal </Text>
            </div>

            <Text className='section invisible' heading={true}>{title}</Text>
        </>
    )
}

export default Header;