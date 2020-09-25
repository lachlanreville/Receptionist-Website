
export default (props) => {
    let channelId = (props.selectedChannel == null) ? "none" : props.selectedChannel;

    if (!props.allChannels) return null

    return props.allChannels.map(c => <Channels channel={c} selectedChannel={channelId} />)
}

const Channels = (props) => {
    if (props.selectedChannel == null) {
        return <option value={props.channel.id}>{props.channel.name}</option>
    } else if (props.channel.id == props.selectedChannel) {
        return <option value={props.channel.id} selected>{props.channel.name}</option>
    } else {
        return <option value={props.channel.id}>{props.channel.name}</option>
    }
}