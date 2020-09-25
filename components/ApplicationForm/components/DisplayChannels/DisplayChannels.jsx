
export default (props) => {
    let channelId = (props.selectedChannel == null) ? "none" : props.selectedChannel;

    if (!props.allChannels) return null

    return props.allChannels.map((channel, position) => <Channels channel={channel} selectedChannel={channelId} position={position} />)
}

const Channels = (props) => {
    console.log(props.position)
    if (props.selectedChannel == null) {
        if (props.position == 1) {
            <option value="" selected>None Selected</option>
        }
        return <option value={props.channel.id}>{props.channel.name}</option>
    } else if (props.channel.id == props.selectedChannel) {
        return <option value={props.channel.id} selected>{props.channel.name}</option>
    } else {
        return <option value={props.channel.id}>{props.channel.name}</option>
    }
}