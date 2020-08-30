import styles from "./RowUncentered.module.css"
import classnames from "classnames"

export function RowUncentered(props) {

    return (
        <div className={styles.row}>
            {props.children}
        </div>
    )
}