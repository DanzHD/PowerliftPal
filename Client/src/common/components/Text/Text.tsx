import cx from 'classnames';
import './_text.scss';
function Text({
    heading,
    subheading,
    className,
    children,
    styles
}){

    const computedClassName = cx(
        'text',
        className
    )

    if (heading) {
        return <h1 style={styles} className={computedClassName}>{children}</h1>
    }

    if (subheading) {
        return <h2 style={styles} className={computedClassName}>{children}</h2>
    }

    return <p style={styles} className={computedClassName}>{children}</p>
    
}

export default Text;