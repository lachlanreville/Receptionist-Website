
export default (props) => {
    let channelId = (props.selectedChannel == null) ? "none" : props.selectedChannel;

    if (!props.allChannels) return null

    return props.allChannels.map((c, position) => <Channels channel={c} selectedChannel={channelId} key={position} />)
}

const Channels = (props) => {
    if (props.selectedChannel == null) {
        if (props.key == 1) {
            <option value="" selected>None Selected</option>
        }
        return <option value={props.channel.id}>{props.channel.name}</option>
    } else if (props.channel.id == props.selectedChannel) {
        return <option value={props.channel.id} selected>{props.channel.name}</option>
    } else {
        return <option value={props.channel.id}>{props.channel.name}</option>
    }
}