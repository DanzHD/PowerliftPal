import cx from "classnames";
import './_button.scss'
import {ReactNode} from "react";

interface IButton {
    children?: ReactNode
    type?: String,
    className?: String,
    styles?: Object,
    onSubmit?: Function,
    onClick?: Function,
    value?: any,
    keyValue?: any
}

function Button({children, type, className, styles, onSubmit, onClick, value, keyValue}: IButton){

    // @ts-ignore
    const computedClasses = cx('button', className);



    return (
        <>
            {/*
                @ts-ignore */}
            <button key={keyValue} value={value} onClick={onClick} onSubmit={onSubmit} style={styles} type={type} className={computedClasses}> {children} </button>
        </>
    )

}

export default Button;