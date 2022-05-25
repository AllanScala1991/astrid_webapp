import { Envelope } from "phosphor-react"
import "./index.css"

interface InputProps {
    onChange: (value: string) => any
}

export function InputEmail(props: InputProps) {
    return (
        <div className="inputEmailContainer">
            <label className="labelEmail">Email</label>
            <div className="inputEmailComponent">
                <Envelope size={26} className="iconEmail"/>
                <input 
                    type="text" 
                    className="inputEmail" 
                    placeholder="email@mail.com"
                    onChange={event => {props.onChange(event.target.value)}}
                />
            </div>
        </div>
    )
}