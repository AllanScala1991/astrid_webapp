import { LockKey } from "phosphor-react"
import "./index.css"

interface InputProps {
    onChange: (value: string) => any
}

export function InputPassword(props: InputProps) {
    return (
        <div className="inputPasswordContainer">
            <label className="labelPassword">Password</label>
            <div className="inputPasswordComponent">
                <LockKey size={26} className="iconPassword"/>
                <input 
                    type="password" 
                    className="inputPassword" 
                    placeholder="***********"
                    onChange={event => {props.onChange(event.target.value)}}
                />
            </div>
        </div>
    )
}