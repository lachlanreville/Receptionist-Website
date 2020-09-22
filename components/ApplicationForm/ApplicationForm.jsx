import { useForm } from "react-hook-form"

export default (props) => {
    if (!props.application) return (<h1>No Application Data</h1>)
    const { register, handleSubmit } = useForm();

    const onSubmit = data => console.log(data)

    return (
        <>
            <h1>Editing {props.application.applicationName}</h1>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="formGroup">
                        <input type="text" name="applicationName" value={props.application.applicationName} />
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