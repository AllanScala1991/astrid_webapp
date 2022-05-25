import './index.css'

interface BoardProps {
    backgroundColor: string
    boardName: string
    method: any
}
export function Board(props: BoardProps) {
    return (
        <div 
        className="boardBox"
        style={{backgroundColor: props.backgroundColor}}
        onClick={() => {props.method()}}
        >
            <div className='boardTitle'>{props.boardName}</div>
        </div>
    )
}