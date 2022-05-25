import "./index.css"

interface MessageModalProps {
    title: string
    titleBackgroundColor: string
    description: string
    method: any
}

export function MessageModal(props: MessageModalProps) {
    return (
        <div className="messageContainer">
            <div className="messageBox">
                <div className="messageTitle" style={{backgroundColor: props.titleBackgroundColor}}>
                    {props.title}
                </div>

                <div className="messageDescription">
                    {props.description}
                </div>

                <div className="messageButtonBox">
                    <button 
                        className="messageButton" 
                        style={{backgroundColor: props.titleBackgroundColor}}
                        onClick={props.method}
                    >OK</button>
                </div>
            </div>
        </div>
    )
}