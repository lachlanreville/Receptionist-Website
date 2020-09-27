import { useForm } from "react-hook-form"
import DisplayChannels from "./components/DisplayChannels"
import DisplayType from './components/DisplayType'
import Switch from "react-switch";
import { useEffect, useState } from 'react'
import Select from "react-select"

export default (props) => {
    if (!props.application) return (<h1>No Application Data</h1>)
    const [application, setApplication] = useState(props.application)
    const [server, setServer] = useState(props.server)

    const [enabled, setEnabled] = useState(true);
    const [applicationAcceptRole, setApplicationAcceptRole] = useState({ selectedOption: [] })

    const { register, handleSubmit, setValue, getValues } = useForm();
    const onSubmit = data => console.log(data)
    let serverRoles = [];

    useEffect(() => {
        setApplication(props.application)
        setServer(props.server)
        setEnabled(props.application.enabled)
    }, [props.application])

    server.roles.map(c => {
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
                            <DisplayChannels selectedChannel={application.applicationLogChannel} allChannels={server.channels} logChannel="true" allowNull="false" />
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
                            <DisplayType type={application.type} />
                        </select>
                    </div>
                    <div className="formGroup">
                        <select name="applicationStartChannel" ref={register}>
                            <DisplayChannels selectedChannel={application.applicationStartChannel} allChannels={server.channels} allowNull="true" />
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