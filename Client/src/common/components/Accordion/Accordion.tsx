import {useState} from "react";
import './Accordion.scss'
import Text from "../Text/Text.tsx";

function Accordion({
    title,
    content
}) {
    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <div className='accordion'>
                <div className='accordion-item'>

                    <div className='accordion-title' onClick={() => setIsActive(!isActive)}>
                        <div>

                            <Text subheading={true}>{title}</Text>
                        </div>
                        {isActive ?
                            <span className="material-symbols-outlined">
                                expand_less
                            </span>
                            :
                            <span className="material-symbols-outlined">
                                expand_more
                            </span>

                        }
                    </div>
                    {isActive && <div className='accordion-content'>{content} </div> }

                </div>
            </div>
        </>
    )
}

export default Accordion;