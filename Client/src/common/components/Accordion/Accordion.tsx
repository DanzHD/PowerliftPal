import {useState} from "react";
import './Accordion.scss'

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

                            {title}
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