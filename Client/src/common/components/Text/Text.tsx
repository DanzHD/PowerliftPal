import cx from 'classnames';
import './_text.scss';
function Text({
    heading,
    subheading,
    className,
    children,
    styles,
    centered,
    onClick,
    value,
    keyValue
}){

    const computedClassName = cx(
        'text',
        className,
        centered
    )

    if (heading) {
        return <h1 key={keyValue} value={value} onClick={onClick} style={styles} className={computedClassName}>{children}</h1>
    }

    if (subheading) {
        return <h2 key={keyValue} value={value} onClick={onClick} style={styles} className={computedClassName}>{children}</h2>
    }

    return <p key={keyValue} value={value} onClick={onClick} style={styles} className={computedClassName}>{children}</p>
    
}

export default Text;