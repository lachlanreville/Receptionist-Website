import styles from "./row.module.css"
import classnames from "classnames"

export function Row(props) {

    return (
        <div className={styles.row}>
            {props.children}
        </div>
    )
}