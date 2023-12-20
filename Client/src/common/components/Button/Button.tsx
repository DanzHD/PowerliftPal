import cx from "classnames";
import './_button.scss'

function Button({
    children,
    type,
    className,
    styles,
    onSubmit,
    onClick,
    value,
    keyValue
}) {

    const computedClasses = cx('button', className);


    return (
        <>
            <button key={keyValue} value={value} onClick={onClick} onSubmit={onSubmit} style={styles} type={type} className={computedClasses}> {children} </button>
        </>
    )

}

export default Button;