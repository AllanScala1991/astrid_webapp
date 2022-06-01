import { FilePlus } from 'phosphor-react'
import { Button } from '../Button'
import './index.css'

interface CreateModalProps {
    title: string
    inputTitle: string
    inputPlaceholder: string
    inputNameOnChange: any
    createMethod: any
    closeModalMethod: any
    buttonText: string
}

export function CreateModal(props: CreateModalProps) {
    return (
        <div className="createModalContainer">
            <div className="createModal">
                <span className="createModalTitle">{props.title}</span>

                <div className="inputModalContainer">
                    <label className="labelModal">{props.inputTitle}</label>
                    <div className="inputModalComponent">
                        <FilePlus size={26} className="iconModal"/>
                        <input 
                            type="text" 
                            className="inputModal" 
                            placeholder={props.inputPlaceholder}
                            onChange={event => {props.inputNameOnChange(event.target.value)}}
                        />
                    </div>
                </div>

                <Button 
                    buttonText={props.buttonText} 
                    buttonTextColor="white"
                    buttonBackground="#1AAE9F"
                    buttonWidth={82}
                    click= {() => {props.createMethod()}}
                />
                <Button 
                    buttonText="Fechar" 
                    buttonTextColor="white"
                    buttonBackground="#D3455B"
                    buttonWidth={82}
                    click= {() => {props.closeModalMethod()}}
                />

            </div>

        </div>
    )
} 