import { useState } from "react"
import { Button } from "../Button"
import "./index.css"

interface TaskModalProps {
    title: string
    description: string
    urgency: string
    stage: any
    currentStage: string
    saveModifications: () => any
    deleteTask: () => any
    closeModal: any
    titleOnChange: any
    descriptionOnChange: any
    priorityOnChange: any
    currentStageOnChange: any
}

export function TaskModal(props: TaskModalProps) {
    const [isReadOnly, setIsReadOnly] = useState(true)

    return (
        <div className="modalContainer">
            <div className="modalInfo">

                <div className="inputNameContainer">
                    <label className="labelName">Titulo</label>
                    <div className="inputNameComponent" 
                    style={isReadOnly? {backgroundColor:"#EEEEEE"} : {backgroundColor:"white"}}>
                        <input 
                            type="text" 
                            style={{backgroundColor:"transparent"}}
                            readOnly={isReadOnly}
                            className="inputName" 
                            onChange={event => {props.titleOnChange(event.target.value)}}
                            defaultValue={props.title}
                        />
                    </div>
                </div>

                <div className="inputNameContainer text-area">
                    <label className="labelName">Descrição</label>
                    <div className="inputNameComponent text-area"
                    style={isReadOnly? {backgroundColor:"#EEEEEE"} : {backgroundColor:"white"}}>
                        <textarea
                            style={{backgroundColor:"transparent"}}
                            readOnly={isReadOnly}
                            onChange={event => {props.descriptionOnChange(event.target.value)}}
                            defaultValue={props.description}
                        ></textarea>
                    </div>
                </div>

                <div className="inputNameContainer">
                    <label className="labelName">Prioridade</label>
                    <div className="inputNameComponent"
                    style={isReadOnly? {backgroundColor:"#EEEEEE"} : {backgroundColor:"white"}}>
                        <select className="inputName" 
                        onChange={event => {props.priorityOnChange(event.target.value)}} 
                        defaultValue={props.urgency}
                        style={{backgroundColor:"transparent"}}
                        disabled={isReadOnly}>
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                </div>

                <div className="inputNameContainer">
                    <label className="labelName">Quadro</label>
                    <div className="inputNameComponent"
                    style={isReadOnly? {backgroundColor:"#EEEEEE"} : {backgroundColor:"white"}}>
                        <select className="inputName" 
                        onChange={event => {props.currentStageOnChange(event.target.value)}} 
                        defaultValue={props.currentStage}
                        style={{backgroundColor:"transparent"}}
                        disabled={isReadOnly}>
                            {
                                props.stage ?
                                    props.stage.map((stage: any) => {
                                        return <option key= {stage.id} value={stage.id}>{stage.name}</option>
                                    })
                                :
                                    null
                            }
                        </select>
                    </div>
                </div>

                <div className="buttonsTaskContainer">
                    <Button 
                        buttonText={isReadOnly? "Editar" : "Salvar"}
                        buttonTextColor="white"
                        buttonBackground="#1AAE9F"
                        buttonWidth={30}
                        click= {isReadOnly? () => setIsReadOnly(false) : () => {props.saveModifications()}}
                    />
                    <Button 
                        buttonText="Deletar" 
                        buttonTextColor="black"
                        buttonBackground="#F7C325"
                        buttonWidth={30}
                        click= {() => {props.deleteTask()}}
                    />
                    <Button 
                        buttonText="Fechar" 
                        buttonTextColor="white"
                        buttonBackground="#D3455B"
                        buttonWidth={30}
                        click= {() => {props.closeModal()}}
                    />
                </div>
            </div>
        </div>
    )
}