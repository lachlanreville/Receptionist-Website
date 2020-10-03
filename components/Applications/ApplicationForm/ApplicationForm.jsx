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
    const [applicationLogChannel, setApplicationLogChannel] = useState(null)
    const [channels, setChannels] = useState(null)
    const [categories, setCategories] = useState(null)
    const [type, setType] = useState("logChannel")

    const { register, handleSubmit, setValue, control, reset } = useForm();

    const {
        fields: questions,
        append: addQuestion,
        remove: removeQuestion
    } = useFieldArray({ control, name: "questions" })

    useEffect(() => {
        if (!application) return;
        setTimeout(() => {
            let question = JSON.parse(application.applicationQuestions)
            let newQuestion = [];
            question.map(c => {
                newQuestion.push({ question: c })
            })
            addQuestion(newQuestion)
        }, 500)

    }, [application])

    const onSubmit = data => console.log(data)
    let serverRoles = [];

    useEffect(() => {
        reset()

        setServer(props.serverData)
        setEnabled(props.application.enabled)
        setApplication(props.application)
    }, [props.application])

    useEffect(() => {
        let appChannel = server.applicationLogChannel;
        if (appChannel == "multiple") {
            setApplicationLogChannel({ logChannelType: "multiple", value: server.applicationCategoryId })
        } else {
            setApplicationLogChannel({ logChannelType: "logChannel", value: appChannel })
        }
    }, [application])

    server.roles.map(c => {
        serverRoles.push({ value: c.id, label: c.name })
    })

    useEffect(() => {
        let serverChannels = []
        server.channels.map(c => {
            serverChannels.push({ value: c.id, label: c.name })
        })
        setChannels(serverChannels)
    }, [])

    useEffect(() => {
        let serverCategories = []
        server.categories.map(c => {
            serverCategories.push({ value: c.id, label: c.name })
        })
        setCategories(serverCategories)
    }, [])

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
                            styles={
                                {
                                    option: (provided, state) => ({
                                        ...provided,
                                        color: "black"
                                    })
                                }
                            }
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
                <div>
                    <div>
                        <fieldset>
                            <legend>Log Channel Type</legend>
                            {type ? (type.logChannelType == "logChannel") ?
                                <>
                                    <label forHTML="logChannel">Specific Channel</label>
                                    <input type="radio" id="logChannel" name="logChannelType" onClick={() => setType("logChannel")} value="logChannel" ref={register} defaultChecked />
                                    <label forHTML="multiple">Multiple Channels</label>
                                    <input type="radio" id="multiple" name="logChannelType" onClick={() => setType("multiple")} value="multiple" ref={register} />
                                </>
                                :
                                <>
                                    <label forHTML="logChannel">Specific Channel</label>
                                    <input type="radio" id="logChannel" name="logChannelType" onClick={() => setType("logChannel")} value="logChannel" ref={register} />
                                    <label forHTML="multiple">Multiple Channels</label>
                                    <input type="radio" id="multiple" name="logChannelType" onClick={() => setType("multiple")} value="multiple" ref={register} defaultChecked />
                                </>
                                : <h1>Loading</h1>}
                        </fieldset>
                        <div>
                            <Select
                                styles={
                                    {
                                        option: (provided, state) => ({
                                            ...provided,
                                            color: "black"
                                        })
                                    }
                                }
                                options={(type == "logChannel") ? channels : categories}
                            />
                        </div>
                    </div>

                </div>
                <div className="formGroup">
                    <input type="submit" value="Apply Changes!" />
                </div>
            </form>
        </>
    )
}