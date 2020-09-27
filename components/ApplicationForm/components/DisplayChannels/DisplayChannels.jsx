
export default (props) => {
    let channelId = (props.selectedChannel == null) ? null : props.selectedChannel;
    let allowNull = props.allowNull
    let logChannel = props.logChannel
    if (!props.allChannels) return null
    console.log("this is a realod")

    return props.allChannels.map((channel, position) => <Channels channel={channel} selectedChannel={channelId} logChannel={logChannel} position={position} allowNull={allowNull} />)
}

const Channels = (props) => {
    if (props.selectedChannel == null) {
        if (props.position == 0) {
            if (props.logChannel == "true") {
                return (
                    <>
                        <option value="multiple" selected>Multiple Channels</option>
                        <option value={props.channel.id}>{props.channel.name}</option>
                    </>
                )
            }
            return (
                <>
                    <option value="" selected>None Selected</option>
                    <option value={props.channel.id}>{props.channel.name}</option>
                </>
            )
        }
        return <option value={props.channel.id}>{props.channel.name}</option>
    } else if (props.allowNull == true && props.position == 0) {
        if (props.channel.id == props.selectedChannel) {
            return (
                <>
                    <option value="">None Selected</option>
                    <option value={props.channel.id} selected>{props.channel.name}</option>
                </>
            )
        }
        return (
            <>
                <option value="">None Selected</option>
                <option value={props.channel.id}>{props.channel.name}</option>
            </>
        )
    } else if (props.channel.id == props.selectedChannel) {
        return <option value={props.channel.id} selected>{props.channel.name}</option>
    } else {
        return <option value={props.channel.id}>{props.channel.name}</option>
    }
}