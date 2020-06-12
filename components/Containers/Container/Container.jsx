import styles from "./container.module.css"
import classnames from "classnames"

export function Container(props) {
    return (
        <div className={classnames(styles.container)}>
            {props.children}
        </div>
    )
}