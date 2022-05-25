import "./index.css"

interface TitleProps {
    text: string
    color: string
    fontSize: number
}

export function Title(props: TitleProps) {
    return (
        <h1
            style={{color: props.color, fontSize: `${props.fontSize}vh`}}
            className="titles"
        >{props.text}</h1>
    )
}