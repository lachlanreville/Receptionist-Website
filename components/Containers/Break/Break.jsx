
export function Break(props) {

    const { height } = props;

    return (
        <div style={{ height: height + 'px' }}>
            {props.children}
        </div>
    )
}