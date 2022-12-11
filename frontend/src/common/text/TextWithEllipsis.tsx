import styles from './TextWithEllipsis.module.css'
import {StyledComponent} from "../../core/styles/StyledComponent";
import {Tooltip} from "antd";
import {joinClassNames} from '../../core/styles/joinClassNames';
import {useLayoutEffect, useRef} from "react";


type TextWithEllipsisProps = StyledComponent<{
    rows?: number,
    text: string,
}>

function TextWithEllipsis({
    rows = 1,
    text,
    className,
}: TextWithEllipsisProps) {
    const ref = useRef<HTMLDivElement|null>(null)

    useLayoutEffect(() => {
        ref.current && ref.current.style.setProperty('-webkit-line-clamp', `${rows}`)
    }, [rows])

    return (
        <Tooltip
            title={text}
            placement={'top'}
            trigger={'hover'}
        >
            <div
                className={joinClassNames(styles.text, className)}
                ref={ref}
            >
                {text}
            </div>
        </Tooltip>
    )
}

export {
    TextWithEllipsis,
}