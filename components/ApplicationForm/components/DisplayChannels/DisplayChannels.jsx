
export default (props) => {
    let channelId = (props.selectedChannel == null) ? null : props.selectedChannel;
    console.log(props)
    console.log(channelId)
    if (!props.allChannels) return null

    return props.allChannels.map((channel, position) => <Channels channel={channel} selectedChannel={channelId} position={position} />)
}

const Channels = (props) => {
    console.log(props.position)
    if (props.selectedChannel == null) {
        if (props.position == 0) {
            return (
                <>
                    <option value="" selected>None Selected</option>
                    <option value={props.channel.id}>{props.channel.name}</option>
                </>
            )
        }
        return <option value={props.channel.id}>{props.channel.name}</option>
    } else if (props.channel.id == props.selectedChannel) {
        return <option value={props.channel.id} selected>{props.channel.name}</option>
    } else {
        return <option value={props.channel.id}>{props.channel.name}</option>
    }
}