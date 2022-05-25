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
    return (
        <div className="modalContainer">
            <div className="modalInfo">

                <div className="inputNameContainer">
                    <label className="labelName">Titulo</label>
                    <div className="inputNameComponent">
                        <input 
                            type="text" 
                            className="inputName" 
                            onChange={event => {props.titleOnChange(event.target.value)}}
                            defaultValue={props.title}
                        />
                    </div>
                </div>

                <div className="inputNameContainer text-area">
                    <label className="labelName">Descrição</label>
                    <div className="inputNameComponent text-area">
                        <textarea
                            onChange={event => {props.descriptionOnChange(event.target.value)}}
                            defaultValue={props.description}
                        ></textarea>
                    </div>
                </div>

                <div className="inputNameContainer">
                    <label className="labelName">Prioridade</label>
                    <div className="inputNameComponent">
                        <select className="inputName" onChange={event => {props.priorityOnChange(event.target.value)}} defaultValue={props.urgency}>
                            <option value="low">Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                </div>

                <div className="inputNameContainer">
                    <label className="labelName">Quadro</label>
                    <div className="inputNameComponent">
                        <select className="inputName" onChange={event => {props.currentStageOnChange(event.target.value)}} defaultValue={props.currentStage}>
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
                        buttonText="Salvar" 
                        buttonTextColor="white"
                        buttonBackground="#1AAE9F"
                        buttonWidth={30}
                        click= {() => {props.saveModifications()}}
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