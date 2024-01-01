import Text from "../Text/Text.tsx";
import './_card.scss'
import {MouseEventHandler} from "react";

interface ICard {
    date: String,
    notes: String,
    onClick: MouseEventHandler
    keyValue?: any
}

function Card({
    date,
    notes,
    onClick,
    keyValue
}: ICard) {
    return (
        <div className='card' key={keyValue}
             onClick={onClick}>

            <Text >{date}</Text>
            <Text styles={{paddingLeft: '1em'}}>{notes}</Text>
        </div>
    )
}

export default Card;