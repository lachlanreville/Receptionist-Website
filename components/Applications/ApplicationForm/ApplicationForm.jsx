import { useForm } from "react-hook-form"
import Switch from "react-switch";
import { useEffect, useState } from 'react'
import Select from "react-select"
import styles from "./ApplicationForm.module.css"

export default (props) => {
    if (!props.application) return (<h1>No Application Data</h1>)
    const [application, setApplication] = useState(props.application)
    const [server, setServer] = useState(props.serverData)

    const [enabled, setEnabled] = useState(true);
    const [applicationAcceptRole, setApplicationAcceptRole] = useState({ selectedOption: [] })

    const { register, handleSubmit, setValue } = useForm();
    const onSubmit = data => console.log(data)
    let serverRoles = [];

    useEffect(() => {
        setApplication(props.application)
        setServer(props.serverData)
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.applicationRow}>
                    <input className={styles.applicationName} type="text" name="applicationName" ref={register} value={application.applicationName} />
                    <Switch onChange={(checked) => {
                        setEnabled(checked);
                    }} value={enabled} checked={enabled} ref={register} className={styles.toggleButton} />
                    <input type="text" name="toggled" ref={register} value={enabled} style={{ display: "none" }} />
                </div>
                <div className="formGroup">
                    <select ref={register} name="type">
                    </select>
                </div>
                <div className="formGroup">
                    <select name="applicationStartChannel" ref={register}>
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
        </>
    )
}