
export default (props) => {

    return (
        {props.server.map(c => <Channels channel={c} selectedChannel={props.selectedChannel} />)}
    )
}

const Channels = (props) => {
    if(props.channel.id == props.selectedChannel) {
        return <option value={props.channel.id} selected>{props.channel.name}</options>
    } else {
        return <option value={props.channel.id}>{props.channel.name}</options>
    }
}