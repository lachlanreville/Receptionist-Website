import styles from "./column.module.css"
import classnames from "classnames"

export function Column(props) {
    const { size } = props;
    const newSize = 100 / size

    return (
        <div className={classnames(styles.column, 'columnSize')} >
            {props.children}
            <style jsx>{`
        .columnSize {
            flex-basis: ${newSize}%;
            max-width: ${newSize}%;
        }
        @media (max-width: 768px) {
            .columnSize {
                flex-basis: 100%;
                max-width: 100%;
                padding: 15px;
            }
        }
      `}</style>
        </div>

    )
}