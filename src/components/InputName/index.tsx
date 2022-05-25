import { User } from "phosphor-react"
import "./index.css"

interface InputProps {
    onChange: (value: string) => any
}

export function InputName(props: InputProps) {
    return (
        <div className="inputNameContainer">
            <label className="labelName">Name</label>
            <div className="inputNameComponent">
                <User size={26} className="iconName"/>
                <input 
                    type="text" 
                    className="inputName" 
                    placeholder="Loren Ipsum"
                    onChange={event => {props.onChange(event.target.value)}}
                />
            </div>
        </div>
    )
}