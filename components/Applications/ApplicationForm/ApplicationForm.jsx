import { useForm, useFieldArray, Controller } from "react-hook-form"
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

    const { register, handleSubmit, setValue, control } = useForm();

    const {
        fields: questions,
        append: addQuestion,
        remove: removeQuestion
    } = useFieldArray({ control, name: "questions" })

    useEffect(() => {
        if (!application) return;
        let question = JSON.parse(application.applicationQuestions)
        let newQuestion = [];
        question.map(c => {
            newQuestion.push({ question: c })
        })
        addQuestion(newQuestion)
    }, [application])

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
        register({ name: "questions", required: true })

    }, [])

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.applicationRow}>
                    <fieldset className={styles.applicationNameFieldSet}>
                        <legend>Application Name</legend>
                        <input className={styles.applicationName} type="text" name="applicationName" ref={register} value={application.applicationName} />
                    </fieldset>
                    <fieldset className={styles.applicationEnabledFieldSet}>
                        <legend>Enabled</legend>
                        <Switch onChange={(checked) => {
                            setEnabled(checked);
                        }} value={enabled} checked={enabled} ref={register} className={styles.toggleButton} />
                        <input type="text" name="toggled" ref={register} value={enabled} style={{ display: "none" }} />
                    </fieldset>
                </div>
                <div className="formGroup">
                    <fieldset className={styles.applicationQuestionFieldSet}>
                        <legend>Roles Given on Application Accept</legend>
                        <Select
                            style={{ color: "black" }}
                            isMulti
                            name="applicationAcceptRole"
                            placeholder="Application Accept Roles"
                            value={applicationAcceptRole.selectedOption}
                            options={serverRoles}
                            onChange={handleAppRoleChange}
                        />
                    </fieldset>
                </div>
                <div>
                    <fieldset className={styles.applicationQuestionFieldSet}>
                        {(server.premium == 1) ? <legend>Questions</legend> : <legend>Questions {questions.length}/15</legend>}
                        <div>
                            <ul className={styles.applicationQuestionUL}>
                                {questions.map((question, index) => {
                                    return (
                                        <li key={question.id}>
                                            <Controller
                                                as={<input />}
                                                name={`questions[${index}].question`}
                                                control={control}
                                                className={styles.applicationQuestionInput}
                                                defaultValue={question.question}
                                            />

                                            <button type="button" className={styles.applicationQuestionButton} onClick={() =>
                                                removeQuestion(index)
                                            }>Delete</button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div>
                            <button type="button" onClick={() => {
                                if (server.premium == 1) {
                                    addQuestion({ question: "" })
                                } else {
                                    if (questions.length >= 15) {
                                        alert("Exceeded the 15 Question limit for non-premium Servers")
                                    } else {
                                        addQuestion({ question: "" })
                                    }
                                }

                            }}>New Question</button>
                        </div>
                    </fieldset>
                </div>
                <div className="formGroup">
                    <input type="submit" value="Apply Changes!" />
                </div>
            </form>
        </>
    )
}