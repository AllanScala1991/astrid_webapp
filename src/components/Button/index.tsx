import "./index.css"

interface ButtonProps {
    buttonText: string
    buttonBackground: string
    buttonTextColor: string
    buttonWidth: number
    click: any
}

export function Button(props: ButtonProps) {
    return (
        <button
            className="buttons"
            type="button"
            style={{
                color: props.buttonTextColor, 
                backgroundColor: props.buttonBackground,
                width: `${props.buttonWidth}%`
            }}
            onClick={props.click}
        >{props.buttonText}</button>
    )
}