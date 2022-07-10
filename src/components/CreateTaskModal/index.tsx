import { AddressBook } from 'phosphor-react'
import { Button } from '../Button'
import './index.css'

interface CreateTaskModalProps {
    titleOnChange: any
    descriptionOnChange: any
    priorityOnChange: any
    saveOnChange: any
    closeOnChange: any
}


export function CreateTaskModal(props: CreateTaskModalProps) {
    return (
        <div className="modalContainer">
            <div className="modalInfo">
                <span className="createTaskTitle">Novas Tarefas</span>
                <div className="inputNameContainer">
                    <label className="labelName">Titulo</label>
                    <div className="inputNameComponent">
                        <AddressBook size={26} className="iconName"/>
                        <input 
                            maxLength={28}
                            type="text" 
                            className="inputName" 
                            placeholder="Digite um titulo para sua tarefa"
                            onChange={event => {props.titleOnChange(event.target.value)}}
                        />
                    </div>
                </div>

                <div className="inputNameContainer text-area">
                    <label className="labelName">Descrição</label>
                    <div className="inputNameComponent text-area">
                        <textarea
                            placeholder='Digite uma descrição para sua tarefa'
                            onChange={event => {props.descriptionOnChange(event.target.value)}}
                        ></textarea>
                    </div>
                </div>

                <div className="inputNameContainer">
                    <label className="labelName">Prioridade</label>
                    <div className="inputNameComponent">
                        <select className="inputName" onChange={event => {props.priorityOnChange(event.target.value)}}>
                            <option value="low" defaultChecked>Baixa</option>
                            <option value="medium">Média</option>
                            <option value="high">Alta</option>
                        </select>
                    </div>
                </div>

                <div className="buttonsContainer">
                    <div className="buttonLeft">
                        <Button 
                            buttonText="Salvar" 
                            buttonTextColor="white"
                            buttonBackground="#1AAE9F"
                            buttonWidth={70}
                            click= {() => {props.saveOnChange()}}
                        />
                    </div>

                    <div className="buttonRight">
                        <Button 
                            buttonText="Fechar" 
                            buttonTextColor="white"
                            buttonBackground="#D3455B"
                            buttonWidth={70}
                            click= {() => {props.closeOnChange()}}
                        />
                    </div>

                </div>


            </div>
        </div>
    )
}