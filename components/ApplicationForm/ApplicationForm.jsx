import { useForm } from "react-hook-form"
import DisplayChannels from "./components/DisplayChannels"
import Switch from "react-switch";
import { useEffect, useState } from 'react'
import Select from "react-select"

export default (props) => {
    if (!props.application) return (<h1>No Application Data</h1>)
    const [application, setApplication] = useState(null)

    setApplication(props.application)

    const [enabled, setEnabled] = useState((application.enabled == 1) ? true : false);
    const [applicationAcceptRole, setApplicationAcceptRole] = useState({ selectedOption: [] })

    const { register, handleSubmit, setValue, getValues } = useForm();
    const onSubmit = data => console.log(data)
    let serverRoles = [];

    props.server.roles.map(c => {
        serverRoles.push({ value: c.id, label: c.name })
    })

    const handleAppRoleChange = (selectedOption) => {
        setValue("applicationAcceptRole", selectedOption)
        setApplicationAcceptRole({ selectedOption })
    }

    let currentAppAcceptRoles = JSON.parse(application.applicationAcceptRole)

    if (currentAppAcceptRoles.length > 0) {
        let populatedData = [];
        serverRoles.map(c => {
            if (currentAppAcceptRoles.includes(c.value)) {
                populatedData.push(c)
            }
        })
        setApplicationAcceptRole({ selectedOption: populatedData })
    }

    useEffect(() => {
        register({ name: "applicationAcceptRole", required: false })
    }, [])

    return (
        <>
            <h1>Editing {application.applicationName}</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                        <input type="text" name="applicationName" ref={register} value={application.applicationName} />
                    </div>
                    <div className="formGroup">
                        <select name="applicationLogChannel" ref={register}>
                            <DisplayChannels selectedChannel={application.applicationLogChannel} allChannels={props.server.channels} logChannel="true" allowNull="false" />
                        </select>
                    </div>
                    <div className="formGroup">
                        <Switch onChange={(checked) => {
                            setEnabled(checked);
                        }} value={enabled} checked={enabled} ref={register} />
                        <input type="text" name="toggled" ref={register} value={enabled} style={{ display: "none" }} />
                    </div>
                    <div className="formGroup">
                        <select ref={register} name="type">
                            {(application.type == 1) ? <option value="1" selected>DMs</option> : <option value="1">DMs</option>}
                            {(application.type == 2) ? <option value="2" selected>Channels</option> : <option value="2">Channels</option>}
                        </select>
                    </div>
                    <div className="formGroup">
                        <select name="applicationStartChannel" ref={register}>
                            <DisplayChannels selectedChannel={application.applicationStartChannel} allChannels={props.server.channels} allowNull="true" />
                        </select>
                    </div>
                    <div className="formGroup">
                        <Select
                            isMulti
                            name="applicationAcceptRole"
                            placeholder="Application Accept Roles"
                            value={applicationAcceptRole.selectedOption}
                            options={serverRoles}
                            onChange={handleAppRoleChange}
                        />
                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">

                    </div>
                    <div className="formGroup">
                        <input type="submit" value="Apply Changes!" />
                    </div>
                </form>
            </div>
        </>
    )
}