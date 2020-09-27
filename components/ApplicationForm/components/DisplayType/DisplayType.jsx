import { useState, useEffect } from "react";

export default (props) => {
    const [type, setType] = useState(null);

    useEffect(() => {
        setType(props.type)
    }, [props.type])

    {
        (type == 1) ?
            <>
                <option value="1" selected>DMs</option>
                <option value="2">Channels</option>
            </>

            :
            <>
                <option value="1">DMs</option>
                <option value="2" selected>Channels</option>
            </>

    }
}