import { useForm } from "react-hook-form"
import DisplayChannels from "./components/DisplayChannels"
import Switch from "react-switch";
import { useEffect, useState } from 'react'

export default (props) => {
    if (!props.application) return (<h1>No Application Data</h1>)

    const [enabled, setEnabled] = useState((props.application.enabled == 1) ? true : false);

    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            toggled: enabled
        }
    });
    const onSubmit = data => console.log(data)

    useEffect(() => {
        console.log(enabled)
        setValue('toggled', enabled)
    }, [enabled])

    return (
        <>
            <h1>Editing {props.application.applicationName}</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                        <input type="text" name="applicationName" ref={register} value={props.application.applicationName} />
                    </div>
                    <div className="formGroup">
                        <select name="applicationLogChannel" ref={register}>
                            <DisplayChannels selectedChannel={props.application.applicationLogChannel} allChannels={props.server.channels} />
                        </select>
                    </div>
                    <div className="formGroup">
                        <Switch onChange={(checked) => setEnabled(checked)} value={enabled} checked={enabled} ref={register} />
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