import Text from "../Text/Text.tsx";
import './_header.scss'

interface IHeader {
    title?: String,
    styles?: Object

}

function Header({title, styles} : IHeader) {


    return (
        <>
            <div className='logo'>

                <Text heading={true}>PowerliftPal </Text>
            </div>

            <Text styles={styles} className={`section invisible`} heading={true}>{title}</Text>
        </>
    )
}

export default Header;