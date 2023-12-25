import Text from "../Text/Text.tsx";
import './_card.scss'
function Card({
    date,
    notes,
    onClick
}) {
    return (
        <div className='card'
             onClick={onClick}>

            <Text >{date}</Text>
            <Text styles={{paddingLeft: '1em'}}>{notes}</Text>
        </div>
    )
}

export default Card;