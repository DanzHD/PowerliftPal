import {Fragment, ReactNode, useState} from "react";
import './Accordion.scss'
import Text from "../Text/Text.tsx";

interface IAccordion {
    title: ReactNode,
    content: ReactNode,

}
function Accordion({
    title,
    content


}: IAccordion) {
    const [isActive, setIsActive] = useState(false);
    return (
        <Fragment >
            <div className='accordion' >
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
        </Fragment>
    )
}

export default Accordion;