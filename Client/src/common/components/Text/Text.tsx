import cx from 'classnames';
import './_text.scss';
import {ReactNode} from "react";

interface IText {
    heading?: Boolean,
    subheading?: Boolean,
    className?: String,
    children: ReactNode,
    styles?: Object,
    centered?: any,
    onClick?: Function,
    keyValue?: any,
    value?: any
}
function Text({
    heading,
    subheading,
    className,
    children,
    styles,
    centered,
    onClick,
    keyValue,
    value
}: IText){

    const computedClassName = cx(
        className,
        'text',
        centered
    )

    if (heading) {
        // @ts-ignore
        return <h1 key={keyValue} value={value} onClick={onClick} style={styles} className={computedClassName}>{children}</h1>
    }

    if (subheading) {
        // @ts-ignore
        return <h2 key={keyValue} value={value} onClick={onClick} style={styles} className={computedClassName}>{children}</h2>
    }

    // @ts-ignore
    return <p key={keyValue} value={value} onClick={onClick} style={styles} className={computedClassName}>{children}</p>
    
}

export default Text;